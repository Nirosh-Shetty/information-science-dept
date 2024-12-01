import Event from '../../model/eventModel.js';

export const createEvent = async (req, res) => {
    const { title, date, description, teamSize } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const newEvent = new Event({
            title,
            date,
            description,
            teamSize,
            imageUrl
        });

        await newEvent.save();
        res.status(201).json({ message: "Event created successfully", newEvent });
    } catch (error) {
        res.status(500).json({ message: "Error creating event", error });
    }
};

export const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, date, description, teamSize, oldImage } = req.body;

    // Determine the image URL
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : oldImage;

    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            { title, date, description, teamSize, imageUrl },
            { new: true, runValidators: true } // Return the updated document and run validations
        );

        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.json({ message: "Event updated successfully", updatedEvent });
    } catch (error) {
        res.status(500).json({ message: "Error updating event", error: error.message });
    }
};

export const deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEvent = await Event.findByIdAndDelete(id);
        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting event", error });
    }
};

export const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: "Error fetching events", error });
    }
};

export const getEventById = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: "Error fetching event", error });
    }
};

export const getStudentsRegistered = async (req, res) => {
    const { eventid } = req.params;
    console.log(eventid);
    try {
        const event = await Event.findById(eventid);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json(event.registeredStudents);
    } catch (error) {
        res.status(500).json({ message: "Error fetching registered students", error });
    }
}

export const registerStudent = async (req, res) => {
    const { eventid } = req.params;
    const { leaderName, email, contactNumber, teamMembers } = req.body;

    try {
        const event = await Event.findById(eventid);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (!leaderName || !email) {
            return res.status(400).json({ message: "Leader name and email are required" });
        }

        event.registeredStudents.push({
            leaderName,
            email,
            contactNumber,
            teamMembers,
        });

        await event.save();

        res.json({ message: "Student registered successfully", event });
    } catch (error) {
        res.status(500).json({ message: "Error registering student", error: error.message });
    }
};
