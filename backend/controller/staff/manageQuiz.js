import Question from "../../model/questions.js"; // Assuming this model is defined for quizzes

// Create Quiz
export const createQuiz = async (req, res) => {
  const { quizId, title, question, options, correctAnswer, classId, staffId } = req.body;

  if (!quizId || !title || !question || !options || !correctAnswer || !classId || !staffId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newQuestion = new Question({
      quizId,
      title,
      question,
      options,
      correctAnswer,
      classId,
      staffId,
    });

    await newQuestion.save();
    res.status(201).json({ message: "Question created successfully", newQuestion });
  } catch (error) {
    res.status(500).json({ message: "Error creating question", error });
  }
};

 

// Get questions by quizId
export const getQuestionsByQuizTitle = async (req, res) => {
  const { title } = req.params; // Fetch the quiz title from the request parameters
  
  if (!title) {
    return res.status(400).json({ message: "Quiz title is required" });
  }
  
  try {
    // Find questions that match the quiz title
    const foundQuestions = await Question.find({ "title": title });
    
    if (foundQuestions.length === 0) {
      return res.status(404).json({ message: "No questions found for this quiz title" });
    }

    res.status(200).json({ questions: foundQuestions });
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions", error });
  }
};
// Get quiz titles by classId
export const getQuizTitlesByClass  = async (req, res) => {
  const { classId } = req.params; // Get classId from the request parameters
  
  if (!classId) {
    return res.status(400).json({ message: "Class ID is required" });
  }
  
  try {
    // Find quizzes related to the classId and return unique titles
    const quizzes = await Question.distinct("title", { classId });

    if (quizzes.length === 0) {
      return res.status(404).json({ message: "No quizzes found for this class" });
    }

    res.status(200).json({ title: quizzes }); // Return the unique titles
  } catch (error) {
    res.status(500).json({ message: "Error fetching quiz titles", error });
  }
};

export const UpdateQuizQuestion = async (req, res)=>{
  const {quizId} = req.body;
  const {title, question, options, correctAnswer, classId, staffId } = req.body
  if(!quizId){
    return res.status(400).json({message:"Quiz Id is required"})
  }
  const UpdateQuizQuestion = await Question.findOneAndUpdate({quizId}, 
    {
      title, 
    question, 
    options, 
    correctAnswer, 
    classId, 
    staffId},
    { new: true }
  )
  if(!UpdateQuizQuestion){
    return res.status(401).json({message : "No question exist with given quizId"})
  }
  return res.status(200).json({ message: "Question updated successfully", UpdateQuizQuestion });
}

export const deleteByQuizId = async(req,res)=>
{
  const {quizId}=req.params;
  if(!quizId){
    return res.status(401).json({message:"QuizId is required"})
  }
  const deletedQuestion=await Question.findOneAndDelete({quizId})
  if(!deletedQuestion){
    return res.status(401).json({message:"Question not found with given quizId"})
  }
  res.status(200).json({message:"Question deleted successfully with given quizId", deletedQuestion})
  
}
