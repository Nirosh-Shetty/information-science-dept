import courseModel from "../../model/courseModel.js";
import attendanceModel from "../../model/attendanceModel.js";
import classModel from "../../model/classModel.js";
// Get Class List with Attendance and Mapping Details

import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

import moment from "moment"; // Use moment for date formatting

export const getAttendanceHistory = async (req, res) => {
  const { currentSelectedCourse } = req.body;
  const courseId = currentSelectedCourse._id;

  try {
    const response = await attendanceModel
      .find({ course: courseId })
      .populate("course", "_id name")
      .populate("class", "_id name");

    let filteredData = response.map((item) => {
      let presentCount = 0;
      let totalCount = 0;

      // Count the attendance
      item.attendance.forEach((attendanceItem) => {
        if (attendanceItem.present === true) {
          presentCount++;
        }
        totalCount++;
      });

      // Format the time and return the desired structure
      const formattedTime = moment(item.date).format("hh:mm A MMM D 'YY");

      return {
        _id: item._id,
        className: item.class.name,
        subject: item.course.name,
        time: formattedTime,
        session: item.session,
        attendance: { attended: presentCount, total: totalCount },
      };
    });
    console.log(filteredData);

    return res.status(201).json({
      message: "Attendance list fetched successfully",
      success: true,
      filteredData,
    });
  } catch (error) {
    console.error("Error fetching attendance list:", error.message);
    return res
      .status(500)
      .json({ message: "Server error", success: false, error: error.message });
  }
};

//with mongoDB agregation
// export const getAttendanceList = async (req, res) => {
//   try {
//     const attendanceData = await Attendance.aggregate([
//       {
//         $lookup: {
//           from: "classes", // Collection name of Class
//           localField: "class",
//           foreignField: "_id",
//           as: "classDetails",
//         },
//       },
//       {
//         $lookup: {
//           from: "courses", // Collection name of Course
//           localField: "course",
//           foreignField: "_id",
//           as: "courseDetails",
//         },
//       },
//       {
//         $unwind: "$classDetails",
//       },
//       {
//         $unwind: "$courseDetails",
//       },
//       {
//         $project: {
//           _id: 0, // Exclude the default `_id` field
//           className: "$classDetails.name",
//           subject: "$courseDetails.name",
//           time: {
//             $dateToString: {
//               format: "%I:%M %p %b %e '%y", // Format to match your requirement
//               date: "$date",
//               timezone: "Asia/Kolkata", // Adjust timezone if necessary
//             },
//           },
//           session: "$session",
//           totalAttendance: { $size: "$attendance" }, // Total students
//           attended: {
//             $size: {
//               $filter: {
//                 input: "$attendance",
//                 as: "entry",
//                 cond: { $eq: ["$$entry.present", true] }, // Count present students
//               },
//             },
//           },
//         },
//       },
//       {
//         $addFields: {
//           attendance: {
//             attended: "$attended",
//             total: "$totalAttendance",
//           },
//         },
//       },
//       {
//         $project: {
//           attended: 0,
//           totalAttendance: 0,
//         },
//       },
//     ]);

//     return res.status(200).json({
//       success: true,
//       data: attendanceData,
//     });
//   } catch (error) {
//     console.error("Error with aggregation pipeline:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch attendance data",
//       error: error.message,
//     });
//   }
// };

export const deleteAttendance = async () => {
  console.log("hi");
};
