import Attendance from "../../model/attendanceModel.js";
import Student from "../../model/studentModel.js";

export const getAttendanceData = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { courses } = req.body;

    // Validate the student ID
    const studentExists = await Student.findById(studentId);
    if (!studentExists) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Build the query
    const query = { "attendance.student": studentId };

    // Filter by courses if provided
    if (courses && Array.isArray(courses)) {
      query.course = { $in: courses.map((course) => course._id) };
    }

    // Fetch attendance data
    const attendanceRecords = await Attendance.find(query)
      .populate("class", "name") // Populate the class details (e.g., name)
      .populate("course", "name subCode") // Populate the course details (e.g., name, subCode)
      .populate("attendance.student", "name usn") // Populate student details within the attendance
      .sort({ date: 1 }); // Sort by date

    // Return the results
    res.status(200).json({
      success: true,
      data: attendanceRecords,
    });
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching attendance data" });
  }
};
