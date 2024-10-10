import styled from "styled-components";
import axios from "axios";

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
        setLocationData((prev) => ({ ...prev, [name]: value }));

        // Se o campo alterado for o CEP, faça a requisição
        if (name === "cep" && value.length === 9) { // Verifique se o CEP está no formato correto (ex: 00000-000)
            fetchAddress(value);
        }
    };

    const fetchAddress = async (cep) => {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            if (response.data && !response.data.erro) {
                const { logradouro, bairro, localidade, uf } = response.data;

                setLocationData((prev) => ({
                    ...prev,
                    street: logradouro,
                    district: bairro,
                    city: localidade,
                    state: uf,
                }));
            } else {
                console.error("CEP não encontrado");
            }
        } catch (error) {
            console.error("Erro ao buscar o endereço:", error);
        }
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
                        <CustomInput
                            type="text"
                            id="stateInput"
                            name="state"
                            className="form-control"
                            value={locationData.state}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </Container>
        </CustomForm>
    );
}

export default LocationForm;