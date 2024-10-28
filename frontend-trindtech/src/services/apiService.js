import axios from "axios";

// Define a URL base
const API_URL = "http://localhost:3000/api";

// Funções para Alunos
export const getStudents = async () => {
  const response = await axios.get(`${API_URL}/students`);
  return response.data;
};

export const createStudent = async (studentData) => {
  const response = await axios.post(`${API_URL}/students`, studentData);
  return response.data;
};

export const getStudentById = async (id_student) => {
  const response = await axios.get(`${API_URL}/students/${id_student}`);
  return response.data;
};

export const updateStudent = async (id_student, studentData) => {
  const response = await axios.put(
    `${API_URL}/students/${id_student}`,
    studentData
  );
  return response.data;
};

export const deleteStudent = async (id_student) => {
  await axios.delete(`${API_URL}/students/${id_student}`);
};

// Funções para Cursos
export const getCourses = async () => {
  const response = await axios.get(`${API_URL}/courses`);
  return response.data;
};