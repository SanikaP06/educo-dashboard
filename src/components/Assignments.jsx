"use client"

import { useState, useEffect } from "react"
import { Plus, ChevronDown, X, Calendar, Clock } from "lucide-react"

const Assignments = () => {
  const [filterType, setFilterType] = useState("All")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200)
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    dueDate: "",
    status: "Upcoming",
  })

  // Track window size for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Methods of data",
      dueDate: "02 July, 10:30 AM",
      status: "In progress",
      statusColor: "#bfdbfe",
      statusTextColor: "#1e40af",
      avatar: "👥",
    },
    {
      id: 2,
      title: "Market Research",
      dueDate: "14 June, 12:45 AM",
      status: "Completed",
      statusColor: "#bbf7d0",
      statusTextColor: "#065f46",
      avatar: "🔍",
    },
    {
      id: 3,
      title: "Data Collection",
      dueDate: "12 May, 11:00 AM",
      status: "Upcoming",
      statusColor: "#fed7aa",
      statusTextColor: "#c2410c",
      avatar: "📊",
    },
    {
      id: 4,
      title: "User Interviews",
      dueDate: "25 July, 2:00 PM",
      status: "In progress",
      statusColor: "#bfdbfe",
      statusTextColor: "#1e40af",
      avatar: "🗣️",
    },
    {
      id: 5,
      title: "Final Presentation",
      dueDate: "30 July, 9:00 AM",
      status: "Upcoming",
      statusColor: "#fed7aa",
      statusTextColor: "#c2410c",
      avatar: "📝",
    },
  ])

  const filterOptions = ["All", "In progress", "Completed", "Upcoming"]

  const filteredAssignments =
    filterType === "All" ? assignments : assignments.filter((assignment) => assignment.status === filterType)

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const handleFilterChange = (filter) => {
    setFilterType(filter)
    setDropdownOpen(false)
  }

  const handleAddAssignment = () => {
    setShowAddForm(true)
  }

  const handleSaveAssignment = () => {
    if (newAssignment.title && newAssignment.dueDate) {
      const statusColors = {
        "In progress": { color: "#bfdbfe", textColor: "#1e40af" },
        Completed: { color: "#bbf7d0", textColor: "#065f46" },
        Upcoming: { color: "#fed7aa", textColor: "#c2410c" },
      }

      const avatars = ["📝", "📊", "🔍", "👥", "🗣️", "📚", "⏰", "📈"]
      const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)]

      const assignment = {
        id: assignments.length + 1,
        title: newAssignment.title,
        dueDate: newAssignment.dueDate,
        status: newAssignment.status,
        statusColor: statusColors[newAssignment.status].color,
        statusTextColor: statusColors[newAssignment.status].textColor,
        avatar: randomAvatar,
      }

      setAssignments([...assignments, assignment])
      setNewAssignment({
        title: "",
        dueDate: "",
        status: "Upcoming",
      })
      setShowAddForm(false)
    }
  }

  const handleCancelAdd = () => {
    setNewAssignment({
      title: "",
      dueDate: "",
      status: "Upcoming",
    })
    setShowAddForm(false)
  }

  return (
    <div style={{ 
      backgroundColor: "white",
      borderRadius: "12px",
      border: "1px solid #e2e8f0",
      padding: windowWidth < 640 ? "16px" : "20px",
      maxWidth: "400px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
    }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "18px",
          flexWrap: windowWidth < 480 ? "wrap" : "nowrap",
          gap: "8px",
        }}
      >
        <h3
          style={{
            fontSize: windowWidth < 640 ? "16px" : "18px",
            fontWeight: "600",
            color: "#1a202c",
            margin: 0,
          }}
        >
          Assignments
        </h3>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
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
                whiteSpace: "nowrap",
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
                {filterOptions.map((option, index) => (
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
                        index === 0 ? "8px 8px 0 0" : index === filterOptions.length - 1 ? "0 0 8px 8px" : "0",
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
            onClick={handleAddAssignment}
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
              flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#68d391")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#9ae6b4")}
          >
            <Plus style={{ height: "14px", width: "14px", color: "#1a202c" }} />
          </button>
        </div>
      </div>

      {/* Add Assignment Form */}
      {showAddForm && (
        <div
          style={{
            backgroundColor: "#f7fafc",
            borderRadius: "8px",
            padding: "14px",
            marginBottom: "18px",
            border: "1px solid #e2e8f0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#1a202c", margin: 0 }}>Add New Assignment</h4>
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
              placeholder="Assignment Title"
              value={newAssignment.title}
              onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
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

            <div style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="Due Date (e.g., 15 July, 10:00 AM)"
                value={newAssignment.dueDate}
                onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                style={{
                  padding: "8px 12px 8px 32px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  fontSize: "12px",
                  outline: "none",
                  transition: "border-color 0.2s",
                  width: "100%",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
              <Calendar
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  height: "14px",
                  width: "14px",
                  color: "#718096",
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "12px", color: "#718096", fontWeight: "500", margin: 0 }}>Status</label>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {["Upcoming", "In progress", "Completed"].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setNewAssignment({ ...newAssignment, status })}
                    style={{
                      padding: "4px 8px",
                      borderRadius: "6px",
                      border: "1px solid #e2e8f0",
                      backgroundColor: newAssignment.status === status ? "#f3f4f6" : "white",
                      color: "#1a202c",
                      fontSize: "11px",
                      fontWeight: newAssignment.status === status ? "600" : "400",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      if (newAssignment.status !== status) {
                        e.target.style.backgroundColor = "#f7fafc"
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (newAssignment.status !== status) {
                        e.target.style.backgroundColor = "white"
                      }
                    }}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "8px",
                marginTop: "4px",
                flexDirection: windowWidth < 480 ? "column" : "row",
              }}
            >
              <button
                onClick={handleSaveAssignment}
                style={{
                  flex: 1,
                  padding: "8px 12px",
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
                Add Assignment
              </button>
              <button
                onClick={handleCancelAdd}
                style={{
                  flex: 1,
                  padding: "8px 12px",
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

      {/* Assignments List */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: windowWidth < 640 ? "10px" : "12px",
        }}
      >
        {filteredAssignments.length > 0 ? (
          filteredAssignments.map((assignment) => (
            <div
              key={assignment.id}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: windowWidth < 640 ? "10px" : "12px",
                padding: "10px",
                borderRadius: "8px",
                transition: "background-color 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#f7fafc")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
            >
              <div
                style={{
                  width: windowWidth < 640 ? "36px" : "40px",
                  height: windowWidth < 640 ? "36px" : "40px",
                  background: "linear-gradient(135deg, #c084fc, #f472b6)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: windowWidth < 640 ? "14px" : "16px",
                  flexShrink: 0,
                }}
              >
                {assignment.avatar}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4
                  style={{
                    fontWeight: "600",
                    color: "#1a202c",
                    marginBottom: "4px",
                    fontSize: windowWidth < 640 ? "13px" : "14px",
                    lineHeight: "1.3",
                    margin: 0,
                  }}
                >
                  {assignment.title}
                </h4>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    marginBottom: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  <Clock style={{ height: "12px", width: "12px", color: "#718096" }} />
                  <p
                    style={{
                      fontSize: windowWidth < 640 ? "11px" : "12px",
                      color: "#718096",
                      margin: 0,
                    }}
                  >
                    {assignment.dueDate}
                  </p>
                </div>
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 8px",
                    borderRadius: "10px",
                    fontSize: "10px",
                    fontWeight: "600",
                    backgroundColor: assignment.statusColor,
                    color: assignment.statusTextColor,
                  }}
                >
                  {assignment.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "20px",
              color: "#718096",
              fontSize: "14px",
            }}
          >
            No {filterType.toLowerCase()} assignments found.
          </div>
        )}
      </div>
    </div>
  )
}

export default Assignments