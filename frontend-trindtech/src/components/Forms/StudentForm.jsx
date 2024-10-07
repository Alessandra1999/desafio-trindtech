import styled from "styled-components";

const CustomForm = styled.form`
    margin-top: 62px;
`;

const Container = styled.div`
    max-width: 1098px;
    height: auto;
    font-family: "Montserrat", sans-serif;
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

const CustomSelect = styled.select`
    background-color: #F2F2F2;

    &:focus {
        background-color: #F2F2F2;
        outline: none;
        border-color: black;
        box-shadow: none;
    }
`;

function StudentForm({ studentData, setStudentData }) {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <CustomForm>
            <Container className="container">
                <div className="row">
                    <div className="form-group col-md-5">
                        <label htmlFor="nameInput">Nome*</label>
                        <CustomInput 
                            type="text" 
                            className="form-control" 
                            id="nameInput"
                            name="nome_aluno" 
                            value={studentData.nome_aluno}
                            onChange={handleChange}
                            required
                            />
                    </div>
                    <div className="form-group col-md-7">
                        <label htmlFor="lastnameInput">Sobrenome</label>
                        <CustomInput 
                            type="text" 
                            className="form-control" 
                            id="lastnameInput" 
                            name="sobrenome_aluno"
                            value={studentData.sobrenome_aluno}
                            onChange={handleChange}
                            />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-3">
                        <label htmlFor="birthdateInput" style={{ marginTop: "26px" }}>Data de Nascimento</label>
                        <CustomInput 
                            type="text" 
                            className="form-control" 
                            id="birthdateInput" 
                            name="data_nascimento_aluno"
                            placeholder="dd/mm/aaaa" 
                            value={studentData.data_nascimento_aluno}
                            onChange={handleChange}
                            />
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="cpfInput" style={{ marginTop: "26px" }}>CPF</label>
                        <CustomInput 
                            type="text" 
                            className="form-control" 
                            id="cpfInput" 
                            name="cpf_aluno"
                            placeholder="000.000.000-00" 
                            value={studentData.cpf_aluno}
                            onChange={handleChange}
                            />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="genderInput" style={{ marginTop: "26px" }}>Gênero</label>
                        <CustomSelect 
                            id="genderInput" 
                            name="genero_aluno"
                            className="form-control"
                            value={studentData.genero_aluno}
                            onChange={handleChange}
                            >
                            <option value="">Escolher...</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                            <option value="Não Binário">Não Binário</option>
                            <option value="Outros">Outros</option>
                            <option value="Prefiro Não Responder">Prefiro Não Responder</option>
                        </CustomSelect>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-6">
                        <label htmlFor="emailInput" style={{ marginTop: "26px" }}>Email*</label>
                        <CustomInput 
                            type="text" 
                            className="form-control" 
                            id="emailInput" 
                            name="email_aluno"
                            placeholder="example@email.com" 
                            value={studentData.email_aluno}
                            onChange={handleChange}
                            />
                    </div>
                </div>
            </Container>
        </CustomForm>
    );
}

export default StudentForm;