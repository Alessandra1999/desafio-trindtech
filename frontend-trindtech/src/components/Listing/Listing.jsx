import styled from "styled-components";
import { RiSearchLine } from "react-icons/ri";
import { MdPersonAdd } from "react-icons/md";

const Container = styled.div`
    margin-top: 59px;
    width: 1044px;
    height: auto;
    font-family: "Montserrat", sans-serif;
    font-weight: 500;
    border: 3px solid black;
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
    }
`;

const CustomButton = styled.button`
    background-color: #FFF;
    border-color: black;
    font-weight: 600;

    &:hover {
        border-color: black;
    }
`;

function Listing() {

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
                            />
                            <CustomSpan className="input-group-text">
                                <RiSearchLine style={{fontSize: "20px"}}/>
                            </CustomSpan>
                        </div>
                    </div>
                    <div className="col-md-2 text-start text-md-end">
                        <CustomButton type="button" className="btn">
                            <MdPersonAdd style={{color: "#EA394E", marginRight: "10px", fontSize: "20px"}}/>
                            Adicionar
                        </CustomButton>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Listing;