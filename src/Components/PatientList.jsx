import { useState, useEffect, useCallback } from 'react';
import { getPatients, searchPatients } from '../api/api';
import Modal from './Modal';
import PatientForm from './PatientForm';
import { EyeIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export default function PatientList({ onEdit }) {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);


  // useCallback ensures fetchPatients is stable for useEffect dependencies
  const fetchPatients = useCallback(() => {
    if (search) {
      searchPatients(search)
        .then(res => {
          const sorted = res.data.results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          setPatients(sorted);
        })
        .catch(err => {
          console.error('Failed to search patients:', err);
          setError('Failed to search patients');
        });
    } else {
      getPatients(page)
        .then(res => {
          const sorted = res.data.results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          setPatients(sorted);
          setHasNext(!!res.data.next);
          setHasPrevious(!!res.data.previous);
        })
        .catch(err => {
          console.error('Failed to fetch patients:', err);
          setError('Failed to load patients');
        });
    }
  }, [search, page]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

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
      <div className="mb-8 flex gap-8">
        <input
          type="text"
          placeholder="Search by MRN or Name"
          value={search}
          onChange={(e) => {
            setPage(1); // reset to page 1 when searching
            setSearch(e.target.value);
          }}
          className="flex-1 p-2 border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
        />
        <Link
          to="/register"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Register Patient
        </Link>
      </div>

      <table className="w-full">
        <thead>
          <tr className="bg-secondary text-white">
            <th className="p-2 text-left">MRN</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Gender</th>
            <th className="p-2 text-left">Facility</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Phone No.</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id} className="border-b">
              <td className="p-2">{patient.mrn}</td>
              <td className="p-2">{`${patient.first_name} ${patient.last_name}`}</td>
              <td className="p-2">{patient.gender}</td>
              <td className="p-2">{patient.facility.name}</td>
              <td className="p-2">{patient.email}</td>
              <td className="p-2">{patient.phone}</td>
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

      {/* Pagination controls */}
      {!search && (
        <div className="mt-4 flex justify-between">
          <button
            disabled={!hasPrevious}
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            className={`px-4 py-2 rounded ${hasPrevious ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
          >
            Previous
          </button>
          <button
            disabled={!hasNext}
            onClick={() => setPage(prev => prev + 1)}
            className={`px-4 py-2 rounded ${hasNext ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
          >
            Next
          </button>
        </div>
      )}

      {/* <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title="Patient Details"
      >
        <PatientForm
          patient={selectedPatient}
          onSubmit={(updatedPatient) => {
            if (updatedPatient) {
              // updated patient (after edit)
              setPatients(prev =>
                prev.map(p => (p.id === updatedPatient.id ? updatedPatient : p))
              );
            } else if (selectedPatient) {
              // patient was deleted → remove from list
              setPatients(prev => prev.filter(p => p.id !== selectedPatient.id));
            } else {
              fetchPatients(); // fallback
            }
          }}
          viewMode={true}
          onClose={handleModalClose}
        />
      </Modal> */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title="Patient Details"
      >
        <PatientForm
          patient={selectedPatient}
          onSubmit={(updatedPatient) => {
            if (updatedPatient) {
              // Patient was updated
              setPatients(prev =>
                prev.map(p => (p.id === updatedPatient.id ? updatedPatient : p))
              );
            }
          }}
          onDelete={(id) => {
            // Patient was deleted
            setPatients(prev => prev.filter(p => p.id !== id));
            setIsModalOpen(false);
            setSelectedPatient(null);
          }}
          viewMode={true}
          onClose={handleModalClose}
        />
      </Modal>

    </div>
  );
}
