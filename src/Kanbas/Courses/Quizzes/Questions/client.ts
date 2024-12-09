import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;

// find quesiton by question ID
export async function findQuestionById(questionId: string) {
  const { data } = await axiosWithCredentials.get(
    `${QUESTIONS_API}/${questionId}`
  );
  return data;
}
