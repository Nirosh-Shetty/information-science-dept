import Student from "../../model/studentModel.js"; // Adjust the path accordingly
import Class from "../../model/classModel.js";
// Assuming you have a class model
import bcrypt from "bcrypt";
export const addStudent = async (req, res) => {
  try {
    let {
      fullName,
      usn,
      dob,
      phoneNumber,
      className,
      courses,
      email,
      password,
    } = req.body;

    if (!fullName || !usn || !className || !password) {
      return res
        .status(400)
        .json({ message: "fullName, usn, and className are required." });
    }

    // Hash password before saving
    password = bcrypt.hashSync(password, 10);

    // Check if the student already exists
    let existingStudent = await Student.findOne({ usn });

    if (existingStudent) {
      // If the student exists, update their courses array
      existingStudent.courses = [
        ...new Set([...existingStudent.courses, ...courses]),
      ]; // Ensures no duplicates
      await existingStudent.save();
      return res.status(200).json({
        message: "Courses updated successfully!",
        student: existingStudent,
      });
    }

    // If student doesn't exist, create a new student
    const newStudent = new Student({
      fullName,
      usn,
      dob,
      phoneNumber,
      className,
      courses,
      email,
      password,
    });

    await newStudent.save();

    // Find the class and add the student to the class
    const cls = await Class.findOne({ name: className });

    if (!cls) {
      return res.status(404).json({ message: "Class not found." });
    }

    cls.students.push(newStudent._id);
    await cls.save();

    return res
      .status(201)
      .json({ message: "Student added successfully!", student: newStudent });
  } catch (error) {
    console.error("Error adding student:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getStudentsByClass = async (req, res) => {
  try {
    const { className } = req.query;

    if (!className) {
      return res
        .status(400)
        .json({ message: "className is required to fetch students." });
    }

    const students = await Student.find({ className });
    if (students.length === 0) {
      return res
        .status(404)
        .json({ message: "No students found for this class." });
    }

    return res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students by class:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const updateStudentByUsn = async (req, res) => {
  try {
    const { usn } = req.body;
    const updates = req.body;

    if (!usn) {
      return res
        .status(400)
        .json({ message: "USN is required to update student details." });
    }

    // Find the student by USN and update their information
    const updatedStudent = await Student.findOneAndUpdate({ usn }, updates, {
      new: true,
    });

    // If the student is not found, return a 404 response
    if (!updatedStudent) {
      return res
        .status(404)
        .json({ message: "Student not found with the provided USN." });
    }

    // Return the updated student data
    return res.status(200).json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error("Error updating student:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const deleteStudentByUsn = async (req, res) => {
  try {
    const { usn } = req.body;

    if (!usn) {
      return res
        .status(400)
        .json({ message: "USN is required to delete a student." });
    }

    // Find the student by USN and delete them
    const deletedStudent = await Student.findOneAndDelete({ usn });

    // If the student is not found, return a 404 response
    if (!deletedStudent) {
      return res
        .status(404)
        .json({ message: "Student not found with the provided USN." });
    }

    // Remove the student's reference from the class
    const cls = await Class.findOne({ name: deletedStudent.className });

    if (cls) {
      // Remove the student's ID from the class' students array
      cls.students = cls.students.filter(
        (studentId) => studentId.toString() !== deletedStudent._id.toString()
      );
      await cls.save();
    }

    // Return the deleted student data
    return res.status(200).json({
      message: "Student deleted successfully",
      student: deletedStudent,
    });
  } catch (error) {
    console.error("Error deleting student:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    return res.status(200).json(students);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
