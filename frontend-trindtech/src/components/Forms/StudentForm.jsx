import styled from "styled-components";

const CustomForm = styled.form`
    margin-top: 62px;
`;

const Container = styled.div`
    max-width: 1098px;
    height: 280px;
    font-family: "Montserrat", sans-serif;
    font-weight: 500;

    @media (max-width: 767px) {
        height: 500px;
    }
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

const CustomSelect = styled.select`
    background-color: #F2F2F2;

    &:focus {
        background-color: #F2F2F2;
        outline: none;
        border-color: black;
        box-shadow: none;
    }
`;

function StudentForm() {
    return (
        <CustomForm>
            <Container className="container">
                <div className="row">
                    <div className="form-group col-md-5">
                        <label htmlFor="nameInput">Nome*</label>
                        <CustomInput type="text" className="form-control" id="nameInput" />
                    </div>
                    <div className="form-group col-md-7">
                        <label htmlFor="lastnameInput">Sobrenome</label>
                        <CustomInput type="text" className="form-control" id="lastnameInput" />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-3">
                        <label htmlFor="birthdateInput" style={{ marginTop: "26px" }}>Data de Nascimento</label>
                        <CustomInput type="text" className="form-control" id="birthdateInput" placeholder="dd/mm/aaaa" />
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="cpf" style={{ marginTop: "26px" }}>CPF</label>
                        <CustomInput type="text" className="form-control" id="birthdateInput" placeholder="000.000.000-00" />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="genderInput" style={{ marginTop: "26px" }}>Gênero</label>
                        <CustomSelect id="genderInput" className="form-control">
                            <option selected>Escolher...</option>
                            <option>Masculino</option>
                            <option>Feminino</option>
                            <option>Não Binário</option>
                            <option>Outros</option>
                            <option>Prefiro Não Responder</option>
                        </CustomSelect>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-6">
                        <label htmlFor="emailInput" style={{ marginTop: "26px" }}>CPF</label>
                        <CustomInput type="text" className="form-control" id="emailInput" placeholder="example@email.com" />
                    </div>
                </div>
            </Container>
        </CustomForm>
    );
}

export default StudentForm;