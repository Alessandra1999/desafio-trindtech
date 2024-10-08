import axios from 'axios';

// Define a URL base
const API_URL = 'http://localhost:3000/api'; 

// Funções para Alunos
export const getAlunos = async () => {
    const response = await axios.get(`${API_URL}/alunos`);
    return response.data;
};

export const createAluno = async (alunoData) => {
    const response = await axios.post(`${API_URL}/alunos`, alunoData);
    return response.data;
};

export const getAlunoById = async (id_aluno) => {
    const response = await axios.get(`${API_URL}/alunos/${id_aluno}`);
    return response.data;
};

export const updateAluno = async (id_aluno, alunoData) => {
    const response = await axios.put(`${API_URL}/alunos/${id_aluno}`, alunoData);
    return response.data;
};

export const deleteAluno = async (id_aluno) => {
    await axios.delete(`${API_URL}/alunos/${id_aluno}`);
};

// Funções para Cursos
export const getCursos = async () => {
    const response = await axios.get(`${API_URL}/cursos`);
    return response.data;
};

export const createCurso = async (cursoData) => {
    const response = await axios.post(`${API_URL}/cursos`, cursoData);
    return response.data;
};

export const getCursoById = async (id_curso) => {
    const response = await axios.get(`${API_URL}/cursos/${id_curso}`);
    return response.data;
};

export const updateCurso = async (id_curso, cursoData) => {
    const response = await axios.put(`${API_URL}/cursos/${id_curso}`, cursoData);
    return response.data;
};

export const deleteCurso = async (id_curso) => {
    await axios.delete(`${API_URL}/cursos/${id_curso}`);
};

// Funções para Endereços
export const getEnderecos = async () => {
    const response = await axios.get(`${API_URL}/enderecos`);
    return response.data;
};

export const createEndereco = async (enderecoData) => {
    const response = await axios.post(`${API_URL}/enderecos`, enderecoData);
    return response.data;
};

export const getEnderecoById = async (id_endereco) => {
    const response = await axios.get(`${API_URL}/enderecos/${id_endereco}`);
    return response.data;
};

export const updateEndereco = async (id_endereco, enderecoData) => {
    const response = await axios.put(`${API_URL}/enderecos/${id_endereco}`, enderecoData);
    return response.data;
};

export const deleteEndereco = async (id_endereco) => {
    await axios.delete(`${API_URL}/enderecos/${id_endereco}`);
};

// Funções para Associações Aluno-Curso
export const getAlunoCursos = async () => {
    const response = await axios.get(`${API_URL}/aluno-curso`);
    return response.data;
};

export const createAlunoCurso = async (alunoCursoData) => {
    const response = await axios.post(`${API_URL}/aluno-curso`, alunoCursoData);
    return response.data;
};

export const getAlunoCursoById = async (id_aluno, id_curso) => {
    const response = await axios.get(`${API_URL}/aluno-curso/${id_aluno}/${id_curso}`);
    return response.data;
};

export const updateAlunoCurso = async (id_aluno, id_curso, alunoCursoData) => {
    const response = await axios.put(`${API_URL}/aluno-curso/${id_aluno}/${id_curso}`, alunoCursoData);
    return response.data;
};

export const deleteAlunoCurso = async (id_aluno, id_curso) => {
    await axios.delete(`${API_URL}/aluno-curso/${id_aluno}/${id_curso}`);
};


export const deleteAllStudentData = async (id_aluno) => {
    try {
        const enderecos = await getEnderecos(); 
        const alunoCursos = await getAlunoCursos(); 

        for (const endereco of enderecos) {
            if (endereco.id_aluno === id_aluno) {
                await deleteEndereco(endereco.id_endereco);
            }
        }

        const cursosParaDeletar = [];
        for (const alunoCurso of alunoCursos) {
            if (alunoCurso.id_aluno === id_aluno) {
                await deleteAlunoCurso(alunoCurso.id_aluno, alunoCurso.id_curso);
                cursosParaDeletar.push(alunoCurso.id_curso);
            }
        }

        for (const id_curso of cursosParaDeletar) {
            await deleteCurso(id_curso);
        }

        await deleteAluno(id_aluno);
    } catch (error) {
        console.error('Erro ao deletar dados do aluno:', error);
        throw error;
    }
};