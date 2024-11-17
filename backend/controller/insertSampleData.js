import Class from "../model/classModel.js";
import Admin from "../model/adminModel.js";
import Staff from "../model/staffModel.js";
import Student from "../model/studentModel.js";
import Course from "../model/courseModel.js";
import Attendance from "../model/attendanceModel.js";
import bcrypt from "bcrypt";

// Insert Data
async function insertData() {
  console.log(bcrypt.hash("staff1", 10));
  const admin = await Admin.create({
    username: "admin1",
    password: "$2a$10$7eITKDf.0GFYE7azwEy4yOHESRZQLpON2YFbotbJb.yxF2Nv2ofbi",
    email: "sanju@example.com",
    phoneNumber: "+1234567890",
    role: "admin",
    createdAt: {
      $date: "2024-11-01T09:11:53.644Z",
    },
    updatedAt: {
      $date: "2024-11-01T09:11:53.646Z",
    },
    fullName: "Sanju M",
    department: "ISE",
    bio: "",
    avatar: "",
  });

  const classData = await Class.create({
    name: "3rd Year ISE",
    department: "Information Science and Engineering",
    semester: 5,
    students: [],
    courses: [],
  });

  const staff1 = await Staff.create({
    name: "Dr. Ramesh Kumar",
    username: "staff1",
    employeeId: "EMP1234",
    email: "ramesh.kumar@college.edu",
    phoneNumber: "9876543210",
    role: "staff",
    courses: [],
    password: "",
  });

  const student1 = await Student.create({
    fullName: "Sita Sharma",
    usn: "USN001",
    dob: new Date("2003-02-15"),
    gender: "Female",
    phoneNumber: "9123456789",
    class: classData._id,
    role: "student",
    courses: [],
  });

  const course1 = await Course.create({
    name: "Data Structures",
    code: "CS101",
    class: classData._id,
    staff: staff1._id,
  });

  const course2 = await Course.create({
    name: "Operating Systems",
    code: "CS102",
    class: classData._id,
    staff: staff1._id,
  });

  // Updating class with students and courses
  classData.students.push(student1._id);
  classData.courses.push(course1._id, course2._id);
  await classData.save();

  // Updating student with course and marks
  student1.courses.push(
    {
      course: course1._id,
      internalMarks: [
        { internalNumber: 1, marks: 25 },
        { internalNumber: 2, marks: 28 },
        { internalNumber: 3, marks: 30 },
      ],
    },
    {
      course: course2._id,
      internalMarks: [
        { internalNumber: 1, marks: 20 },
        { internalNumber: 2, marks: 27 },
        { internalNumber: 3, marks: 29 },
      ],
    }
  );
  await student1.save();

  // Updating staff with courses
  staff1.courses.push(course1._id, course2._id);
  await staff1.save();

  // Creating attendance record
  await Attendance.create({
    class: classData._id,
    course: course1._id,
    date: new Date("2024-10-28"),
    attendance: [{ student: student1._id, present: true }],
  });

  console.log("Data insertion complete!");
}

export default insertData;
