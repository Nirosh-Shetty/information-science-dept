import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title : {type: String, required: true},
    date : {type: Date, required: true},
    description : {type: String},
    teamSize : {type: String},
    imageUrl : {type: String},
    registeredStudents: [
        {
            studentId: { type: String, required: true },
            leaderName: { type: String, required: true },
            email: { type: String, required: true },
            contactNumber: { type: String },
            teamMembers: [
                {
                    name: { type: String },
                }
            ]
        }
    ],
});

export default mongoose.model("Event", eventSchema);
