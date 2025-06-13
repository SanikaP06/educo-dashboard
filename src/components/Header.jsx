"use client"
import { Search, Menu } from "lucide-react"
import { useState, useEffect } from "react"

const Header = ({ setSidebarOpen, sidebarOpen }) => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200)

  // Track window size for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Determine if we're on mobile
  const isMobile = windowWidth < 768

  return (
    <header className="header">
      <div
        style={{
          display: "flex",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          padding: "12px 32px",
          maxWidth: "1600px",
          margin: "0 auto",
          width: "100%",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "12px" : "0",
        }}
      >
        {/* Top section with menu button and welcome message */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: isMobile ? "100%" : "auto",
          }}
        >
          {/* Menu button - show on mobile or when sidebar is closed on desktop */}
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              display: windowWidth < 1024 || !sidebarOpen ? "flex" : "none",
              padding: "10px",
              borderRadius: "12px",
              color: "#718096",
              background: "none",
              border: "none",
              cursor: "pointer",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
              marginRight: "12px",
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

          {/* Welcome message - increased font size */}
          <h1
            style={{
              fontSize: "1.4rem", // Increased from 1.1rem to be larger than "New Courses" (1.25rem)
              fontWeight: "700",
              color: "#1a202c",
              margin: 0,
              lineHeight: "1.2",
            }}
          >
            Welcome back Taylor 👋
          </h1>
        </div>

        {/* Search and User section - positioned on the right */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginLeft: isMobile ? "0" : "auto",
            width: isMobile ? "100%" : "auto",
          }}
        >
          <div
            style={{
              maxWidth: isMobile ? "100%" : "300px",
              width: isMobile ? "100%" : "300px",
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
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "24px",
                  fontSize: "14px",
                  outline: "none",
                  transition: "all 0.2s",
                  backgroundColor: "#f9fafb",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#7c3aed"
                  e.target.style.boxShadow = "0 0 0 3px rgba(124, 58, 237, 0.1)"
                  e.target.style.backgroundColor = "white"
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e2e8f0"
                  e.target.style.boxShadow = "none"
                  e.target.style.backgroundColor = "#f9fafb"
                }}
              />
            </div>
          </div>

          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "transform 0.2s",
              border: "2px solid white",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)"
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)"
            }}
          >
            <img
              src="/placeholder.svg?height=40&width=40"
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
