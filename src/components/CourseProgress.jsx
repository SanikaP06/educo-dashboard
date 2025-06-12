"use client"

import { useState } from "react"
import { Plus, ChevronDown, X } from "lucide-react"

const CourseProgress = () => {
  const [filterType, setFilterType] = useState("Active")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newCourse, setNewCourse] = useState({
    title: "",
    instructor: "",
    remaining: "",
    progress: 0,
  })

  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "3D Design Course",
      instructor: "Micheal Andrew",
      remaining: "8h 45 min",
      progress: 45,
      color: "#e9d5ff",
      progressColor: "#8b5cf6",
      avatar: "👤",
      status: "Active",
    },
    {
      id: 2,
      title: "Development Basics",
      instructor: "Natalia Varnan",
      remaining: "18h 12 min",
      progress: 75,
      color: "#fce7f3",
      progressColor: "#10b981",
      avatar: "👤",
      status: "In Progress",
    },
    {
      id: 3,
      title: "UI/UX Fundamentals",
      instructor: "Sarah Johnson",
      remaining: "12h 30 min",
      progress: 30,
      color: "#dbeafe",
      progressColor: "#3b82f6",
      avatar: "👤",
      status: "Active",
    },
    {
      id: 4,
      title: "Photography Basics",
      instructor: "David Wilson",
      remaining: "6h 15 min",
      progress: 90,
      color: "#dcfce7",
      progressColor: "#22c55e",
      avatar: "👤",
      status: "In Progress",
    },
  ])

  const filterOptions = ["Active", "In Progress"]

  const filteredCourses = courses.filter((course) => course.status === filterType)

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const handleFilterChange = (filter) => {
    setFilterType(filter)
    setDropdownOpen(false)
  }

  const handleAddCourse = () => {
    setShowAddForm(true)
  }

  const handleSaveCourse = () => {
    if (newCourse.title && newCourse.instructor) {
      const courseColors = [
        { color: "#e9d5ff", progressColor: "#8b5cf6" },
        { color: "#fce7f3", progressColor: "#ec4899" },
        { color: "#dbeafe", progressColor: "#3b82f6" },
        { color: "#dcfce7", progressColor: "#22c55e" },
        { color: "#fed7aa", progressColor: "#f97316" },
      ]

      const randomColor = courseColors[Math.floor(Math.random() * courseColors.length)]

      const course = {
        id: courses.length + 1,
        title: newCourse.title,
        instructor: newCourse.instructor,
        remaining: newCourse.remaining || "0h 0 min",
        progress: Number.parseInt(newCourse.progress) || 0,
        color: randomColor.color,
        progressColor: randomColor.progressColor,
        avatar: "👤",
        status: "Active",
      }

      setCourses([...courses, course])
      setNewCourse({ title: "", instructor: "", remaining: "", progress: 0 })
      setShowAddForm(false)
    }
  }

  const handleCancelAdd = () => {
    setNewCourse({ title: "", instructor: "", remaining: "", progress: 0 })
    setShowAddForm(false)
  }

  return (
    <div className="card">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1a202c" }}>Course You're Taking</h3>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
                padding: "6px 10px",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "500",
                transition: "all 0.2s",
                boxShadow: dropdownOpen ? "0 0 0 2px rgba(124, 58, 237, 0.1)" : "none",
              }}
              onMouseEnter={(e) => {
                if (!dropdownOpen) e.target.style.borderColor = "#cbd5e0"
              }}
              onMouseLeave={(e) => {
                if (!dropdownOpen) e.target.style.borderColor = "#e2e8f0"
              }}
            >
              <span>{filterType}</span>
              <ChevronDown
                style={{
                  height: "12px",
                  width: "12px",
                  transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              />
            </button>

            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  right: "0",
                  marginTop: "4px",
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  zIndex: 20,
                  minWidth: "120px",
                }}
              >
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleFilterChange(option)}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      textAlign: "left",
                      border: "none",
                      background: filterType === option ? "#f7fafc" : "transparent",
                      color: "#1a202c",
                      fontSize: "12px",
                      fontWeight: "500",
                      cursor: "pointer",
                      borderRadius:
                        option === filterOptions[0]
                          ? "8px 8px 0 0"
                          : option === filterOptions[filterOptions.length - 1]
                            ? "0 0 8px 8px"
                            : "0",
                      transition: "background-color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      if (filterType !== option) e.target.style.backgroundColor = "#f7fafc"
                    }}
                    onMouseLeave={(e) => {
                      if (filterType !== option) e.target.style.backgroundColor = "transparent"
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleAddCourse}
            style={{
              width: "28px",
              height: "28px",
              backgroundColor: "#9ae6b4",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#68d391")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#9ae6b4")}
          >
            <Plus style={{ height: "14px", width: "14px", color: "#1a202c" }} />
          </button>
        </div>
      </div>

      {/* Add Course Form */}
      {showAddForm && (
        <div
          style={{
            backgroundColor: "#f7fafc",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "20px",
            border: "1px solid #e2e8f0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#1a202c" }}>Add New Course</h4>
            <button
              onClick={handleCancelAdd}
              style={{
                color: "#718096",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                borderRadius: "4px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#1a202c")}
              onMouseLeave={(e) => (e.target.style.color = "#718096")}
            >
              <X style={{ height: "16px", width: "16px" }} />
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <input
              type="text"
              placeholder="Course Title"
              value={newCourse.title}
              onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
              style={{
                padding: "8px 12px",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                fontSize: "12px",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
              onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
            />
            <input
              type="text"
              placeholder="Instructor Name"
              value={newCourse.instructor}
              onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
              style={{
                padding: "8px 12px",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                fontSize: "12px",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
              onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
            />
            <input
              type="text"
              placeholder="Remaining Time (e.g., 10h 30 min)"
              value={newCourse.remaining}
              onChange={(e) => setNewCourse({ ...newCourse, remaining: e.target.value })}
              style={{
                padding: "8px 12px",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                fontSize: "12px",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
              onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
            />
            <input
              type="number"
              placeholder="Progress (%)"
              min="0"
              max="100"
              value={newCourse.progress}
              onChange={(e) => setNewCourse({ ...newCourse, progress: e.target.value })}
              style={{
                padding: "8px 12px",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                fontSize: "12px",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
              onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
            />
            <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
              <button
                onClick={handleSaveCourse}
                style={{
                  flex: 1,
                  padding: "8px 16px",
                  backgroundColor: "#7c3aed",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#6d28d9")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#7c3aed")}
              >
                Add Course
              </button>
              <button
                onClick={handleCancelAdd}
                style={{
                  flex: 1,
                  padding: "8px 16px",
                  backgroundColor: "#e5e7eb",
                  color: "#374151",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#d1d5db")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#e5e7eb")}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Courses List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div key={course.id} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  backgroundColor: course.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                }}
              >
                {course.avatar}
              </div>

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <div>
                    <h4 style={{ fontWeight: "600", color: "#1a202c", marginBottom: "2px", fontSize: "14px" }}>
                      {course.title}
                    </h4>
                    <p style={{ fontSize: "12px", color: "#718096" }}>
                      {course.avatar} {course.instructor}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: "10px", color: "#a0aec0", marginBottom: "2px", fontWeight: "500" }}>
                      Remaining
                    </p>
                    <p style={{ fontSize: "12px", fontWeight: "600", color: "#1a202c" }}>{course.remaining}</p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div className="progress-bar" style={{ flex: 1 }}>
                    <div
                      className="progress-fill"
                      style={{
                        backgroundColor: course.progressColor,
                        width: `${course.progress}%`,
                      }}
                    ></div>
                  </div>
                  <span style={{ fontSize: "14px", fontWeight: "700", color: "#1a202c" }}>{course.progress}%</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
              color: "#718096",
              fontSize: "14px",
            }}
          >
            No {filterType.toLowerCase()} courses found.
          </div>
        )}
      </div>
    </div>
  )
}

export default CourseProgress
