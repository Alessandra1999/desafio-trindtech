import DynamicHeader from "./components/DynamicHeader";
import StudentForm from "./components/Forms/StudentForm";
import AdressForm from "./components/Forms/AdressForm";
import CourseForm from "./components/Forms/CourseForm";

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
      <CourseForm />
    </>
  )
}

export default App;
