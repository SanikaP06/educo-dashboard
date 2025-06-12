"use client"
import { Search, Menu } from "lucide-react"

const Header = ({ setSidebarOpen, sidebarOpen }) => {
  return (
    <header className="header">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 32px",
          maxWidth: "1600px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Menu button - show on mobile or when sidebar is closed on desktop */}
        <button
          onClick={() => setSidebarOpen(true)}
          style={{
            display: window.innerWidth < 1024 || !sidebarOpen ? "flex" : "none",
            padding: "10px",
            borderRadius: "12px",
            color: "#718096",
            background: "none",
            border: "none",
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#1a202c"
            e.target.style.backgroundColor = "#f7fafc"
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#718096"
            e.target.style.backgroundColor = "transparent"
          }}
        >
          <Menu style={{ height: "24px", width: "24px" }} />
        </button>

        {/* Spacer to push search and user to the right */}
        <div style={{ flex: 1 }} />

        {/* Search and User section - positioned on the right */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              maxWidth: "300px",
              width: "300px", // Fixed width instead of flex
              position: "relative",
            }}
          >
            <div style={{ position: "relative" }}>
              <Search
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#a0aec0",
                  height: "18px",
                  width: "18px",
                  zIndex: 1,
                }}
              />
              <input
                type="text"
                placeholder="Search courses"
                style={{
                  width: "100%",
                  paddingLeft: "44px",
                  paddingRight: "20px",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  fontSize: "14px",
                  outline: "none",
                  transition: "all 0.2s",
                  backgroundColor: "#f7fafc",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#7c3aed"
                  e.target.style.boxShadow = "0 0 0 3px rgba(124, 58, 237, 0.1)"
                  e.target.style.backgroundColor = "white"
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e2e8f0"
                  e.target.style.boxShadow = "none"
                  e.target.style.backgroundColor = "#f7fafc"
                }}
              />
            </div>
          </div>

          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #c084fc, #f472b6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "transform 0.2s",
              border: "2px solid white",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)"
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)"
            }}
          >
            <span
              style={{
                fontSize: "16px",
                fontWeight: "700",
                color: "white",
              }}
            >
              T
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header