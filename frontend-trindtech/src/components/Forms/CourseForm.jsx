import styled from "styled-components";

const CustomForm = styled.form`
    margin-top: 62px;
`;

const Container = styled.div`
    max-width: 1098px;
    height: 150px;
    border: 3px solid black;
    font-family: "Montserrat", sans-serif;
    font-weight: 500;

    @media (max-width: 767px) {
        height: 230px;
    }
`;

const Title = styled.h4`
    margin-bottom: 32px;
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
                    <div className="form-group col-md-3">
                        <label htmlFor="conclusionInput">Data de Conclusão</label>
                        <CustomInput type="date" className="form-control" id="conclusionInput" />
                    </div>
                </div>
            </Container>
        </CustomForm>
    );
}

export default CourseForm;