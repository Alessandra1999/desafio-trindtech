import DynamicHeader from "./components/DynamicHeader"
import StudentForm from "./components/StudentForm"

function App() {

  return (
    <>
      <DynamicHeader 
        showLogo={false}
        backIcon={() => navigate('/')}
        studentName="Nome do Aluno"
        onDelete={() => handleDeleteStudent()}
      />
      <StudentForm/>
    </>
  )
}

export default App;
