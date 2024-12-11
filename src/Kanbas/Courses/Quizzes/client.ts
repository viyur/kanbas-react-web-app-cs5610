import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZ_API = `${REMOTE_SERVER}/api/quizzes`;
const QUIZ_ATTEMPT_API = `${REMOTE_SERVER}/api/quiz-attempts`;

// Find a specific quiz by quiz ID
export async function findQuizById(quizId: string) {
  const { data } = await axiosWithCredentials.get(`${QUIZ_API}/${quizId}`);
  return data;
}

// update a quiz by quiz ID
export async function updateQuiz(quizId: string, quiz: any) {
  const { data } = await axiosWithCredentials.put(
    `${QUIZ_API}/${quizId}`,
    quiz
  );
  return data;
}

// delete a quiz by quiz ID
export async function deleteQuiz(quizId: string) {
  const { data } = await axiosWithCredentials.delete(`${QUIZ_API}/${quizId}`);
  return data;
}

// create a question for a quiz
export async function createQuestionForQuiz(quizId: string, question: any) {
  const { data } = await axiosWithCredentials.post(
    `${QUIZ_API}/${quizId}/questions`,
    question
  );
  return data;
}

// find all questions for a quiz
export async function findQuestionsForQuiz(quizId: string) {
  const { data } = await axiosWithCredentials.get(
    `${QUIZ_API}/${quizId}/questions`
  );
  return data;
}

// add a new quiz attempt for a user
export const createQuizAttempt = async (quizAttempt: any) => {
  const { data } = await axiosWithCredentials.post(
    QUIZ_ATTEMPT_API,
    quizAttempt
  );
  return data;
};

// Fetch all quiz attempts for a specific quiz and user
// example: userId = 'mary' take quiz 1 with different attempts
export async function findAllQuizAttempts(quizId: string, userId: string) {
  const { data } = await axiosWithCredentials.get(`${QUIZ_ATTEMPT_API}`, {
    params: { quiz: quizId, user: userId },
  });
  return data;
}

// Fetch the latest quiz attempt for a specific quiz and user
export async function findLatestQuizAttempt(quizId: string, userId: string) {
  const { data } = await axiosWithCredentials.get(
    `${QUIZ_ATTEMPT_API}/latest`,
    {
      params: { quiz: quizId, user: userId },
    }
  );
  return data;
}
