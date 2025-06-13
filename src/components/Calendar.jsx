"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2023, 7)) // August 2023
  const [selectedDay, setSelectedDay] = useState(17) // Default selected day
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setYearDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

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

  // Generate array of years for dropdown (current year ± 5 years)
  const currentYear = currentDate.getFullYear()
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i)

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
    setYearDropdownOpen(false)
  }

  const toggleYearDropdown = () => {
    setYearDropdownOpen(!yearDropdownOpen)
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
            {monthNames[currentDate.getMonth()]},
          </h3>

          {/* Year dropdown */}
          <div style={{ position: "relative" }} ref={dropdownRef}>
            <button
              onClick={toggleYearDropdown}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2px",
                fontSize: "0.9rem",
                fontWeight: "600",
                color: "#1a202c",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "2px 4px",
                borderRadius: "4px",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#f7fafc")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
            >
              {currentDate.getFullYear()}
              <ChevronDown style={{ height: "12px", width: "12px" }} />
            </button>

            {yearDropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "0",
                  zIndex: 10,
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  maxHeight: "200px",
                  overflowY: "auto",
                  width: "80px",
                }}
              >
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => handleYearChange(year)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "6px 10px",
                      background: year === currentYear ? "#f7fafc" : "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "13px",
                      color: "#1a202c",
                      fontWeight: year === currentYear ? "600" : "400",
                    }}
                    onMouseEnter={(e) => {
                      if (year !== currentYear) e.target.style.backgroundColor = "#f7fafc"
                    }}
                    onMouseLeave={(e) => {
                      if (year !== currentYear) e.target.style.backgroundColor = "transparent"
                    }}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>

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
              backgroundColor: day && day === selectedDay ? "#c1ff72" : "transparent", // Updated to fluorescent green
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
