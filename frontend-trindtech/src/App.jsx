import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LayoutListing from "./components/Layout/LayoutListing";
import LayoutForm from "./components/Layout/LayoutForm";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutListing />} />
        <Route path="/form" element={<LayoutForm />} />
      </Routes>
    </Router>
  );
};

export default App;
