"use client"

import { useState, useRef, useEffect } from "react"
import { TrendingUp, ChevronDown } from "lucide-react"

const HoursActivity = () => {
  const [viewType, setViewType] = useState("Weekly")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [hoveredBar, setHoveredBar] = useState(null)
  const [selectedBar, setSelectedBar] = useState(3) // Default selection: Wednesday
  const [chartHeight, setChartHeight] = useState(200)
  const chartRef = useRef(null)

  useEffect(() => {
    if (chartRef.current) {
      const updateHeight = () => {
        const height = chartRef.current.clientHeight
        setChartHeight(height)
      }

      updateHeight()
      window.addEventListener("resize", updateHeight)
      return () => window.removeEventListener("resize", updateHeight)
    }
  }, [])

  const weeklyData = [
    { day: "Su", hours: 4, fullDay: "Sunday" },
    { day: "Mo", hours: 6, fullDay: "Monday" },
    { day: "Tu", hours: 3, fullDay: "Tuesday" },
    { day: "We", hours: 7, fullDay: "Wednesday" },
    { day: "Th", hours: 5, fullDay: "Thursday" },
    { day: "Fr", hours: 8, fullDay: "Friday" },
    { day: "Sa", hours: 4, fullDay: "Saturday" },
  ]

  const monthlyData = [
    { day: "W1", hours: 25, fullDay: "Week 1" },
    { day: "W2", hours: 32, fullDay: "Week 2" },
    { day: "W3", hours: 28, fullDay: "Week 3" },
    { day: "W4", hours: 40, fullDay: "Week 4" },
  ]

  const currentData = viewType === "Weekly" ? weeklyData : monthlyData
  const maxHourValue = viewType === "Weekly" ? 8 : 40

  const getYAxisLabels = () => [
    { value: maxHourValue, label: `${maxHourValue}h` },
    { value: maxHourValue * 0.75, label: `${Math.round(maxHourValue * 0.75)}h` },
    { value: maxHourValue * 0.5, label: `${Math.round(maxHourValue * 0.5)}h` },
    { value: maxHourValue * 0.25, label: `${Math.round(maxHourValue * 0.25)}h` },
    { value: 1, label: "1h" },
  ]

  const yAxisLabels = getYAxisLabels()

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const handleViewChange = (view) => {
    setViewType(view)
    setDropdownOpen(false)
    setSelectedBar(0)
  }

  const handleBarClick = (index) => {
    setSelectedBar(index)
  }

  const selectedBarData = selectedBar !== null ? currentData[selectedBar] : null

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: 0, margin: 0 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1a202c", margin: 0 }}>Hours Activity</h3>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#10b981" }}>
            <TrendingUp style={{ height: "14px", width: "14px" }} />
            <span style={{ fontSize: "13px", fontWeight: "500" }}>+3% Increase than last week</span>
          </div>
          <div style={{ position: "relative" }}>
            <button
              onClick={handleDropdownToggle}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                color: "#718096",
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                padding: "6px 12px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "500",
              }}
            >
              <span>{viewType}</span>
              <ChevronDown style={{ height: "14px", width: "14px" }} />
            </button>
            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  marginTop: "4px",
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  zIndex: 20,
                  minWidth: "100px",
                }}
              >
                <button onClick={() => handleViewChange("Weekly")} style={dropdownStyle(viewType === "Weekly")}>Weekly</button>
                <button onClick={() => handleViewChange("Monthly")} style={dropdownStyle(viewType === "Monthly")}>Monthly</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div ref={chartRef} style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", minHeight: "200px" }}>
        <div style={{ position: "relative", flex: 1, display: "flex", height: "100%" }}>
          {/* Y-axis */}
          <div style={{ width: "30px", position: "relative", flexShrink: 0 }}>
            {yAxisLabels.map((label, index) => {
              const top = ((1 - label.value / maxHourValue) * (chartHeight - 40))
              return (
                <div key={index}>
                  <div style={{
                    position: "absolute",
                    top: `${top}px`,
                    left: 0,
                    fontSize: "11px",
                    color: "#9ca3af",
                    fontWeight: "500",
                    textAlign: "left",
                    width: "100%"
                  }}>{label.label}</div>
                  <div style={{
                    position: "absolute",
                    top: `${top}px`,
                    right: "-8px",
                    width: "8px",
                    height: "1px",
                    backgroundColor: "#e5e7eb",
                  }} />
                </div>
              )
            })}
          </div>

          {/* Bars */}
          <div style={{
            flex: 1,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            padding: "0 8px 30px 8px",
            position: "relative",
            height: "100%",
          }}>
            {currentData.map((item, index) => {
              const availableHeight = chartHeight - 40
              const barHeight = Math.max((item.hours / maxHourValue) * availableHeight, 10)
              const isActive = selectedBar === index
              const isHovered = hoveredBar === index
              let barColor = isActive ? "#fbbf24" : isHovered ? "#6b7280" : "#374151"

              return (
                <div
                  key={index}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", position: "relative", flex: 1, justifyContent: "flex-end", maxWidth: "30px" }}
                  onMouseEnter={() => setHoveredBar(index)}
                  onMouseLeave={() => setHoveredBar(null)}
                  onClick={() => handleBarClick(index)}
                >
                  <div style={{
                    width: "100%",
                    maxWidth: "20px",
                    height: `${barHeight}px`,
                    backgroundColor: barColor,
                    borderRadius: "4px 4px 0 0",
                    transition: "all 0.2s ease",
                    transform: isHovered ? "scaleY(1.02)" : "scaleY(1)",
                    transformOrigin: "bottom",
                    boxShadow: isHovered ? "0 2px 8px rgba(0, 0, 0, 0.15)" : "none",
                    marginBottom: "8px",
                  }} />

                  <span style={{ fontSize: "12px", color: "#6b7280", fontWeight: "500", marginTop: "4px" }}>
                    {item.day}
                  </span>

                  {isHovered && (
                    <div style={{
                      position: "absolute",
                      bottom: `${barHeight + 35}px`,
                      left: "50%",
                      transform: "translateX(-50%)",
                      backgroundColor: "#374151",
                      color: "white",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: "500",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                      zIndex: 10,
                      whiteSpace: "nowrap",
                    }}>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontWeight: "600", marginBottom: "2px" }}>{item.fullDay}</div>
                        <div style={{ color: "#d1d5db", fontSize: "11px" }}>
                          {item.hours}h {viewType === "Weekly" ? "today" : "this week"}
                        </div>
                      </div>
                      <div style={{
                        position: "absolute",
                        top: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 0,
                        height: 0,
                        borderLeft: "6px solid transparent",
                        borderRight: "6px solid transparent",
                        borderTop: "6px solid #374151",
                      }} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Main tooltip for selected bar */}
        {selectedBarData && (
          <div
            style={{
              position: "absolute",
              top: "15px",
              left: `${((selectedBar + 0.5) / currentData.length) * 100}%`,
              transform: "translateX(-50%)",
              backgroundColor: "#374151",
              color: "white",
              padding: "10px 14px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: "500",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              zIndex: 5,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "3px" }}>
              <div style={{ width: "6px", height: "6px", backgroundColor: "#fbbf24", borderRadius: "50%" }}></div>
              <span style={{ fontWeight: "600" }}>{selectedBarData.hours}h</span>
            </div>
            <div style={{ fontSize: "11px", color: "#d1d5db" }}>5 Jan 2023</div>
          </div>
        )}
      </div>
    </div>
  )
}

const dropdownStyle = (active) => ({
  width: "100%",
  padding: "8px 12px",
  textAlign: "left",
  border: "none",
  background: active ? "#f7fafc" : "transparent",
  color: "#1a202c",
  fontSize: "13px",
  fontWeight: "500",
  cursor: "pointer",
})

export default HoursActivity
