import { useState } from 'react';
import DynamicHeader from '../Header/DynamicHeader';
import StudentForm from '../Forms/StudentForm';
import AdressForm from '../Forms/AdressForm';
import CourseForm from '../Forms/CourseForm';
import { createAluno, createCurso, createEndereco, createAlunoCurso } from "../../services/apiService";
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

function Layout() {
    const [studentData, setStudentData] = useState({
        nome_aluno: '',
        sobrenome_aluno: '',
        data_nascimento_aluno: '',
        cpf_aluno: '',
        genero_aluno: '',
        email_aluno: ''
    });

    const [addressData, setAddressData] = useState({
        cep: '',
        pais: '',
        rua: '',
        bairro: '',
        numero: '',
        complemento: '',
        cidade: '',
        estado: ''
    });

    const [courseData, setCourseData] = useState({
        nome_curso: '',
        data_conclusao_curso: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const student = await createAluno(studentData); //Criar aluno
            const course = await createCurso(courseData); //Criar curso

            //Criar endereço associado ao aluno
            await createEndereco({
                ...addressData,
                id_aluno: student.id_aluno,
            });

            //Criar a associação entre aluno e curso
            await createAlunoCurso(student.id_aluno, course.id_curso);

            toast.success('Dados criados com sucesso!', {
                position: toast.POSITION.TOP_RIGHT,
            });
        } catch (error) {
            console.error('Erro ao criar dados: ', error);

            toast.error('Erro ao criar os dados', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }

    return (
        <div>
            <DynamicHeader
                showLogo={false}
                backIcon={() => navigate('/')}
                studentName="Nome do Aluno"
                onDelete={() => handleDeleteStudent()}
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
                setCourseData={setCourseData}
            />
            <div className="d-flex justify-content-center mt-3">
                <CustomButton type="button" onClick={handleSubmit} className="btn mt-3">
                    Salvar
                </CustomButton>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Layout;
