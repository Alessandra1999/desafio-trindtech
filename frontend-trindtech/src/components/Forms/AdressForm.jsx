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

function AdressForm() {
    return (
        <CustomForm>
            <Container className="container">
                <Title>Localização</Title>
                <div className="row">
                    <div className="form-group col-md-6">
                        <label htmlFor="zipCodeInput">CEP*</label>
                        <CustomInput type="text" className="form-control" id="zipCodeInput" placeholder="00000-000" />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="countryInput">País</label>
                        <CustomInput type="text" className="form-control" id="countryInput" />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-6">
                        <label htmlFor="streetInput" style={{ marginTop: "26px" }}>Rua</label>
                        <CustomInput type="text" className="form-control" id="streetInput" />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="district" style={{ marginTop: "26px" }}>Bairro</label>
                        <CustomInput type="text" className="form-control" id="districtInput" />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-6">
                        <label htmlFor="numberInput" style={{ marginTop: "26px" }}>Número*</label>
                        <CustomInput type="text" className="form-control" id="numberInput" />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="complementInput" style={{ marginTop: "26px" }}>Complemento</label>
                        <CustomInput type="text" className="form-control" id="complementInput" />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-6">
                        <label htmlFor="cityInput" style={{ marginTop: "26px" }}>Cidade</label>
                        <CustomInput type="text" className="form-control" id="cityInput" />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="stateInput" style={{ marginTop: "26px" }}>Estado</label>
                        <CustomInput type="text" className="form-control" id="stateInput" />
                    </div>
                </div>
            </Container>
        </CustomForm>
    );
}

export default AdressForm;