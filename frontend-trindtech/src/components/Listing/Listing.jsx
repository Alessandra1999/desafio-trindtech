import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const Container = styled.div`
    margin-top: 59px;
    width: 1044px;
    height: auto;
    font-family: "Montserrat", sans-serif;
    font-weight: 500;
    border: 3px solid black;
`;

const CustomInput = styled.input`
    background-color: #F2F2F2;

    &:focus {
        background-color: #F2F2F2;
        outline: none;
        border-color: black;
        box-shadow: none;
    }
`;

function Listing() {

    return (
        <div className="d-flex justify-content-center align-items-center">
            <Container>
                <div className="row align-items-center">
                    <div className="col-md-10 d-flex">
                        <div className="input-group" style={{ marginRight: "20px" }}>
                            <CustomInput
                                type="text"
                                className="form-control"
                                placeholder="Buscar por Aluno"
                                aria-label="Pesquisar"
                            />
                            <span className="input-group-text">
                                <FaSearch />
                            </span>
                        </div>
                    </div>
                    <div className="col-md-2 text-start text-md-end">
                        <button type="button" className="btn btn-primary">
                            Adicionar
                        </button>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Listing;