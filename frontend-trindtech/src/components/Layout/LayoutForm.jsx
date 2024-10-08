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

function LayoutForm() {
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
        console.log('Botão Salvar clicado!');
        console.log('Dados do aluno:', studentData);
        console.log('Dados do curso:', courseData);
        console.log('Dados do endereço:', addressData);

        try {
            const student = await createAluno(studentData); //Criar aluno

            //Criar endereço associado ao aluno
            await createEndereco({
                ...addressData,
                id_aluno: student.id_aluno,
            });

            const course = await createCurso(courseData); //Criar curso

            //Criar a associação entre aluno e curso
            await createAlunoCurso({ id_aluno: student.id_aluno, id_curso: course.id_curso});

            toast.success('Dados criados com sucesso!');
        } catch (error) {
            console.error('Erro ao criar dados: ', error);

            toast.error('Erro ao criar os dados');
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
                <CustomButton type="submit" onClick={handleSubmit} className="btn mt-3">
                    Salvar
                </CustomButton>
            </div>
            <ToastContainer />
        </div>
    );
};

export default LayoutForm;
