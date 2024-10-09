import { useState } from 'react';
import DynamicHeader from '../Header/DynamicHeader';
import StudentForm from '../Forms/StudentForm';
import AdressForm from '../Forms/AdressForm';
import CourseForm from '../Forms/CourseForm';
import { createStudent, createCourse, createLocation, createStudentCourse } from "../../services/apiService";
import { deleteAllStudentData } from '../../services/apiService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const CustomButton = styled.button`
    background-color: #EA394E;
    color: #F2F2F2;
    font-weight: 700;
    margin-bottom: 30px;

    &:hover {
        background-color: #c7293c;
        color: #F2F2F2;
    }
`;

function LayoutForm() {
    const [studentData, setStudentData] = useState({
        student_name: '',
        student_lastname: '',
        student_birthdate: '',
        student_cpf: '',
        student_gender: '',
        student_email: '',
        student_register_date: ""
    });

    const [locationData, setLocationData] = useState({
        cep: '',
        country: '',
        street: '',
        district: '',
        number: '',
        complement: '',
        city: '',
        state: ''
    });

    const [courseData, setCourseData] = useState({
        course_name: '',
    });

    const [studentCourseData, setStudentCourseData] = useState({
        conclusion_date: ''
    });

    const [studentId, setStudentId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const student = await createStudent(studentData); //Criar aluno
            setStudentId(student.id_student);

            //Criar endereço associado ao aluno
            await createLocation({
                ...locationData,
                id_student: student.id_student,
            });

            const course = await createCourse(courseData); //Criar curso

            //Criar a associação entre aluno e curso
            await createStudentCourse(studentCourseData, { id_student: student.id_student, id_course: course.id_course });

            toast.success('Dados criados com sucesso!');
        } catch (error) {
            console.error('Erro ao criar dados: ', error);
            toast.error('Erro ao criar os dados');
        }
    }

    const handleDelete = async () => {
        if (!studentId) {
            toast.error('Nenhum aluno encontrado para deletar.');
            return;
        }

        try {
            await deleteAllStudentData(studentId);
            setStudentData({ // Limpar os dados do aluno
                student_name: '',
                student_lastname: '',
                student_birthdate: '',
                student_cpf: '',
                student_gender: '',
                student_email: '',
                student_register_date: ""
            });
            setAddressData({ // Limpar os dados do endereço
                cep: '',
                country: '',
                street: '',
                district: '',
                number: '',
                complement: '',
                city: '',
                state: ''
            });
            setStudentCourseData({ //Limpa a data de conclusão
                conclusion_date: '' 
            });

            setStudentId(null); // Resetar o ID do aluno
            toast.success('Dados deletados com sucesso!');
        } catch (error) {
            console.error('Erro ao deletar dados:', error);
            toast.error('Erro ao deletar os dados!');
        }
    };

    return (
        <div>
            <DynamicHeader
                showLogo={false}
                backIcon={() => navigate('/')}
                studentName=""
                onDelete={handleDelete}
            />
            <StudentForm
                studentData={studentData}
                setStudentData={setStudentData}
            />
            <AdressForm
                addressData={addressData}
                setAddressData={setAddressData}
            />
            <CourseForm
                courseData={courseData}
                studentCourseData={studentCourseData}
                setCourseData={setCourseData}
                setStudentCourseData={setStudentCourseData}
            />
            <div className="d-flex justify-content-center mt-3">
                <CustomButton type="submit" onClick={handleSubmit} className="btn mt-3">
                    Salvar
                </CustomButton>
            </div>
            <ToastContainer />
        </div>
    );
};

export default LayoutForm;
