import { deleteAllStudentData } from '../../services/apiService';
import styled from 'styled-components';
import { FaTrash, FaChevronLeft } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomHeader = styled.header`
    width: 100%;
    height: 67px;
    background-color: #EA394E;
    display: flex; 
    align-items: center; 
    color: #fff;
`;

const Logo = styled.a`
    margin-left: 42px;
`;

const TextContainer = styled.div`
    display: flex;
    align-items: center; 
    margin-left: 25px;
    margin-right: 25px; 
`;

const Text = styled.p`
    font-family: "Montserrat", sans-serif;
    font-weight: 800;
    margin-left: 25px;
    margin-right: 20px;
    margin-top: 18px;
`;

const StudentName = styled.span`
    font-family: "Montserrat", sans-serif;
    font-weight: normal; 
    margin-left: 20px;
`;

const IconButton = styled.div`
    margin-left: 25px;
    cursor: pointer;
`;

function DynamicHeader({ showLogo = true, backIcon, studentName, onDelete }) {

    const handleDelete = async () => {
        try {
            deleteAllStudentData();
            toast.success('Dados deletados com sucesso!');
        } catch (error) {
            toast.error('Erro ao deletar os dados!');
        }
    }

    return (
        <CustomHeader className='sticky-top'>
            {/* Ícone de Voltar */}
            {backIcon && (
                <IconButton onClick={backIcon}>
                    <FaChevronLeft size={24} />
                </IconButton>
            )}

            {/* Logo e Texto */}
            <div className='d-flex align-items-center'>
                {showLogo && (
                    <Logo className='navbar-brand' href='#'>
                        <svg className='d-inline-block align-top' width="38" height="30" viewBox="0 0 38 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.85701 29.9996C3.96542 29.9996 6.47386e-08 26.218 1.5008e-08 21.5533L0 16.6991C1.01103e-07 12.0343 3.96542 8.25281 8.85702 8.25281L16.5961 8.25281V2.11157C16.5961 0.945386 17.5875 -2.03903e-07 18.8104 0C20.0332 1.05225e-07 21.0246 0.945383 21.0246 2.11157V21.5533C21.0246 26.218 17.0592 29.9996 12.1676 29.9996L8.85701 29.9996ZM16.5961 21.5533V12.476L8.85702 12.476C6.41122 12.476 4.42851 14.3667 4.42851 16.6991V21.5533C4.42851 23.8856 6.41121 25.7764 8.85701 25.7764H12.1676C14.6134 25.7764 16.5961 23.8856 16.5961 21.5533ZM37.486 27.8884C37.486 29.0546 36.4946 30 35.2717 30H35.1327C30.2411 30 26.2757 26.2185 26.2757 21.5537V2.11202C26.2757 0.94583 27.267 0.000444312 28.4899 0.000444312C29.7128 0.000444312 30.7042 0.94583 30.7042 2.11202V8.45298H35.7857C37.0086 8.45298 38 9.39836 38 10.5646C38 11.7307 37.0086 12.6761 35.7857 12.6761H30.7042V21.5537C30.7042 23.8861 32.6869 25.7768 35.1327 25.7768H35.2717C36.4946 25.7768 37.486 26.7222 37.486 27.8884Z" fill="white" />
                        </svg>
                    </Logo>
                )}
                <TextContainer>
                    <Text>Gerenciador de alunos</Text>
                    {studentName && (
                        <>
                            <span>|</span>
                            <StudentName>{studentName}</StudentName>
                        </>
                    )} {/* Exibe o nome do aluno com font-weight normal */}
                </TextContainer>
            </div>

            {/* Ícone de Lixeira */}
            {onDelete && (
                <IconButton onClick={handleDelete} style={{ marginLeft: 'auto', marginRight: '25px' }}>
                    <FaTrash size={24} />
                </IconButton>
            )}
        </CustomHeader>
    );
}

export default DynamicHeader;
