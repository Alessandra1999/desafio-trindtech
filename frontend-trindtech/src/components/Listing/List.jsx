import { useState, useEffect } from "react";
import styled from "styled-components";
import { HiOutlineSwitchVertical } from "react-icons/hi";
import { getStudents, getLocations, getLocationById, getCourseById, getStudentCourses } from "../../services/apiService";

const Container = styled.div`
    display: flex;
    justify-content: center;
`;

const CustomTable = styled.table`
    margin-top: 52px;
    width: 1098px;
    height: auto;
`;

function List() {
    const [studentData, setStudentData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Buscar todos os alunos
                const students = await getStudents();

                // 2. Buscar todas as localizações
                const locations = await getLocations();

                // 2. Para cada aluno, buscar sua localização e curso associado
                const studentsWithDetails = await Promise.all(students.map(async (student) => {
                    // Busca a localização do aluno
                    const location = locations.find(loc => loc.id_student == student.id_student);

                    // Busca a associação do aluno com os cursos
                    const studentCourses = await getStudentCourses(); 

                    // Filtra os cursos associados ao aluno
                    const courses = studentCourses
                        .filter(sc => sc.id_student == student.id_student) // Usa o id do aluno para filtrar
                        .map(async (sc) => {
                            const course = await getCourseById(sc.id_course);
                            return course ? course.course_name : 'Curso não encontrado'; // Retorna o nome do curso ou uma mensagem padrão
                        });

                    const courseNames = await Promise.all(courses);

                    return {
                        ...student,
                        location: location ? location.state : 'Estado não encontrado', // Estado da localização
                        courses: courseNames.length > 0 ? courseNames.join(', ') : 'Nenhum curso associado' // Lista os cursos associados
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

    return (
        <Container>
            <CustomTable className="table">
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
                        <tr key={student.id_student}>
                            <td>{new Date(student.registration_date).toLocaleDateString()}</td>
                            <td>{student.student_name}</td>
                            <td>{student.location}</td>
                            <td>{student.courses}</td> 
                        </tr>
                    ))}
                </tbody>
            </CustomTable>
        </Container>
    );
}

export default List;