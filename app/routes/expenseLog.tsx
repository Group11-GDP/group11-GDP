// AddExpense.tsx
import React, { useState, useRef, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

export default function AddExpense() {
  const [expenseAmount, setExpenseAmount] = useState<number>(0);
  const [expenseDate, setExpenseDate] = useState(new Date());
  const [expenseType, setExpenseType] = useState("");
  const [notes, setNotes] = useState("");
  const [frequency, setFrequency] = useState("One time");

  // Camera state
  const [cameraActive, setCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:5000/expense", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: expenseAmount,
        date: expenseDate.toISOString().split("T")[0],
        category: expenseType,
        notes: notes,
        frequency: frequency,
      }),
    });

    if (response.ok) {
      alert("Expense added successfully!");
    } else {
      alert("Error adding expense.");
    }
  };

  const types = ["Groceries", "Transport", "Subscription", "Shopping", "Entertainment"];

  const startCamera = async (mode: "user" | "environment") => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Camera API not supported by your browser.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode },
      });
      streamRef.current = stream;
      setCameraActive(true);
    } catch (error: any) {
      console.error("Error accessing camera", error);
      alert("Error accessing camera: " + error.message);
    }
  };

  const handleOpenCamera = () => {
    setCapturedPhoto(null);
    startCamera(facingMode);
  };

  const handleStopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const handleSwitchCamera = async () => {
    const newMode = facingMode === "user" ? "environment" : "user";
    handleStopCamera();
    setFacingMode(newMode);
    startCamera(newMode);
  };

  const handleTakePhoto = async () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Draw the current video frame to the canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      // Convert the image to JPEG instead of PNG
      const dataUrl = canvas.toDataURL("image/jpeg");
      setCapturedPhoto(dataUrl);
      
      // Stop the camera once the photo is captured
      handleStopCamera();

      // Convert data URL to blob
      const res = await fetch(dataUrl);
      const blob = await res.blob();

      // Wrap the blob in a File object
      const file = new File([blob], `receipt_${Date.now()}.jpeg`, { type: "image/jpeg" });

      // Prepare the FormData with the file
      const formData = new FormData();
      formData.append("receipts", file);

      // Upload the file to your backend. The backend should handle
      // saving it in a folder named "receipt"
      try {
        const uploadResponse = await fetch("http://localhost:5000/uploadReceipt", {
          method: "POST",
          body: formData,
        });
        if (uploadResponse.ok) {
          console.log("Receipt saved successfully.");
        } else {
          console.error("Error saving receipt.");
        }
      } catch (error) {
        console.error("Upload error:", error);
      }
    }
  };

  useEffect(() => {
    if (cameraActive && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play();
    }
  }, [cameraActive]);

  return (
    <div>
      <main className="home-container">
        <h1 className="welcome-header">Add Expense</h1>

        <section className="basic-info">
          <div className="basic-header">Expense Information</div>
          <div className="input-group">
            Total:
            <input
              type="number"
              min="0"
              placeholder="€ 0"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(Number(e.target.value))}
              onKeyDown={(e) => {
                if (e.key === "-" || e.key === "e") {
                  e.preventDefault();
                }
              }}
            />

             Date:
            <DatePicker
              className="input-field"
              selected={expenseDate}
              onChange={(date) => (date != null ? setExpenseDate(date) : new Date())}
              dateFormat="dd/MM/YYYY"
            />

            Category:
            <select
              key={expenseType}
              value={expenseType}
              className="input-field"
              onChange={(e) => setExpenseType(e.target.value)}
            >
              <option hidden={true}>Expense type</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            Notes:
            <textarea
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="input-field"
            />

            Frequency:
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="input-field"
            >
              <option value="One time">One time</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Annually">Annually</option>
            </select>
          </div>
        </section>

        <div className="button-group">
          <button type="button" className="action-button" onClick={handleSubmit}>
            Add Expense
          </button>

          {/* Open Camera button */}
          <button type="button" className="action-button" onClick={handleOpenCamera}>
            Open Camera
          </button>
        </div>
      </main>

      {cameraActive && (
        <div className="camera-overlay">
          <div className="camera-header">
            <button type="button" className="close-button" onClick={handleStopCamera}>
              X
            </button>
            <button type="button" className="action-button" onClick={handleSwitchCamera}>
              Switch Camera
            </button>
          </div>

          {/* Display video feed or captured photo */}
          {!capturedPhoto && (
            <video ref={videoRef} className="camera-video" playsInline autoPlay />
          )}
          {capturedPhoto && (
            <img src={capturedPhoto} alt="Captured" className="camera-photo" />
          )}

          <div className="camera-controls-bottom">
            {!capturedPhoto && (
              <button type="button" className="action-button" onClick={handleTakePhoto}>
                Take Photo
              </button>
            )}
            {capturedPhoto && (
              <button
                type="button"
                className="action-button"
                onClick={() => setCapturedPhoto(null)}
              >
                Retake
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
