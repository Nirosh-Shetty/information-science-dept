import Staff from "../../model/staffModel.js";
import bcrypt from "bcrypt";

export const addStaff = async (req, res) => {
    try {
        const { name, employeeId, email, phoneNumber, courses, designation, password } = req.body;
        if (!name || !employeeId || !email) {
            return res.status(400).json({ message: "fullName, employeeId, and email are required." });
        }
        password = bcrypt.hashSync(password, 10);
        const newStaff = new Staff({
            name,
            employeeId,
            phoneNumber,
            courses,
            email,
            designation,
            password,
        });

        await newStaff.save();

        return res.status(201).json({ message: "Stuff added successfully!", staff: newStaff });
    } catch (error) {
        console.error("Error adding staff:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getStaff = async (req, res) => {
    try { 
        const staff = await Staff.find();
        if (staff.length === 0) {
            return res.status(404).json({ message: "No staff found for this class." });
        }

        return res.status(200).json(staff);
    } catch (error) {
        console.error("Error fetching staff:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getStaffById = async (req, res) => {
    try { 
        const {employeeId} = req.body;
        const staff = await Staff.find({employeeId});
        if (staff.length === 0) {
            return res.status(404).json({ message: "No staff found." });
        }

        return res.status(200).json(staff);
    } catch (error) {
        console.error("Error fetching staff:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


export const updateStaffById = async (req, res) => {
    try {
        const { employeeId } = req.body;
        const updates = req.body;

        if (!employeeId) {
            return res.status(400).json({ message: "id is required to update staff details." });
        }

        if(updates.password){
            updates.password = bcrypt.hashSync(updates.password, 10);
        }

        const updatedStaff = await Staff.findOneAndUpdate({ employeeId }, updates, { new: true });


        if (!updatedStaff) {
            return res.status(404).json({ message: "staff not found with the provided employeeId." });
        }

        return res.status(200).json({ message: "Staff updated successfully", staff: updatedStaff });
    } catch (error) {
        console.error("Error updating staff:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const deleteStaffById = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ message: "id is required to delete a student." });
        }

        const deleteStaff = await Staff.findOneAndDelete({ employeeId : id });

        if (!deleteStaff) {
            return res.status(404).json({ message: "Student not found with the provided id." });
        }

        // Return the deleted student data
        return res.status(200).json({ message: "Student deleted successfully", staff: deleteStaff });
    } catch (error) {
        console.error("Error deleting student:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const getAllStaff = async(req, res) =>{
    try {
        const staff = await Staff.find();
        return res.status(200).json(staff);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}