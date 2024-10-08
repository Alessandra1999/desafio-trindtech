import { useState } from "react";
import styled from "styled-components";
import { RiSearchLine } from "react-icons/ri";
import { MdPersonAdd } from "react-icons/md";
import { getAlunos } from "../../services/apiService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    margin-top: 59px;
    width: 1044px;
    height: auto;
    font-family: "Montserrat", sans-serif;
    font-weight: 500;
`;

const CustomInput = styled.input`
    background-color: #FFF;

    &:focus {
        background-color: #FFF;
        outline: none;
        border-color: black;
        box-shadow: none;
    }
`;

const CustomSpan = styled.span`
    background-color: #FFF;

    &:hover {
        cursor: pointer;
        background-color: #F2F2F2;
    }
`;

const CustomButton = styled.button`
    background-color: #FFF;
    border-color: #E6E6E6;
    font-weight: 600;

    &:hover {
        border-color: #E6E6E6;
        background-color: #F2F2F2;
    }
`;

function Search() {

    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            const allAlunos = await getAlunos();
            const filteredAlunos = allAlunos.filter(aluno =>
                aluno.nome_aluno.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setResults(filteredAlunos);
            if (filteredAlunos.length === 0) {
                toast.info('Nenhum aluno encontrado.');
            }
        } catch (error) {
            console.error('Erro ao buscar alunos:', error);
            toast.error('Erro ao buscar alunos.');
        }
    };

    const handleAddStudent = () => {
        navigate('/form'); 
    };


    return (
        <div className="d-flex justify-content-center align-items-center">
            <Container>
                <div className="row align-items-center">
                    <div className="col-md-10 d-flex">
                        <div className="input-group">
                            <CustomInput
                                type="text"
                                className="form-control"
                                placeholder="Buscar por Aluno"
                                aria-label="Pesquisar"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <CustomSpan className="input-group-text" onClick={handleSearch}>
                                <RiSearchLine style={{ fontSize: "20px", cursor: "pointer" }} />
                            </CustomSpan>
                        </div>
                    </div>
                    <div className="col-md-2 text-start text-md-end">
                        <CustomButton type="button" className="btn" onClick={handleAddStudent}>
                            <MdPersonAdd style={{ color: "#EA394E", marginRight: "10px", fontSize: "20px" }} />
                            Adicionar
                        </CustomButton>
                    </div>
                </div>

                {/* Exibindo os resultados da busca */}
                <div className="mt-3">
                    {results.length > 0 && (
                        <div className="list-group">
                            {results.map(aluno => (
                                <div key={aluno.id_aluno} className="list-group-item list-group-item-action">
                                    {aluno.nome_aluno} {aluno.sobrenome_aluno}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default Search;