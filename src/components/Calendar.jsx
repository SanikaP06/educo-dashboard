"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2023, 7)) // August 2023
  const [selectedDay, setSelectedDay] = useState(17) // Default selected day
  const [showYearPicker, setShowYearPicker] = useState(false)

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

  const handleYearChange = (year) => {
    const newDate = new Date(currentDate)
    newDate.setFullYear(year)
    setCurrentDate(newDate)
    setSelectedDay(null)
    setShowYearPicker(false)
  }

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear()
    const years = []
    for (let year = currentYear - 10; year <= currentYear + 10; year++) {
      years.push(year)
    }
    return years
  }

  return (
    <div className="card" style={{ padding: "16px", minHeight: "auto", maxHeight: "380px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
        <div style={{ position: "relative" }}>
          <h3
            style={{
              fontSize: "0.9rem",
              fontWeight: "600",
              color: "#1a202c",
              cursor: "pointer",
              padding: "4px 6px",
              borderRadius: "4px",
              transition: "background-color 0.2s",
            }}
            onClick={() => setShowYearPicker(!showYearPicker)}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f7fafc")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            {monthNames[currentDate.getMonth()]}, {currentDate.getFullYear()}
          </h3>

          {showYearPicker && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: "0",
                marginTop: "4px",
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                zIndex: 20,
                maxHeight: "120px",
                overflowY: "auto",
                minWidth: "80px",
              }}
            >
              {generateYearOptions().map((year) => (
                <button
                  key={year}
                  onClick={() => handleYearChange(year)}
                  style={{
                    width: "100%",
                    padding: "4px 8px",
                    textAlign: "left",
                    border: "none",
                    background: year === currentDate.getFullYear() ? "#f7fafc" : "transparent",
                    color: "#1a202c",
                    fontSize: "11px",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (year !== currentDate.getFullYear()) e.target.style.backgroundColor = "#f7fafc"
                  }}
                  onMouseLeave={(e) => {
                    if (year !== currentDate.getFullYear()) e.target.style.backgroundColor = "transparent"
                  }}
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
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
            <ChevronLeft style={{ height: "16px", width: "16px" }} />
          </button>
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
            <ChevronRight style={{ height: "16px", width: "16px" }} />
          </button>
        </div>
      </div>

      {/* Days of week header */}
      <div className="calendar-grid" style={{ marginBottom: "6px", display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px" }}>
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            style={{
              textAlign: "center",
              fontSize: "11px",
              fontWeight: "600",
              color: "#a0aec0",
              padding: "4px 0",
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="calendar-grid" style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "3px" }}>
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
              fontSize: "14px",
              fontWeight: "500",
              cursor: day ? "pointer" : "default",
              transition: "all 0.2s",
              minHeight: "32px",
              maxHeight: "32px",
              // Only apply styling to actual days, not empty cells
              backgroundColor: day && day === selectedDay ? "#fbbf24" : "transparent",
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