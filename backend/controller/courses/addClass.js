import mongoose from "mongoose";
import Class from "../../model/classModel.js";

export async function addDummyClasses() {
  try {

    const classData = [
      { name: "2nd Year - 2 ISE1", department: "ISE", semester: 0, students: [], courses: [] },
      { name: "2nd Year - 2 ISE2", department: "ISE", semester: 0, students: [], courses: [] },
      { name: "3rd Year - 3 ISE1", department: "ISE", semester: 0, students: [], courses: [] },
      { name: "3rd Year - 3 ISE2", department: "ISE", semester: 0, students: [], courses: [] },
      { name: "4th Year - 4 ISE1", department: "ISE", semester: 0, students: [], courses: [] },
      { name: "4th Year - 4 ISE2", department: "ISE", semester: 0, students: [], courses: [] },
    ];

    // Clear existing classes (optional)
    await Class.deleteMany({});

    const result = await Class.insertMany(classData);

    console.log("Dummy classes added successfully:", result);

  } catch (error) {
    console.error("Error adding dummy classes:", error);
  }
}
