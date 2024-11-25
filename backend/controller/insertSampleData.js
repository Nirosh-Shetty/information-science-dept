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
    fullName: "Sanju M",
    department: "ISE",
    bio: "",
    avatar: "",
  });

  const classData1 = await Class.create({
    name: "3rd Year ISE",
    department: "Information Science and Engineering",
    semester: 5,
    students: [],
    courses: [],
  });

  const classData2 = await Class.create({
    name: "2nd Year ISE",
    department: "Information Science and Engineering",
    semester: 3,
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
    password: "$2b$10$WgC5cLSbmB4nJ1IjPIvJP.0htRU4uO6VQ8ULXxLy0dHPmmPD/7Qj.",
  });

  const students = await Student.insertMany([
    {
      fullName: "Sita Sharma",
      usn: "USN001",
      dob: new Date("2003-02-15"),
      gender: "Female",
      phoneNumber: "9123456789",
      class: classData1._id,
      role: "student",
      courses: [],
    },
    {
      fullName: "Rajesh Kumar",
      usn: "USN002",
      dob: new Date("2003-05-10"),
      gender: "Male",
      phoneNumber: "9987654321",
      class: classData1._id,
      role: "student",
      courses: [],
    },
    {
      fullName: "Pooja Patil",
      usn: "USN003",
      dob: new Date("2004-01-22"),
      gender: "Female",
      phoneNumber: "9876545678",
      class: classData2._id,
      role: "student",
      courses: [],
    },
    {
      fullName: "Rahul Mehta",
      usn: "USN004",
      dob: new Date("2003-09-14"),
      gender: "Male",
      phoneNumber: "9123456781",
      class: classData1._id,
      role: "student",
      courses: [],
    },
    {
      fullName: "Anita Desai",
      usn: "USN005",
      dob: new Date("2003-11-20"),
      gender: "Female",
      phoneNumber: "9123456782",
      class: classData2._id,
      role: "student",
      courses: [],
    },
  ]);

  const course1 = await Course.create({
    name: "Data Structures",
    code: "CS101",
    class: classData1._id,
    staff: staff1._id,
  });

  const course2 = await Course.create({
    name: "Operating Systems",
    code: "CS102",
    class: classData1._id,
    staff: staff1._id,
  });

  const course3 = await Course.create({
    name: "Computer Networks",
    code: "CS201",
    class: classData2._id,
    staff: staff1._id,
  });

  const course4 = await Course.create({
    name: "Database Management Systems",
    code: "CS202",
    class: classData2._id,
    staff: staff1._id,
  });

  staff1.courses.push(course1._id, course2._id, course3._id, course4._id);
  await staff1.save();

  // Updating classes with students and courses
  classData1.students.push(students[0]._id, students[1]._id, students[3]._id);
  classData1.courses.push(course1._id, course2._id);
  await classData1.save();

  classData2.students.push(students[2]._id, students[4]._id);
  classData2.courses.push(course3._id, course4._id);
  await classData2.save();

  // Assign courses to students and update attendance
  const attendanceRecords = [
    {
      class: classData1._id,
      course: course1._id,
      session: "did somthing",
      date: new Date("2024-10-28"),
      attendance: [
        { student: students[0]._id, present: true },
        { student: students[1]._id, present: false },
        { student: students[3]._id, present: true },
      ],
    },
    {
      class: classData1._id,
      session: "did somthing",
      course: course2._id,
      date: new Date("2024-11-01"),
      attendance: [
        { student: students[0]._id, present: true },
        { student: students[1]._id, present: true },
        { student: students[3]._id, present: false },
      ],
    },
    {
      class: classData2._id,
      course: course3._id,
      session: "did somthing",
      date: new Date("2024-10-30"),
      attendance: [
        { student: students[2]._id, present: true },
        { student: students[4]._id, present: false },
      ],
    },
    {
      class: classData2._id,
      course: course4._id,
      session: "did somthing",
      date: new Date("2024-11-02"),
      attendance: [
        { student: students[2]._id, present: true },
        { student: students[4]._id, present: true },
      ],
    },
  ];

  await Attendance.insertMany(attendanceRecords);

  console.log("Data insertion complete!");
}

export default insertData;
