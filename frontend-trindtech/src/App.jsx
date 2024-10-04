import DynamicHeader from "./components/DynamicHeader";
import StudentForm from "./components/StudentForm";
import AdressForm from "./components/AdressForm";

function App() {

  return (
    <>
      <DynamicHeader 
        showLogo={false}
        backIcon={() => navigate('/')}
        studentName="Nome do Aluno"
        onDelete={() => handleDeleteStudent()}
      />
      <StudentForm />
      <AdressForm />
    </>
  )
}

export default App;
