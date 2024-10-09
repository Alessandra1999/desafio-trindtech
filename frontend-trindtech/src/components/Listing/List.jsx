import styled from "styled-components";
import { HiOutlineSwitchVertical } from "react-icons/hi";

const CustomTable = styled.table`
    margin-top: 52px;
`;

function List ({ studentData }) {
    <CustomTable className="table table-borderless">
        <thead>
            <tr>
                <th scope="col">Data de Cadastro <HiOutlineSwitchVertical /></th>
                <th scope="col">Nome</th>
                <th scope="col">Estado</th>
                <th scope="col">Cursos</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                
            </tr>
        </tbody>
    </CustomTable>
};

export default List;