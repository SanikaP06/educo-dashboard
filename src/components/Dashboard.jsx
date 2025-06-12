"use client"
import { useState, useEffect } from "react"
import Sidebar from "./Sidebar"
import Header from "./Header"
import NewCourses from "./NewCourses"
import HoursActivity from "./HoursActivity"
import DailySchedule from "./DailySchedule"
import Calendar from "./Calendar"
import Assignments from "./Assignments"
import CourseProgress from "./CourseProgress"

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true) // Default to open on desktop
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      // On mobile, start with sidebar closed
      if (mobile) {
        setSidebarOpen(false)
      } else {
        // On desktop, start with sidebar open
        setSidebarOpen(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div className="dashboard-container">
      {/* Mobile overlay */}
      <div
        className={`mobile-overlay ${sidebarOpen && isMobile ? "show" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} isMobile={isMobile} />

      {/* Main Content */}
      <div className={`main-content ${!sidebarOpen && !isMobile ? "sidebar-closed" : ""}`}>
        <Header setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

        <div className="dashboard-layout">
          {/* Left Content */}
          <div className="left-content">
            <div style={{ 
              marginBottom: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingRight: "340px" // Account for right sidebar width + gap
            }}>
              <h1
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  color: "#1a202c",
                  marginBottom: "8px",
                  lineHeight: "1.2",
                }}
              >
                Welcome back Taylor 👋
              </h1>
            </div>

            <NewCourses />

            {/* Middle Section with Hours Activity and Daily Schedule side by side */}
            <div className="middle-section">
              <div className="card">
                <HoursActivity />
              </div>
              <div className="card">
                <DailySchedule />
              </div>
            </div>

            {/* Course Progress below - full width */}
            <div className="card">
              <CourseProgress />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="right-sidebar">
            <Calendar />
            <Assignments />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard