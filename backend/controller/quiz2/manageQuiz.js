// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
//   Typography,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useState } from "react";
// import { BACKEND_URL } from "../../../../../globals"; // Ensure BACKEND_URL is correctly imported
// import EditPage from "./editPage/EditPage";
// import axios from "axios";
// import { toast } from "react-toastify"; // Importing toast for notifications

// const EditDetails = ({ quiz, setQuizzes }) => {
//   const [openDialog, setOpenDialog] = useState(false);
//   const [openAddQuestionDialog, setOpenAddQuestionDialog] = useState(false);
//   const [questions, setQuestions] = useState([]);
//   const [newQuestion, setNewQuestion] = useState({
//     questionName: "",
//     options: ["", "", "", ""],
//     correctAnswer: "",
//   });

//   const updateQuestion = (questionId, updatedQuestion) => {
//     const updatedQuestions = questions.map((question) =>
//       question._id === questionId
//         ? { ...question, ...updatedQuestion }
//         : question
//     );
//     setQuestions(updatedQuestions);
//   };

//   // Fetch questions by quiz._id
//   const fetchQuestions = async () => {
//     try {
//       const response = await fetch(
//         `${BACKEND_URL}/quiz/getquestionsbyquizid/${quiz._id}`
//       );
//       const data = await response.json();
//       setQuestions(data);
//     } catch (error) {
//       console.error("Error fetching questions:", error);
//     }
//   };

//   const handleDeleteQuestion = (questionId) => {
//     console.log(`Delete question ${questionId}`);
//   };

//   const handleAddQuestion = () => {
//     setQuestions([...questions, newQuestion]);
//     setOpenAddQuestionDialog(false);
//   };

//   const handleNewQuestionChange = (e, field) => {
//     setNewQuestion({ ...newQuestion, [field]: e.target.value });
//   };

//   const handleOptionChange = (e, index) => {
//     const newOptions = [...newQuestion.options];
//     newOptions[index] = e.target.value;
//     setNewQuestion({ ...newQuestion, options: newOptions });
//   };

//   // Handle submit
//   const handleSubmit = async () => {
//     try {
//       const response = await axios.put(
//         `${BACKEND_URL}/quiz/updatequestions/${quiz._id}`,
//         { questions: questions }
//       );

//       if (response.status === 200) {
//         toast.success(response.data.message); // Show success toast
//         setQuizzes((prevQuizzes) =>
//           prevQuizzes.map((q) =>
//             q._id === quiz._id ? { ...q, questions: response.data.questions } : q
//           )
//         );
//         setOpenDialog(false); // Close the edit dialog
//       }
//     } catch (error) {
//       toast.error("Failed to update questions. Please try again."); // Show error toast
//     }
//   };

//   return (
//     <div>
//       <Button
//         variant="text"
//         color="primary"
//         onClick={() => {
//           fetchQuestions();
//           setOpenDialog(true);
//         }}
//       >
//         Edit Details
//       </Button>

//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
//         <DialogTitle>Edit Questions for {quiz.title}</DialogTitle>
//         <DialogContent>
//           <List>
//             {questions.map((question, i) => (
//               <ListItem key={question._id} divider>
//                 <ListItemText
//                   primary={<Typography variant="h6">{i + 1}. {question.questionName}</Typography>}
//                 />
//                 <div>
//                   <Typography variant="body2">Options:</Typography>
//                   <ul>
//                     {question.options.map((option, index) => (
//                       <span key={index}>{option} </span>
//                     ))}
//                   </ul>
//                   <Typography variant="body2">
//                     Correct Answer: {question.correctAnswer}
//                   </Typography>
//                 </div>
//                 <EditPage question={question} updateQuestion={updateQuestion} />

//                 <IconButton
//                   onClick={() => handleDeleteQuestion(question._id)}
//                   color="secondary"
//                 >
//                   <DeleteIcon />
//                 </IconButton>
//               </ListItem>
//             ))}
//           </List>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDialog(false)} color="primary">
//             Close
//           </Button>
//           <Button
//             color="primary"
//             variant="text"
//             onClick={() => setOpenAddQuestionDialog(true)}
//           >
//             Add Question
//           </Button>
//           <Button color="primary" variant="contained" onClick={handleSubmit}>
//             Submit
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Add Question Dialog */}
//       <Dialog open={openAddQuestionDialog} onClose={() => setOpenAddQuestionDialog(false)}>
//         <DialogTitle>Add New Question</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Question Name"
//             type="text"
//             fullWidth
//             variant="outlined"
//             value={newQuestion.questionName}
//             onChange={(e) => handleNewQuestionChange(e, "questionName")}
//           />
//           <div>
//             {newQuestion.options.map((option, index) => (
//               <TextField
//                 key={index}
//                 label={`Option ${index + 1}`}
//                 variant="outlined"
//                 fullWidth
//                 value={option}
//                 onChange={(e) => handleOptionChange(e, index)}
//               />
//             ))}
//           </div>
//           <FormControl fullWidth className="mt-3">
//             <InputLabel>Correct Answer</InputLabel>
//             <Select
//               value={newQuestion.correctAnswer}
//               label="Correct Answer"
//               onChange={(e) => handleNewQuestionChange(e, "correctAnswer")}
//             >
//               {newQuestion.options.map((option, optionIndex) => (
//                 <MenuItem key={optionIndex} value={option}>
//                   {option}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenAddQuestionDialog(false)} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleAddQuestion} color="primary">
//             Add Question
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default EditDetails;

import Quiz from "../../model/quiz2/quiz2Model.js"

// export const createQuiz = async (req, res) => {
//   try {
//     const { title, classId, staffId, questions, isAvailable, dueDate } = req.body;
//     const quiz = await Quiz.create({ title, classId, staffId, questions, isAvailable, dueDate });
//     res.status(201).json({ success: true, data: quiz });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// export const getQuizById = async (req, res) => {
//   try {
//     const quiz = await Quiz.findById(req.params.id);
//     if (!quiz) return res.status(404).json({ success: false, message: "Quiz not found" });
//     res.status(200).json({ success: true, data: quiz });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const getQuizzesByClassId = async (req, res) => {
//   try {
//     const quizzes = await Quiz.find({ classId: req.params.classId });
//     res.status(200).json({ success: true, data: quizzes });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const getQuestionsByQuizId = async (req, res) => {
//   try {
//     const quiz = await Quiz.findById(req.params.quizId);
//     if (!quiz) return res.status(404).json({ success: false, message: "Quiz not found" });
//     res.status(200).json({ success: true, data: quiz.questions });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const updateQuiz = async (req, res) => {
//   try {
//     const { title, isAvailable, dueDate } = req.body;
//     const quiz = await Quiz.findByIdAndUpdate(req.params.id, { title, isAvailable, dueDate }, { new: true });
//     if (!quiz) return res.status(404).json({ success: false, message: "Quiz not found" });
//     res.status(200).json({ success: true, data: quiz });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const updateQuestion = async (req, res) => {
//   try {
//     const { quizId, questionId } = req.params;
//     const { question, options, correctAnswer } = req.body;

//     const quiz = await Quiz.findById(quizId);
//     if (!quiz) return res.status(404).json({ success: false, message: "Quiz not found" });

//     const questionIndex = quiz.questions.findIndex((q) => q._id.toString() === questionId);
//     if (questionIndex === -1) return res.status(404).json({ success: false, message: "Question not found" });

//     quiz.questions[questionIndex] = { ...quiz.questions[questionIndex], question, options, correctAnswer };
//     await quiz.save();

//     res.status(200).json({ success: true, data: quiz });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const deleteQuiz = async (req, res) => {
//   try {
//     const quiz = await Quiz.findByIdAndDelete(req.params.id);
//     if (!quiz) return res.status(404).json({ success: false, message: "Quiz not found" });
//     res.status(200).json({ success: true, message: "Quiz deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const getQuizzes = async (req, res) => {
//   try {
//     const quizzes = await Quiz.find();
//     res.status(200).json({ success: true, data: quizzes });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


export const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('classId');
    res.status(200).json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a quiz by ID
