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

        <div className="dashboard-layout" style={{ paddingTop: "6px" }}>
          {/* Left Content */}
          <div className="left-content">
            <div style={{ marginBottom: "14px" }}>
              <div
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}
              >
                <h2 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1a202c", margin: 0 }}>New Courses</h2>
                <button
                  style={{
                    color: "#6b7280",
                    fontSize: "14px",
                    textDecoration: "none",
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                  onClick={() => console.log("View all courses")}
                >
                  View All
                </button>
              </div>
              <NewCourses />
            </div>

            {/* Middle Section with Hours Activity and Daily Schedule side by side */}
            <div className="middle-section">
              <div
                style={{
                  background: "white",
                  borderRadius: "16px",
                  padding: "14px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                  border: "1px solid rgba(0, 0, 0, 0.03)",
                }}
              >
                <HoursActivity />
              </div>
              <div
                style={{
                  background: "white",
                  borderRadius: "16px",
                  padding: "14px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                  border: "1px solid rgba(0, 0, 0, 0.03)",
                }}
              >
                <DailySchedule />
              </div>
            </div>

            {/* Course Progress below - full width */}
            <div
              style={{
                background: "white",
                borderRadius: "16px",
                padding: "14px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                border: "1px solid rgba(0, 0, 0, 0.03)",
              }}
            >
              <CourseProgress />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="right-sidebar">
            <div
              style={{
                background: "white",
                borderRadius: "16px",
                padding: "14px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                marginBottom: "14px",
                border: "1px solid rgba(0, 0, 0, 0.03)",
              }}
            >
              <Calendar />
            </div>
            <div
              style={{
                background: "white",
                borderRadius: "16px",
                padding: "14px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                border: "1px solid rgba(0, 0, 0, 0.03)",
              }}
            >
              <Assignments />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
