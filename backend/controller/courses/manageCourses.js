import classModel from "../../model/classModel.js";
import Course from "../../model/courseModel.js";
import { addDummyClasses } from "./addClass.js";

export const addCourse = async (req, res) => {
  // addDummyClasses();
  try {
    const { name, subCode, className } = req.body;

    if (!name || !subCode || !className) {
      return res.status(400).json({
        message: "Name, subject code, and className (string) are required.",
      });
    }

    const newCourse = new Course({
      name,
      subCode,
      className: [className],
    });
    await newCourse.save();

    const cls = await classModel.findOne({ name: className });

    if (!cls) {
      return res.status(404).json({ message: "Class not found." });
    }

    cls.courses.push(newCourse._id);
    await cls.save();

    return res
      .status(201)
      .json({ message: "Course added successfully!", course: newCourse });
  } catch (error) {
    console.error("Error adding course:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getCourseByClass = async (req, res) => {
  try {
    const { className } = req.params;

    if (!className) {
      return res
        .status(400)
        .json({ message: "className is required to fetch course." });
    }
    const courses = await Course.find({ className });
    if (courses.length === 0) {
      return res
        .status(404)
        .json({ message: "No course found for this class." });
    }

    return res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses by class:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    if (courses.length === 0) {
      return res
        .status(404)
        .json({ message: "No course found for this class." });
    }
    return res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses by class:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const updateCourseById = async (req, res) => {
  try {
    const { id, className, name, subCode } = req.body;

    if (!id || !className) {
      return res
        .status(400)
        .json({ message: "ID and className are required." });
    }

    // Find the course by ID
    const course = await Course.findById(id);

    if (!course) {
      return res
        .status(404)
        .json({ message: "Course not found with the provided ID." });
    }

    // Check if className exists in the course
    if (!course.className.includes(className)) {
      return res
        .status(404)
        .json({ message: `ClassName "${className}" not found in the course.` });
    }

    // If multiple classNames are present
    if (course.className.length > 1) {
      // Remove the specified className from the className array
      const updatedClassNames = course.className.filter(
        (cls) => cls !== className
      );

      // Update the existing course with the new className array
      const updatedCourse = await Course.findByIdAndUpdate(
        id,
        { className: updatedClassNames },
        { new: true }
      );

      // Create a new course for the removed className
      const newCourseData = {
        className: [className],
        name: name,
        subCode: subCode,
      };

      const newCourse = await Course.create(newCourseData);

      return res.status(200).json({
        message:
          "Class removed from the original course and a new course created.",
        updatedCourse,
        newCourse,
      });
    }

    // If only one className is present
    if (course.className.length === 1) {
      // Update the course directly
      const updatedCourse = await Course.findByIdAndUpdate(
        id,
        { name, subCode, className },
        { new: true }
      );

      return res.status(200).json({
        message: "Course updated successfully.",
        course: updatedCourse,
      });
    }
  } catch (error) {
    console.error("Error updating course:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const deleteCourseByClassName = async (req, res) => {
  try {
    const { name, subCode, className } = req.body;

    if (!name || !subCode || !className) {
      return res.status(400).json({
        message:
          "Name, subject code, and className are required to delete a course.",
      });
    }

    // Find the course by name and subCode
    const course = await Course.findOne({ name, subCode });

    if (!course) {
      return res.status(404).json({
        message: "Course not found with the provided name and subject code.",
      });
    }

    // Check if the `className` exists in the array
    if (!course.className.includes(className)) {
      return res
        .status(404)
        .json({ message: "Class name not found in the course." });
    }

    // If the course has more than one class, remove the specific className
    if (course.className.length > 1) {
      course.className = course.className.filter((c) => c !== className);
      await course.save();

      // Remove course ID from the corresponding class document
      const cls = await classModel.findOne({ name: className });
      if (cls) {
        cls.courses = cls.courses.filter(
          (courseId) => !courseId.equals(course._id)
        );
        await cls.save();
      }

      return res.status(200).json({
        message: `Class name '${className}' removed from the course and updated in the class model.`,
        course,
      });
    }

    // If the course has only one class, delete the entire course
    await Course.findOneAndDelete({ _id: course._id });

    // Remove course ID from the corresponding class document
    const cls = await classModel.findOne({ name: className });
    if (cls) {
      cls.courses = cls.courses.filter(
        (courseId) => !courseId.equals(course._id)
      );
      await cls.save();
    }

    return res.status(200).json({
      message: `Course '${name}' with subject code '${subCode}' deleted as it contained only one class and removed from the class model.`,
      course,
    });
  } catch (error) {
    console.error("Error deleting course by class name:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
