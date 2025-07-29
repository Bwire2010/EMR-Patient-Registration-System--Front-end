import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import PatientRegistration from './Pages/PatientRegistration';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<PatientRegistration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App