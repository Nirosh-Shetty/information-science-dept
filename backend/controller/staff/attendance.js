import courseModel from "../../model/courseModel.js";
import attendanceModel from "../../model/attendanceModel.js";
import classModel from "../../model/classModel.js";
import mongoose from "mongoose";
import moment from "moment";
import studentModel from "../../model/studentModel.js";

const ObjectId = mongoose.Types.ObjectId;

export const getAttendanceHistory = async (req, res) => {
  const { currentSelectedCourse } = req.body;
  const courseId = currentSelectedCourse._id;

  try {
    const response = await attendanceModel
      .find({ course: courseId })
      .populate("course", "_id name")
      .populate("class", "_id name");

    let filteredData = response.map((item) => {
      let presentCount = 0;
      let totalCount = 0;

      item.attendance.forEach((attendanceItem) => {
        if (attendanceItem.attendance === "Present") {
          presentCount++;
        }
        totalCount++;
      });

      const formattedTime = moment(item.date).format("hh:mm A MMM D 'YY");

      return {
        _id: item._id,
        className: item.class.name,
        subject: item.course.name,
        time: formattedTime,
        session: item.session,
        attendance: { attended: presentCount, total: totalCount },
      };
    });

    return res.status(201).json({
      message: "Attendance list fetched successfully",
      success: true,
      filteredData,
    });
  } catch (error) {
    console.error("Error fetching attendance list:", error.message);
    return res
      .status(500)
      .json({ message: "Server error", success: false, error: error.message });
  }
};

export const deleteAttendance = async (req, res) => {
  console.log("dfhdsxgdsxggdfghhfgd");
  const { id } = req.params; // Corrected from `req.prams`
  try {
    await attendanceModel.deleteOne({ _id: id });
    return res.status(201).json({
      message: "Attendance Deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting attendance:", error.message);
    return res
      .status(500)
      .json({ message: "Server error", success: false, error: error.message });
  }
};

export const studentListWithAttendance = async (req, res) => {
  const { id } = req.params; // Corrected from `req.prams`
  const { data } = req.body; // Corrected from `req.data`
  // Implement the edit logic here
  const reponse = await attendanceModel
    .findById(id)
    .populate("attendance.student", "_id fullName usn");
  console.log(reponse);
  return res.status(201).json({
    message: "Attendance fetched successfully",
    success: true,
    data: reponse,
  });
};

export const saveOrUpdateAttendance = async (req, res) => {
  // console.log(req.body);
  const { type } = req.params;
  console.log(type);
  try {
    if (type == "update") {
      const originalFormat = req.body;
      // Assuming `originalFormat` is the modified list of attendance
      if (!originalFormat) {
        return res.status(400).json({ message: "Invalid data format" });
      }

      // Update attendance in the database
      const updatedAttendance = await attendanceModel.findByIdAndUpdate(
        originalFormat._id,
        {
          class: originalFormat.class,
          course: originalFormat.course,
          date: originalFormat.date,
          session: originalFormat.session,
          attendance: originalFormat.attendance, // Assuming attendance is an array of objects with updated student information
        },
        { new: true } // Return the updated document
      );

      if (!updatedAttendance) {
        return res.status(404).json({ message: "Attendance record not found" });
      }
      console.log("done");
      return res.status(200).json({
        message: "Attendance updated successfully",
        updatedAttendance,
      });
    }
  } catch (error) {
    console.error("Error updating attendance:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const studentListForNewAttendance = async (req, res) => {
  try {
    const { courseId, className } = req.body;

    // const classNameFormated = className.replace(" - ", " ");
    console.log(courseId, className);
    // Find the class by name and populate students array
    const selectedClass = await classModel
      .findOne({ name: "3rd Year ISE" })
      .populate("students", "_id fullName usn courses");
    if (!selectedClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Find the course by ID
    const selectedCourse = await courseModel.findById(courseId);
    if (!selectedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    // console.log(selectedClass);
    // Filter students who belong to the selected class and course
    const students = selectedClass.students;
    // .filter((student) => {
    //   // Check if the student has courses that include the selected course ID
    //   if (!student.courses) return false;
    //   return student.courses.some((course) => {
    //     // console.log(course.course.toString());
    //     return course?.course?.toString() === courseId.toString();
    //   });
    // });

    if (students.length === 0) {
      return res
        .status(404)
        .json({ message: "No students found for this class and course" });
    }

    // Prepare the attendance object
    const data = await new attendanceModel({
      _id: "some",
      class: selectedClass._id,
      course: selectedCourse._id,
      date: new Date(), // Current date
      session: "Morning", // You can customize this based on your needs
      attendance: students.map((student) => ({
        student: {
          _id: student._id,
          fullName: student.fullName,
          usn: student.usn,
        },
        attendance: "Present",
        _id: "some", // Mark all students as present initially
      })),
    }).populate("attendance.student", "fullName usn _id");
    console.log(data);
    // Send the attendance object to the front end
    return res.status(200).json({
      message: "Student list for new attendance provided",
      data,
    });
  } catch (error) {
    console.error("Error fetching student list for attendance:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
