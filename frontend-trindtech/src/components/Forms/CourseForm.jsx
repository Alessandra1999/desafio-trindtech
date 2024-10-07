import styled from "styled-components";
import { MdAddCircleOutline } from "react-icons/md";

const CustomForm = styled.form`
    margin-top: 62px;
`;

const Container = styled.div`
    max-width: 1098px;
    height: auto;
    font-family: "Montserrat", sans-serif;
    font-weight: 500;
    margin-bottom: 168px;
`;

const Title = styled.h4`
    margin-bottom: 25px;
    font-size: 22px;
    font-weight: 500;
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

const CustomButton = styled.button`
    border: none;
    background-color: transparent;
    font-size: 24px;
    margin-left: 10px;

    &:hover {
        cursor: pointer;
    }
`;

function CourseForm() {
    return (
        <CustomForm>
            <Container className="container">
                <Title>Cursos</Title>
                <div className="row">
                    <div className="form-group col-md-8">
                        <label htmlFor="courseInput">Nome do Curso</label>
                        <CustomInput type="text" className="form-control" id="courseInput" />
                    </div>
                    <div className="form-group col-md-4 d-flex align-items-center">
                        <div className="w-100">
                            <label htmlFor="conclusionInput">Data de Conclusão</label>
                            <div className="d-flex">
                                <CustomInput type="date" className="form-control" id="conclusionInput" />
                                <CustomButton type="button">
                                    <MdAddCircleOutline />
                                </CustomButton>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </CustomForm>
    );
}

export default CourseForm;