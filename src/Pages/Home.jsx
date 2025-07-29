import Header from '../Components/Header';
import PatientList from '../Components/PatientList';
import { useState } from 'react';

export default function Home() {
  const [selectedPatient, setSelectedPatient] = useState(null);

  return (
    <div>
      <Header />
      <main className="container mx-auto p-6">
        <PatientList onEdit={setSelectedPatient} />
      </main>
    </div>
  );
}