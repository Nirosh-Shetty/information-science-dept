import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title : {type: String, required: true},
    date : {type: Date, required: true},
    description : {type: String},
    teamSize : {type: String},
    imageUrl : {type: String},
});

export default mongoose.model("Event", eventSchema);
