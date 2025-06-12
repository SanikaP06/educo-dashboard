"use client"

import { Star, ArrowRight } from "lucide-react"

const NewCourses = () => {
  const courses = [
    {
      id: 1,
      title: "Content Writing",
      lessons: "12 Lessons",
      rating: 4.8,
      type: "Data Research",
      color: "#fed7aa",
      iconBg: "#fed7aa",
      icon: "✏️",
    },
    {
      id: 2,
      title: "Usability Testing",
      lessons: "15 Lessons",
      rating: 5.0,
      type: "UI/UX Design",
      color: "#bbf7d0",
      iconBg: "#bbf7d0",
      icon: "🔍",
    },
    {
      id: 3,
      title: "Photography",
      lessons: "8 Lessons",
      rating: 4.6,
      type: "Art and Design",
      color: "#bfdbfe",
      iconBg: "#bfdbfe",
      icon: "📷",
    },
  ]

  return (
    <div style={{ marginBottom: "40px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1a202c" }}>New Courses</h2>
        <button
          style={{
            color: "#7c3aed",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#5b21b6")}
          onMouseLeave={(e) => (e.target.style.color = "#7c3aed")}
        >
          <span>View All</span>
          <ArrowRight style={{ height: "16px", width: "16px" }} />
        </button>
      </div>

      {/* Use the courses-grid class for horizontal layout */}
      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "16px",
                  backgroundColor: course.iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                }}
              >
                {course.icon}
              </div>
            </div>

            <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1a202c", marginBottom: "8px" }}>
              {course.title}
            </h3>
            <p style={{ color: "#718096", fontSize: "14px", marginBottom: "20px" }}>{course.lessons}</p>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: "12px", color: "#a0aec0", marginBottom: "4px", fontWeight: "500" }}>Rate</p>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Star style={{ height: "16px", width: "16px", color: "#fbbf24", fill: "#fbbf24" }} />
                  <span style={{ fontWeight: "700", color: "#1a202c", fontSize: "16px" }}>{course.rating}</span>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "12px", color: "#a0aec0", marginBottom: "4px", fontWeight: "500" }}>Type</p>
                <p style={{ fontSize: "14px", fontWeight: "600", color: "#1a202c" }}>{course.type}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NewCourses
