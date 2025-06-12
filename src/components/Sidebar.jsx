"use client"
import {
  LayoutDashboard,
  BookOpen,
  Users,
  MessageCircle,
  Bell,
  CalendarIcon,
  Users2,
  Settings,
  X,
  GraduationCap,
} from "lucide-react"

const Sidebar = ({ sidebarOpen, setSidebarOpen, isMobile }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: BookOpen, label: "My Courses" },
    { icon: Users, label: "My Classes" },
    { icon: MessageCircle, label: "Messages" },
    { icon: Bell, label: "Notifications", badge: 2 },
    { icon: CalendarIcon, label: "Calendar" },
    { icon: Users2, label: "Community" },
    { icon: Settings, label: "Settings" },
  ]

  const handleToggle = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className={`sidebar ${sidebarOpen ? "open" : ""} ${!sidebarOpen && !isMobile ? "closed" : ""}`}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "32px 24px",
          borderBottom: "1px solid #4a5568",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <GraduationCap style={{ height: "36px", width: "36px", color: "#9ae6b4" }} />
          <span style={{ fontSize: "1.5rem", fontWeight: "700", color: "white" }}>EDUCO</span>
        </div>
        <button
          onClick={handleToggle}
          style={{
            color: "#a0aec0",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "6px",
            borderRadius: "6px",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#ffffff"
            e.target.style.backgroundColor = "#4a5568"
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#a0aec0"
            e.target.style.backgroundColor = "transparent"
          }}
        >
          <X style={{ height: "20px", width: "20px" }} />
        </button>
      </div>

      {/* Rest of the sidebar content remains the same */}
      <nav style={{ padding: "32px 20px", flex: 1 }}>
        {menuItems.map((item, index) => {
          const Icon = item.icon
          return (
            <div key={index} style={{ marginBottom: "8px" }}>
              <button className={`sidebar-item ${item.active ? "active" : ""}`}>
                <div className="sidebar-item-content">
                  <Icon style={{ height: "20px", width: "20px" }} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    style={{
                      backgroundColor: "#e53e3e",
                      color: "white",
                      fontSize: "12px",
                      borderRadius: "12px",
                      padding: "4px 8px",
                      minWidth: "20px",
                      textAlign: "center",
                      fontWeight: "700",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            </div>
          )
        })}
      </nav>
    </div>
  )
}

export default Sidebar
