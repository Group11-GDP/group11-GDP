// AddExpense.tsx
import React, { useState, useRef, useEffect } from "react";
// import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from "react-datepicker";
import { Form } from "react-router";

export default function AddExpense() {
  const [expenseAmount, setExpenseAmount] = useState<number>(0);
  const [expenseDate, setExpenseDate] = useState(new Date());
  const [expenseType, setExpenseType] = useState("");
  const [notes, setNotes] = useState("");
  const [frequency, setFrequency] = useState("One time");

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

  useEffect(() => {
    if (cameraActive && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play();
    }
  }, [cameraActive]);

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
    const newMode: "user" | "environment" = facingMode === "user" ? "environment" : "user";
    if (cameraActive) {
      handleStopCamera();
    }
    setFacingMode(newMode);
    startCamera(newMode);
  };

  const handleTakePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      setCapturedPhoto(dataUrl);
    }
  };

  return (
    <div className="scroll-container">
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

            {/* 
            <DatePicker
              className="input-field"
              selected={expenseDate}
              onChange={(date) => (date != null ? setExpenseDate(date) : new Date())}
            /> */}

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
              <option key="One time" value="One time">
                One time
              </option>
              <option key="Daily" value="Daily">
                Daily
              </option>
              <option key="Weekly" value="Weekly">
                Weekly
              </option>
              <option key="Monthly" value="Monthly">
                Monthly
              </option>
              <option key="Annually" value="Annually">
                Annually
              </option>
            </select>
          </div>
        </section>

        <div className="button-group">
          <button type="button" className="action-button" onClick={handleSubmit}>
            Add Expense
          </button>

          {/* Camera control buttons */}
          <button type="button" className="action-button" onClick={handleOpenCamera}>
            Open Camera
          </button>

          {cameraActive && (
            <div className="camera-container">
              <video
                ref={videoRef}
                className="camera-video"
                playsInline
                autoPlay
              />
              <div className="camera-controls">
                <button type="button" className="action-button" onClick={handleSwitchCamera}>
                  Switch Camera
                </button>
                <button type="button" className="action-button" onClick={handleTakePhoto}>
                  Take Photo
                </button>
                <button type="button" className="action-button" onClick={handleStopCamera}>
                  Stop Camera
                </button>
              </div>
              {/* Display the captured photo */}
              {capturedPhoto && (
                <div className="photo-preview">
                  <h3>Captured Photo:</h3>
                  <img src={capturedPhoto} alt="Captured" className="captured-photo" />
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
