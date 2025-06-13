"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2023, 7)) // August 2023
  const [selectedDay, setSelectedDay] = useState(17) // Default selected day
  // Removed unused state variables

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"]

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const days = getDaysInMonth(currentDate)

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + direction)
    setCurrentDate(newDate)
    // Reset selected day when changing months
    setSelectedDay(null)
  }

  const handleDayClick = (day) => {
    if (day) {
      setSelectedDay(day)
    }
  }

  return (
    <div style={{ padding: 0, minHeight: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={() => navigateMonth(-1)}
            style={{
              padding: "4px",
              borderRadius: "4px",
              border: "none",
              background: "none",
              cursor: "pointer",
              color: "#718096",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f7fafc")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            <ChevronLeft style={{ height: "14px", width: "14px" }} />
          </button>

          <h3 style={{ fontSize: "0.9rem", fontWeight: "600", color: "#1a202c", margin: 0 }}>
            {monthNames[currentDate.getMonth()]}, {currentDate.getFullYear()}
          </h3>

          <button
            onClick={() => navigateMonth(1)}
            style={{
              padding: "4px",
              borderRadius: "4px",
              border: "none",
              background: "none",
              cursor: "pointer",
              color: "#718096",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f7fafc")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            <ChevronRight style={{ height: "14px", width: "14px" }} />
          </button>
        </div>
      </div>

      {/* Days of week header */}
      <div
        className="calendar-grid"
        style={{ marginBottom: "4px", display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px" }}
      >
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            style={{
              textAlign: "center",
              fontSize: "11px",
              fontWeight: "600",
              color: "#a0aec0",
              padding: "2px 0",
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="calendar-grid" style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px" }}>
        {days.map((day, index) => (
          <div
            key={index}
            className={day ? "calendar-day" : "calendar-empty"}
            onClick={() => handleDayClick(day)}
            style={{
              aspectRatio: "1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: "500",
              cursor: day ? "pointer" : "default",
              transition: "all 0.2s",
              minHeight: "24px",
              maxHeight: "24px",
              // Only apply styling to actual days, not empty cells
              backgroundColor: day && day === selectedDay ? "#c1ff72" : "transparent",
              color: day && day === selectedDay ? "#1f2937" : day ? "#374151" : "transparent",
            }}
            onMouseEnter={(e) => {
              if (day && day !== selectedDay) {
                e.target.style.backgroundColor = "#f3f4f6"
              }
            }}
            onMouseLeave={(e) => {
              if (day && day !== selectedDay) {
                e.target.style.backgroundColor = "transparent"
              }
            }}
          >
            {day || ""}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calendar
