import DynamicHeader from "./components/DynamicHeader"

function App() {

  return (
    <>
      <DynamicHeader 
        showLogo={false}
        backIcon={() => navigate('/')}
        studentName="Nome do Aluno"
        onDelete={() => handleDeleteStudent()}
      />
    </>
  )
}

export default App
