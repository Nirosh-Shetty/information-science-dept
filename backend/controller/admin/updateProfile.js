import Admin from "../../model/adminModel.js";

export const updateProfile = async (req, res)=>{
    try {
        const {_id} = req.body;
        const updates = req.body;
        console.log(req.body)
    
        if(!_id){
            return res.status(400).json({ message: "id is required to update admin details." });
        }
    
        const updateAdmin = await Admin.findOneAndUpdate({ _id }, updates, { new: true });
    
        if (!updateAdmin) {
            return res.status(404).json({ message: "admin not found with the provided employeeId." });
        }
    
        return res.status(200).json({ message: "Admin updated successfully", admin: updateAdmin });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}