export const getQuizById = async (req, res) => {
  const { id } = req.params;
  try {
    const quiz = await Quiz.findById(id).populate('classId');
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get quizzes by classId
export const getQuizzesByClassId = async (req, res) => {
  const { classId } = req.params;
  try {
    const quizzes = await Quiz.find({ classId }).populate('classId')
    res.status(200).json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new quiz
export const createQuiz = async (req, res) => {
  const { title, classId, staffId, questions, isAvailable, dueDate, time, random } = req.body;
  try {
    const newQuiz = new Quiz({
      random,
      title,
      classId,
      staffId,
      questions,
      isAvailable,
      dueDate,
      time
    });
    const savedQuiz = await newQuiz.save();
    res.status(201).json(savedQuiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a quiz by ID
export const updateQuiz = async (req, res) => {
  const { id } = req.params;
  const { title, classId, staffId, questions, isAvailable, dueDate, time } = req.body;
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      id,
      { title, classId, staffId, questions, isAvailable, dueDate, time },
      { new: true, runValidators: true }
    );
    if (!updatedQuiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.status(200).json(updatedQuiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a quiz by ID
export const deleteQuiz = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(id);
    if (!deletedQuiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteQuestion = async (req, res) => {
  const { quizId, questionId } = req.params; // Quiz ID and Question ID

  try {
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    const questionIndex = quiz.questions.findIndex(q => q._id.toString() === questionId);

    if (questionIndex === -1) {
      return res.status(404).json({ error: 'Question not found' });
    }

    quiz.questions.splice(questionIndex, 1);
    await quiz.save();

    res.status(200).json({ message: 'Question deleted successfully', questions: quiz.questions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateQuestion = async (req, res) => {
  const { quizId, questionId } = req.params; // Quiz ID and Question ID
  const { action, questionData } = req.body; // Action: 'add', 'delete', 'update', questionData for updates

  try {
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    let updatedQuestions = quiz.questions;

    switch (action) {
      case 'add': {
        if (!questionData) {
          return res.status(400).json({ error: 'Question data is required to add a question' });
        }
        updatedQuestions.push(questionData);
        break;
      }

      case 'delete': {
        const questionIndex = updatedQuestions.findIndex(q => q._id.toString() === questionId);
        if (questionIndex === -1) {
          return res.status(404).json({ error: 'Question not found' });
        }
        updatedQuestions.splice(questionIndex, 1);
        break;
      }

      case 'update': {
        const questionIndex = updatedQuestions.findIndex(q => q._id.toString() === questionId);
        if (questionIndex === -1) {
          return res.status(404).json({ error: 'Question not found' });
        }
        if (!questionData) {
          return res.status(400).json({ error: 'Question data is required to update a question' });
        }
        updatedQuestions[questionIndex] = { ...updatedQuestions[questionIndex]._doc, ...questionData };
        break;
      }

      default:
        return res.status(400).json({ error: 'Invalid action. Use "add", "delete", or "update".' });
    }

    quiz.questions = updatedQuestions;
    await quiz.save();

    res.status(200).json({ message: 'Questions updated successfully', questions: quiz.questions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getQuestionsByQuizId = async (req, res) => {
  const { quizId } = req.params; // Extract quizId from the request parameters

  try {
    const quiz = await Quiz.findById(quizId); // Find the quiz by ID
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' }); // Handle case where quiz doesn't exist
    }

    res.status(200).json({ questions: quiz.questions }); // Return the questions
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle any server errors
  }
};

export const updateQuizQuestionsByQuizId = async (req, res) => { 
  const { quizId } = req.params; // Extract quizId from the request parameters
  const { questions } = req.body; // Extract updated questions from the request body

  try {
    // Validate input
    if (!questions || !Array.isArray(questions)) {
      return res.status(400).json({ error: 'Questions must be provided as an array' });
    }

    // Find and update the quiz
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      quizId,
      { questions },
      { new: true, runValidators: true } // Return the updated quiz and validate schema
    );

    if (!updatedQuiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    res.status(200).json({
      message: 'Quiz questions updated successfully',
      questions: updatedQuiz.questions
    });
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle server errors
  }
};
