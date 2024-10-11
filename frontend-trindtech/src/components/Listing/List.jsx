import { useState, useEffect } from "react";
import styled from "styled-components";
import { HiOutlineSwitchVertical } from "react-icons/hi";
import { getStudents, getLocationById, getCourseById, getStudentCourses } from "../../services/apiService";

const CustomTable = styled.table`
    margin-top: 52px;
    border: 3opx solid black;
`;

function List() {

    const [studentData, setStudentData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Buscar todos os alunos
                const students = await getStudents();
                
                // 2. Para cada aluno, buscar sua localização e curso associado
                const studentsWithDetails = await Promise.all(students.map(async (student) => {
                    // Busca a localização do aluno
                    const location = await getLocationById(student.id);

                    // Busca a associação do aluno com o curso
                    const studentCourses = await getStudentCourses();

                    // Filtra o curso associado ao aluno
                    const studentCourse = studentCourses.find(sc => sc.id_student === student.id);

                    // Busca o nome do curso associado ao aluno
                    const course = studentCourse ? await getCourseById(studentCourse.id_course) : null;
                    
                    return {
                        ...student,
                        location: location.state || 'Estado não encontrado',  // Estado da localização
                        course: course ? course.course_name : 'Curso não encontrado' // Nome do curso associado
                    };
                }));

                setStudentData(studentsWithDetails);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar os dados dos alunos:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Carregando...</p>;
    }


    <table className="table">
        <thead>
            <tr>
                <th scope="col">Data de Cadastro <HiOutlineSwitchVertical /></th>
                <th scope="col">Nome</th>
                <th scope="col">Estado</th>
                <th scope="col">Cursos</th>
            </tr>
        </thead>
        <tbody>
            {studentData.map((student) => (
                <tr key={student.id}>
                    <th scope="row">{new Date(student.registration_date).toLocaleDateString()}</th>
                    <td scope="col">{student.student_name}</td>
                    <td scope="col">{student.location}</td>
                    <td scope="col">{student.course}</td>
                </tr>
            ))}
        </tbody>
    </table>
};

export default List;