import Marks from "../../models/marks.model.js";

export const createMarks = async (req, res) => {
  try {
    const marks = new Marks(req.body);
    const savedMarks = await marks.save();
    return res
      .status(201)
      .json({ message: "Marks created successfully", data: savedMarks });
  } catch (error) {
    console.error("Error creating marks:", error);
    return res.status(500).json({ error: "Failed to create marks" });
  }
};

export const getMarksById = async (req, res) => {
  try {
    const { id } = req.params;
    const marks = await Marks.findById(id)
      .populate("studentId")
      .populate("subjectId")
      .populate("uploadedBy");

    if (!marks) {
      return res.status(404).json({ error: "Marks not found" });
    }
    return res
      .status(200)
      .json({ message: "Marks fetched successfully", data: marks });
  } catch (error) {
    console.error("Error fetching marks:", error);
    return res.status(500).json({ error: "Failed to fetch marks" });
  }
};

export const updateMarksById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMarks = await Marks.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedMarks) {
      return res.status(404).json({ error: "Marks not found" });
    }
    return res
      .status(200)
      .json({ message: "Marks updated successfully", data: updatedMarks });
  } catch (error) {
    console.error("Error updating marks:", error);
    return res.status(500).json({ error: "Failed to update marks" });
  }
};

export const deleteMarksById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMarks = await Marks.findByIdAndDelete(id);

    if (!deletedMarks) {
      return res.status(404).json({ error: "Marks not found" });
    }
    return res.status(200).json({ message: "Marks deleted successfully" });
  } catch (error) {
    console.error("Error deleting marks:", error);
    return res.status(500).json({ error: "Failed to delete marks" });
  }
};

export const getMarksByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;
    const marks = await Marks.find({ studentId })
      .populate("studentId")
      .populate("subjectId")
      .populate("uploadedBy");

    if (!marks) {
      return res.status(404).json({ error: "Marks not found" });
    }
    return res
      .status(200)
      .json({ message: "Marks fetched successfully", data: marks });
  } catch (error) {
    console.error("Error fetching marks:", error);
    return res.status(500).json({ error: "Failed to fetch marks" });
  }
};

export const getMarksBySubjectId = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const marks = await Marks.find({ subjectId })
      .populate("studentId")
      .populate("subjectId")
      .populate("uploadedBy");

    if (!marks) {
      return res.status(404).json({ error: "Marks not found" });
    }
    return res
      .status(200)
      .json({ message: "Marks fetched successfully", data: marks });
  } catch (error) {
    console.error("Error fetching marks:", error);
    return res.status(500).json({ error: "Failed to fetch marks" });
  }
};