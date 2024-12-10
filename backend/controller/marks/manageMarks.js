import Marks from "../../model/marksModel.js";

export const createMarks = async (req, res) => {
  const { marks, uploadedBy } = req.body;

  if (!marks || !Array.isArray(marks)) {
    return res.status(400).json({ error: "Invalid marks data." });
  }
  console.log(marks);
  try {
    const operations = marks.map(async (mark) => {
      const { studentId, subjectId } = mark;
      const { IA1, IA2, IA3 } = mark.marks;

      if (!studentId || !subjectId) {
        throw new Error("Missing studentId or subjectId.");
      }

      // Check if a mark entry for the student and subject already exists
      const existingMark = await Marks.findOne({ studentId, subjectId });

      if (existingMark) {
        // Update the existing entry
        existingMark.marks.IA1 = IA1 ?? existingMark.marks.IA1;
        existingMark.marks.IA2 = IA2 ?? existingMark.marks.IA2;
        existingMark.marks.IA3 = IA3 ?? existingMark.marks.IA3;
        existingMark.uploadedBy = uploadedBy || existingMark.uploadedBy;
        await existingMark.save();
      } else {
        // Create a new entry
        const marksss = await Marks.create({
          studentId,
          subjectId,
          marks: { IA1, IA2, IA3 },
          uploadedBy,
        });
        console.log(marksss);
      }
    });

    // Wait for all the operations to complete
    await Promise.all(operations);

    res.status(200).json({ message: "Marks uploaded successfully." });
  } catch (error) {
    console.error("Error uploading marks:", error);
    res.status(500).json({ error: "Failed to upload marks." });
  }
}

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

export const getMarksBySubAndStudId = async (req, res) => {
  try {
    const { studentId, subjectId } = req.params;
    const marks = await Marks.find({ studentId, subjectId })
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
}