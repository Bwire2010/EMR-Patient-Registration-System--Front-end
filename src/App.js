import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import PatientRegistration from './Pages/PatientRegistration';
import Login from './Pages/Login';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PrivateRoute>
              <PatientRegistration />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
