import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZ_API = `${REMOTE_SERVER}/api/quizzes`;

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
