"use client"

import { ChevronRight } from "lucide-react"

const DailySchedule = () => {
  const scheduleItems = [
    {
      id: 1,
      title: "Design System",
      type: "Lecture - Class",
      color: "#ffedd5",
      iconColor: "#ea580c",
      icon: "🎨",
    },
    {
      id: 2,
      title: "Typography",
      type: "Group - Test",
      color: "#dbeafe",
      iconColor: "#2563eb",
      icon: "📝",
    },
    {
      id: 3,
      title: "Color Style",
      type: "Group - Test",
      color: "#dcfce7",
      iconColor: "#16a34a",
      icon: "🎨",
    },
    {
      id: 4,
      title: "Visual Design",
      type: "Lecture - Test",
      color: "#fef3c7",
      iconColor: "#d97706",
      icon: "👁️",
    },
  ]

  return (
    <div className="card">
      <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#111827", marginBottom: "24px" }}>
        Daily Schedule
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {scheduleItems.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px",
              borderRadius: "8px",
              transition: "background-color 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f9fafb")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  backgroundColor: item.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "18px" }}>{item.icon}</span>
              </div>
              <div>
                <h4 style={{ fontWeight: "500", color: "#111827", marginBottom: "2px" }}>{item.title}</h4>
                <p style={{ fontSize: "14px", color: "#6b7280" }}>{item.type}</p>
              </div>
            </div>
            <ChevronRight style={{ height: "20px", width: "20px", color: "#9ca3af" }} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default DailySchedule
