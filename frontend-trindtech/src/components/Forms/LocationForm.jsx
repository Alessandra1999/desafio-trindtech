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

const CustomSelect = styled.select`
    background-color: #F2F2F2;

    &:focus {
        background-color: #F2F2F2;
        outline: none;
        border-color: black;
        box-shadow: none;
    }
`;

function LocationForm({ locationData, setLocationData }) {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocationData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <CustomForm>
            <Container className="container">
                <Title>Localização</Title>
                <div className="row">
                    <div className="form-group col-md-6">
                        <label htmlFor="zipCodeInput">CEP*</label>
                        <CustomInput
                            type="text"
                            className="form-control"
                            id="zipCodeInput"
                            name="cep"
                            placeholder="00000-000"
                            value={locationData.cep}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="countryInput">País</label>
                        <CustomInput
                            type="text"
                            className="form-control"
                            id="countryInput"
                            name="country"
                            value={locationData.country}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-6">
                        <label htmlFor="streetInput" style={{ marginTop: "26px" }}>Rua</label>
                        <CustomInput
                            type="text"
                            className="form-control"
                            id="streetInput"
                            name="street"
                            value={locationData.street}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="district" style={{ marginTop: "26px" }}>Bairro</label>
                        <CustomInput
                            type="text"
                            className="form-control"
                            id="districtInput"
                            name="district"
                            value={locationData.district}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-6">
                        <label htmlFor="numberInput" style={{ marginTop: "26px" }}>Número*</label>
                        <CustomInput
                            type="text"
                            className="form-control"
                            id="numberInput"
                            name="number"
                            value={locationData.number}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="complementInput" style={{ marginTop: "26px" }}>Complemento</label>
                        <CustomInput
                            type="text"
                            className="form-control"
                            id="complementInput"
                            name="complement"
                            value={locationData.complement}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-6">
                        <label htmlFor="cityInput" style={{ marginTop: "26px" }}>Cidade</label>
                        <CustomInput
                            type="text"
                            className="form-control"
                            id="cityInput"
                            name="city"
                            value={locationData.city}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="stateInput" style={{ marginTop: "26px" }}>Estado</label>
                        <CustomSelect
                            id="stateInput"
                            name="state"
                            className="form-control"
                            value={locationData.state}
                            onChange={handleChange}
                        >
                            <option value="">Escolher...</option>
                            <option value="Acre">Acre</option>
                            <option value="Alagoas">Alagoas</option>
                            <option value="Amapá">Amapá</option>
                            <option value="Amazonas">Amazonas</option>
                            <option value="Bahia">Bahia</option>
                            <option value="Ceará">Ceará</option>
                            <option value="Distrito Federal">Distrito Federal</option>
                            <option value="Espírito Santo">Espírito Santo</option>
                            <option value="Goiás">Goiás</option>
                            <option value="Maranhão">Maranhão</option>
                            <option value="Mato Grosso">Mato Grosso</option>
                            <option value="Mato Grosso do Sul">Mato Grosso do Sul</option>
                            <option value="Minas Gerais">Minas Gerais</option>
                            <option value="Pará">Pará</option>
                            <option value="Paraíba">Paraíba</option>
                            <option value="Paraná">Paraná</option>
                            <option value="Pernambuco">Pernambuco</option>
                            <option value="Piauí">Piauí</option>
                            <option value="Rio de Janeiro">Rio de Janeiro</option>
                            <option value="Rio Grande do Norte">Rio Grande do Norte</option>
                            <option value="Rio Grande do Sul">Rio Grande do Sul</option>
                            <option value="Rondônia">Rondônia</option>
                            <option value="Roraima">Roraima</option>
                            <option value="Santa Catarina">Santa Catarina</option>
                            <option value="São Paulo">São Paulo</option>
                            <option value="Sergipe">Sergipe</option>
                            <option value="Tocantins">Tocantins</option>
                        </CustomSelect>
                    </div>
                </div>
            </Container>
        </CustomForm>
    );
}

export default LocationForm;