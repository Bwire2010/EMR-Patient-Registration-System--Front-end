import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import PatientForm from '../Components/PatientForm';

export default function PatientRegistration() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Just navigate away after a short delay if you still want auto-redirect
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className='bg-slate-100 h-[100vh]'>
      <Header />
      <main className="container mx-auto p-6 md:w-[50%]">
        <PatientForm onSubmit={handleSubmit} viewMode={false} onClose={handleClose} />
      </main>
    </div>
  );
}
