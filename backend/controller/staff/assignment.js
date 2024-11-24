import Assignment from "../../model/assignmentModel.js";
import Staff from "../../model/staffModel.js";

// Add Assignment
export const addAssignment = async (req, res) => {
  try {
    const { title, description, dueDate, classes } = req.body;
    const { employeeId } = req.params;

    // Create a new assignment
    const assignment = new Assignment({
      title,
      description,
      dueDate,
      classes,
    });
    await assignment.save();

    // Find the staff by employeeId and update assignments array
    const updatedStaff = await Staff.findOneAndUpdate(
      { employeeId },
      { $push: { assignment: assignment._id } },
      { new: true } // Return updated staff object
    );
    console.log(updatedStaff)
    if (!updatedStaff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.status(200).json({
      message: "Assignment added successfully",
      assignment,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


// Update Assignment
export const updateAssignment = async (req, res) => {
  try {
    const { _id } = req.params;
    const { title, description, dueDate, classes } = req.body;

    const updatedAssignment = await Assignment.findByIdAndUpdate(
      _id,
      { title, description, dueDate, classes },
      { new: true } // Return updated document
    );

    if (!updatedAssignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.status(200).json({
      message: "Assignment updated successfully",
      updatedAssignment,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


// Delete Assignment
export const deleteAssignment = async (req, res) => {
  try {
    const { _id } = req.params;

    const deletedAssignment = await Assignment.findByIdAndDelete(_id);

    if (!deletedAssignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    // Remove assignment reference from all staff
    await Staff.updateMany(
      { assignments: _id },
      { $pull: { assignment: _id } }
    );

    res.status(200).json({ message: "Assignment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


// Get All Assignments
export const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Get Assignments by Class Name
export const getAssignmentsByClassName = async (req, res) => {
  try {
    const { className } = req.params; // Get class name from params

    const assignments = await Assignment.find({
      "classes.className": className,
    });
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
