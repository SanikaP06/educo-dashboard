import { Star } from "lucide-react"

const NewCourses = () => {
  const courses = [
    {
      id: 1,
      title: "Content Writing",
      lessons: "12 Lessons",
      rating: 4.8,
      type: "Data Research",
      color: "#fff3e0",
      iconBg: "#fff3e0",
      icon: "✏️",
    },
    {
      id: 2,
      title: "Usability Testing",
      lessons: "15 Lessons",
      rating: 5.0,
      type: "UI/UX Design",
      color: "#e8f5e9",
      iconBg: "#e8f5e9",
      icon: "🔍",
    },
    {
      id: 3,
      title: "Photography",
      lessons: "8 Lessons",
      rating: 4.6,
      type: "Art and Design",
      color: "#e3f2fd",
      iconBg: "#e3f2fd",
      icon: "📷",
    },
  ]

  return (
    <div className="courses-grid">
      {courses.map((course) => (
        <div
          key={course.id}
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "16px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
            border: "1px solid rgba(0, 0, 0, 0.03)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                backgroundColor: course.iconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                flexShrink: 0,
              }}
            >
              {course.icon}
            </div>
            <div>
              <h3 style={{ fontSize: "0.95rem", fontWeight: "600", color: "#1a202c", margin: 0 }}>{course.title}</h3>
              <p style={{ color: "#718096", fontSize: "13px", margin: "2px 0 0 0" }}>{course.lessons}</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: "11px", color: "#a0aec0", marginBottom: "2px", fontWeight: "500" }}>Rate</p>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Star style={{ height: "12px", width: "12px", color: "#fbbf24", fill: "#fbbf24" }} />
                <span style={{ fontWeight: "700", color: "#1a202c", fontSize: "13px" }}>{course.rating}</span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "11px", color: "#a0aec0", marginBottom: "2px", fontWeight: "500" }}>Type</p>
              <p style={{ fontSize: "13px", fontWeight: "600", color: "#1a202c" }}>{course.type}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NewCourses
