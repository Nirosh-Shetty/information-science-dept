import QuizSubmission from "../../model/quiz2/quizSubmission.js";
import Quiz from "../../model/quiz2/quiz2Model.js";
import quizSubmission from "../../model/quiz2/quizSubmission.js";

export const startQuiz = async (req, res) => {
  const { quizId, studentId } = req.body;

  try {
    // Check if the quiz exists
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Find or create a submission document for the student
    let submission = await QuizSubmission.findOne({ studentId });

    if (!submission) {
      submission = new QuizSubmission({ studentId });
    }

    // Check if the quiz has already been started or completed
    const existingAttempt = submission.quizAttempts.find(
      (attempt) => attempt.quizId.toString() === quizId
    );

    if (existingAttempt && existingAttempt.isCompleted) {
      return res
        .status(400)
        .json({ message: "Quiz has already been completed." });
    }

    if (existingAttempt) {
      return res.status(200).json({
        message: "Quiz is already in progress.",
        startTime: existingAttempt.attemptedAt,
      });
    }

    // Add a new quiz attempt with the current timestamp
    const startTime = Date.now();
    submission.quizAttempts.push({
      quizId,
      attemptedAt: startTime,
      isCompleted: false,
    });

    await submission.save();

    res.status(200).json({
      message: "Quiz started",
      startTime, // Return the attemptedAt timestamp
    });
  } catch (error) {
    console.error("Error starting quiz:", error);
    res
      .status(500)
      .json({ message: "Failed to start quiz. Please try again." });
  }
};

export const getRemainingTime = async (req, res) => {
  const { quizId, studentId } = req.params;

  try {
    // Find the student's quiz submission
    const submission = await QuizSubmission.findOne({ studentId });

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    // Find the specific quiz attempt
    const quizAttempt = submission.quizAttempts.find(
      (attempt) => attempt.quizId.toString() === quizId
    );

    if (!quizAttempt) {
      return res.status(404).json({ message: "Quiz attempt not found" });
    }

    if (quizAttempt.isCompleted) {
      return res.status(400).json({ message: "Quiz already completed." });
    }

    // Fetch the total time from the quiz (assumes `time` is in minutes)
    const quiz = await Quiz.findById(quizId);
    const totalTimeInSeconds = quiz.time * 60; // Total time in seconds

    const currentTime = Date.now();
    const elapsedTimeInSeconds = Math.floor(
      (currentTime - quizAttempt.attemptedAt) / 1000
    ); // Elapsed time in seconds

    const remainingTimeInSeconds = Math.max(
      totalTimeInSeconds - elapsedTimeInSeconds,
      0
    ); // Prevent negative remaining time

    res.status(200).json({ remainingTime: remainingTimeInSeconds });
  } catch (error) {
    console.error("Error fetching remaining time:", error);
    res.status(500).json({ message: "Failed to fetch remaining time." });
  }
};

export const submitQuiz = async (req, res) => {
  const { quizId, studentId, answers } = req.body; // `answers` should be an array of { questionId, answer }

  try {
    // Find the student's submission
    const submission = await QuizSubmission.findOne({ studentId });
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    // Find the specific quiz attempt
    const quizAttempt = submission.quizAttempts.find(
      (attempt) => attempt.quizId.toString() === quizId
    );

    if (!quizAttempt) {
      return res.status(404).json({ message: "Quiz attempt not found" });
    }

    if (quizAttempt.isCompleted) {
      return res
        .status(400)
        .json({ message: "Quiz has already been submitted." });
    }

    // Find the quiz to fetch correct answers
    const quiz = await Quiz.findById(quizId).populate("questions");
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Calculate the score
    let score = 0;
    const correctAnswersMap = new Map();

    quiz.questions.forEach((question) => {
      correctAnswersMap.set(question._id.toString(), question.correctAnswer);
    });

    answers.forEach((submittedAnswer) => {
      const correctAnswer = correctAnswersMap.get(submittedAnswer.questionId);
      if (submittedAnswer.answer === correctAnswer) {
        score += 1; // Add 1 for each correct answer (can adjust scoring logic if needed)
      }
    });

    // Mark the quiz attempt as completed and update the score
    quizAttempt.isCompleted = true;
    quizAttempt.score = score;
    quizAttempt.answers = answers; // Save submitted answers if needed

    await submission.save();

    res.status(200).json({
      message: "Quiz submitted successfully",
      score,
      totalQuestions: quiz.questions.length,
    });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    res
      .status(500)
      .json({ message: "Failed to submit quiz. Please try again." });
  }
};

export const getResults = async (req, res) => {
  const { quizId } = req.params; // Get quizId from the request parameters

  try {
    // Find all quiz submissions that have attempts for the given quizId
    const quizSubmissions = await QuizSubmission.find({
      'quizAttempts.quizId': quizId, // Match quizAttempts that have the provided quizId
    })
      .populate('studentId', 'fullName usn') // Populate the studentId field with name and usn
      .exec();

    // Check if any submissions were found
    if (quizSubmissions.length === 0) {
      return res.status(404).json({ message: "No submissions found for the given quiz" });
    }

    // Prepare results to include student details and their quiz attempts
    const results = quizSubmissions.map((submission) => {
      // Filter the quizAttempts for the current submission based on quizId and isCompleted
      const completedAttempts = submission.quizAttempts.filter(
        (attempt) => attempt.quizId.toString() === quizId && attempt.isCompleted
      );

      return {
        student: {
          name: submission.studentId.fullName,
          usn: submission.studentId.usn,
        },
        attempts: completedAttempts,
      };
    });

    // Return the results
    res.status(200).json({ results });
  } catch (error) {
    console.error("Error fetching quiz results:", error);
    res.status(500).json({ message: "Failed to fetch quiz results." });
  }
};
