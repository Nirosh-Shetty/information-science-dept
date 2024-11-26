import Class from "../model/classModel.js";
import Admin from "../model/adminModel.js";
import Staff from "../model/staffModel.js";
import Student from "../model/studentModel.js";
import Course from "../model/courseModel.js";
import Attendance from "../model/attendanceModel.js";
import bcrypt from "bcrypt";

// Insert Data
async function insertData() {
  console.log(bcrypt.hash("admin1", 10));

  // Create Admin
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

  // Create Classes
  const classData1 = await Class.create({
    name: "3rd Year ISE",
    department: "Information Science and Engineering",
    semester: 5,
    students: [], // Will be populated later
    courses: [], // Will be populated later
  });

  const classData2 = await Class.create({
    name: "2nd Year ISE",
    department: "Information Science and Engineering",
    semester: 3,
    students: [], // Will be populated later
    courses: [], // Will be populated later
  });

  // Create Staff
  const staff1 = await Staff.create({
    name: "Dr. Ramesh Kumar",
    username: "staff1",
    employeeId: "EMP1234",
    email: "ramesh.kumar@college.edu",
    phoneNumber: "9876543210",
    role: "staff",
    courses: [], // Will be populated later
    password: "$2b$10$fBkXcO0LgllYFVZxtZBYGO2qA/GQkCSCsvYTefVsmn908CBMxX.gy",
  });

  // Create Students
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
    subCode: "DS101", // Provide the subCode here
    class: classData1._id,
    staff: staff1._id,
  });

  const course2 = await Course.create({
    name: "Operating Systems",
    code: "CS102",
    subCode: "OS102", // Provide the subCode here
    class: classData1._id,
    staff: staff1._id,
  });

  const course3 = await Course.create({
    name: "Computer Networks",
    code: "CS201",
    subCode: "CN201", // Provide the subCode here
    class: classData2._id,
    staff: staff1._id,
  });

  const course4 = await Course.create({
    name: "Database Management Systems",
    code: "CS202",
    subCode: "DBMS202", // Provide the subCode here
    class: classData2._id,
    staff: staff1._id,
  });

  // Assign courses to staff
  staff1.courses.push(course1._id, course2._id, course3._id, course4._id);
  await staff1.save();

  // Update Classes with students and courses
  classData1.students.push(students[0]._id, students[1]._id, students[3]._id);
  classData1.courses.push(course1._id, course2._id);
  await classData1.save();

  classData2.students.push(students[2]._id, students[4]._id);
  classData2.courses.push(course3._id, course4._id);
  await classData2.save();

  // Assign courses to students
  students[0].courses.push(course1._id, course2._id);
  students[1].courses.push(course1._id, course2._id);
  students[2].courses.push(course3._id, course4._id);
  students[3].courses.push(course1._id, course2._id);
  students[4].courses.push(course3._id, course4._id);
  await Student.bulkSave(students);

  // Insert Attendance Records
  const attendanceRecords = [
    {
      class: classData1._id,
      course: course1._id,
      session: "did something",
      date: new Date("2024-10-28"),
      attendance: [
        { student: students[0]._id, present: true },
        { student: students[1]._id, present: false },
        { student: students[3]._id, present: true },
      ],
    },
    {
      class: classData1._id,
      session: "did something",
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
      session: "did something",
      date: new Date("2024-10-30"),
      attendance: [
        { student: students[2]._id, present: true },
        { student: students[4]._id, present: false },
      ],
    },
    {
      class: classData2._id,
      course: course4._id,
      session: "did something",
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
