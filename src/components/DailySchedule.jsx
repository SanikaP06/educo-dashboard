"use client"
import { ChevronRight } from "lucide-react"

const DailySchedule = () => {
  const scheduleItems = [
    {
      id: 1,
      title: "Design System",
      type: "Lecture - Class",
      color: "#fff3e0",
      iconColor: "#ea580c",
      icon: "🎨",
    },
    {
      id: 2,
      title: "Typography",
      type: "Group - Test",
      color: "#e3f2fd",
      iconColor: "#2563eb",
      icon: "📝",
    },
    {
      id: 3,
      title: "Color Style",
      type: "Group - Test",
      color: "#e8f5e9",
      iconColor: "#16a34a",
      icon: "🎨",
    },
    {
      id: 4,
      title: "Visual Design",
      type: "Lecture - Test",
      color: "#fff8e1",
      iconColor: "#d97706",
      icon: "👁️",
    },
  ]

  return (
    <div style={{ height: "100%" }}>
      <h3 style={{ fontSize: "0.9rem", fontWeight: "600", color: "#111827", marginBottom: "10px" }}>Daily Schedule</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {scheduleItems.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "6px",
              borderRadius: "8px",
              transition: "background-color 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f9fafb")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  backgroundColor: item.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "14px" }}>{item.icon}</span>
              </div>
              <div>
                <h4
                  style={{
                    fontWeight: "500",
                    color: "#111827",
                    marginBottom: "2px",
                    fontSize: "13px",
                    lineHeight: "1.2",
                    margin: 0,
                  }}
                >
                  {item.title}
                </h4>
                <p style={{ fontSize: "11px", color: "#6b7280", lineHeight: "1.2", margin: 0 }}>{item.type}</p>
              </div>
            </div>
            <ChevronRight style={{ height: "14px", width: "14px", color: "#9ca3af" }} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default DailySchedule
