import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LayoutListing from "./components/Layout/LayoutListing";
import LayoutForm from "./components/Layout/LayoutForm";
import LayoutUpdate from './components/Layout/LayoutUpdate';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutListing />} />
        <Route path="/form" element={<LayoutForm />} />
        <Route path="/update/:id_student" element={<LayoutUpdate />} />
      </Routes>
    </Router>
  );
};

export default App;
