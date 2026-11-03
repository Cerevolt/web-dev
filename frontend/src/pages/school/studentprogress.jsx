
import React, { useState } from "react";
import "./studentprogress.css";

const students = [
  { id: 1, name: "Aarav Sharma", className: "Class 1", attendance: 94, academic: 82, status: "On Track" },
  { id: 2, name: "Ananya Das", className: "Class 2", attendance: 88, academic: 76, status: "On Track" },
  { id: 3, name: "Rohan Sen", className: "Class 3", attendance: 72, academic: 48, status: "Needs Support" },
  { id: 4, name: "Priya Roy", className: "Class 4", attendance: 96, academic: 91, status: "On Track" },
  { id: 5, name: "Ishaan Ghosh", className: "Class 2", attendance: 79, academic: 61, status: "Under Review" },
  { id: 6, name: "Meera Paul", className: "Class 5", attendance: 91, academic: 85, status: "On Track" },
];

function StudentProgress() {
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [search, setSearch] = useState("");

  const filteredStudents = students.filter((student) => {
    const matchesClass = selectedClass === "All Classes" || student.className === selectedClass;
    const matchesSearch = student.name.toLowerCase().includes(search.toLowerCase());
    return matchesClass && matchesSearch;
  });

  const averageAcademic = Math.round(
    students.reduce((total, student) => total + student.academic, 0) / students.length
  );

  const averageAttendance = Math.round(
    students.reduce((total, student) => total + student.attendance, 0) / students.length
  );

  return (
    <div className="school-page">
      <div className="school-page-header">
        <div>
          <h1>Student Progress</h1>
          <p>Monitor academic performance and attendance across classes.</p>
        </div>
      </div>

      <div className="student-progress-stats">
        <div className="student-progress-stat">
          <span>Students Monitored</span>
          <h2>{students.length}</h2>
          <small>Across all classes</small>
        </div>

        <div className="student-progress-stat">
          <span>Average Academic Score</span>
          <h2>{averageAcademic}%</h2>
          <small>Based on sample assessment data</small>
        </div>

        <div className="student-progress-stat">
          <span>Average Attendance</span>
          <h2>{averageAttendance}%</h2>
          <small>Overall attendance rate</small>
        </div>

        <div className="student-progress-stat">
          <span>Needs Support</span>
          <h2>{students.filter((student) => student.status === "Needs Support").length}</h2>
          <small>Students requiring attention</small>
        </div>
      </div>

      <div className="student-progress-card">
        <div className="school-section-heading">
          <div>
            <h2>Student Performance Overview</h2>
            <p>Review individual student academic and attendance records.</p>
          </div>
        </div>

        <div className="student-progress-filters">
          <input
            type="text"
            placeholder="Search student name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
            <option>All Classes</option>
            <option>Class 1</option>
            <option>Class 2</option>
            <option>Class 3</option>
            <option>Class 4</option>
            <option>Class 5</option>
          </select>
        </div>

        <div className="school-table-wrapper">
          <table className="student-progress-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Class</th>
                <th>Academic Score</th>
                <th>Attendance</th>
                <th>Progress Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td className="student-name-cell">{student.name}</td>
                    <td>{student.className}</td>
                    <td>
                      <div className="student-progress-value">
                        <div className="student-progress-bar">
                          <span style={{ width: `${student.academic}%` }}></span>
                        </div>
                        <span>{student.academic}%</span>
                      </div>
                    </td>
                    <td>{student.attendance}%</td>
                    <td>
                      <span className={`student-progress-status ${student.status.toLowerCase().replaceAll(" ", "-")}`}>
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="student-empty-state">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StudentProgress;
