import axios from 'axios';

// Define a URL base
const API_URL = 'http://localhost:3000/api'; 

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
    const response = await axios.put(`${API_URL}/students/${id_student}`, studentData);
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

export const createCourse = async (courseData) => {
    const response = await axios.post(`${API_URL}/courses`, courseData);
    return response.data;
};

export const getCourseById = async (id_course) => {
    const response = await axios.get(`${API_URL}/courses/${id_course}`);
    return response.data;
};

export const updateCourse = async (id_course, courseData) => {
    const response = await axios.put(`${API_URL}/courses/${id_course}`, courseData);
    return response.data;
};

export const deleteCourse = async (id_course) => {
    await axios.delete(`${API_URL}/courses/${id_course}`);
};

// Funções para Endereços
export const getLocations = async () => {
    const response = await axios.get(`${API_URL}/location`);
    return response.data;
};

export const createLocation = async (locationData) => {
    const response = await axios.post(`${API_URL}/locations`, locationData);
    return response.data;
};

export const getLocationById = async (id_location) => {
    const response = await axios.get(`${API_URL}/locations/${id_location}`);
    return response.data;
};

export const updateLocation = async (id_location, locationData) => {
    const response = await axios.put(`${API_URL}/locations/${id_location}`, locationData);
    return response.data;
};

export const deleteLocation = async (id_location) => {
    await axios.delete(`${API_URL}/locations/${id_location}`);
};

// Funções para Associações Aluno-Curso
export const getStudentCourses = async () => {
    const response = await axios.get(`${API_URL}/student-course`);
    return response.data;
};

export const createStudentCourse = async (studentCourseData) => {
    const response = await axios.post(`${API_URL}/student-course`, studentCourseData);
    return response.data;
};

export const getStudentCourseById = async (id_student, id_course) => {
    const response = await axios.get(`${API_URL}/student-course/${id_student}/${id_course}`);
    return response.data;
};

export const updateStudentCourse = async (id_student, id_course, studentCourseData) => {
    const response = await axios.put(`${API_URL}/student-course/${id_student}/${id_course}`, studentCourseData);
    return response.data;
};

export const deleteStudentCourse = async (id_student, id_course) => {
    await axios.delete(`${API_URL}/student-course/${id_student}/${id_course}`);
};


export const deleteAllStudentData = async (id_student) => {
    try {
        const locations = await getLocations(); 
        const studentCourses = await getStudentCourses(); 

        for (const location of locations) {
            if (location.id_student === id_student) {
                await deleteLocation(location.id_location);
            }
        }

        for (const studentCourse of studentCourses) {
            if (studentCourse.id_student === id_student) {
                await deleteStudentCourse(studentCourse.id_student, studentCourse.id_course);
            }
        }

        await deleteStudent(id_student);
    } catch (error) {
        console.error('Erro ao deletar dados do aluno:', error);
        throw error;
    }
};