import { useState, useEffect } from 'react';
import { getPatients, searchPatients } from '../api/api';
import Modal from './Modal';
import PatientForm from './PatientForm';
import { EyeIcon } from '@heroicons/react/24/outline';

export default function PatientList({ onEdit }) {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (search) {
      searchPatients(search)
        .then(res => setPatients(res.data.sort((a, b) => b.id - a.id)))
        .catch(err => {
          console.error('Failed to search patients:', err);
          setError('Failed to search patients');
        });
    } else {
      getPatients()
        .then(res => setPatients(res.data.sort((a, b) => b.id - a.id)))
        .catch(err => {
          console.error('Failed to fetch patients:', err);
          setError('Failed to load patients');
        });
    }
  }, [search]);

  const handleView = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
    onEdit(patient);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-md">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by MRN or Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
        />
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-secondary text-white">
            <th className="p-2">MRN</th>
            <th className="p-2">Name</th>
            <th className="p-2">Gender</th>
            <th className="p-2">Facility</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id} className="border-b">
              <td className="p-2">{patient.mrn}</td>
              <td className="p-2">{`${patient.first_name} ${patient.last_name}`}</td>
              <td className="p-2">{patient.gender}</td>
              <td className="p-2">{patient.facility.name}</td>
              <td className="p-2">
                <button
                  onClick={() => handleView(patient)}
                  className="text-accent hover:text-opacity-80"
                  title="View Patient"
                >
                  <EyeIcon className="h-6 w-6" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title="Patient Details"
      >
        <PatientForm
          patient={selectedPatient}
          onSubmit={handleModalClose}
          viewMode={true}
        />
      </Modal>
    </div>
  );
}