// // import { useState, useEffect } from 'react';
// // import { getFacilities, getServices, createPatient, updatePatient } from '../api/api';

// // export default function PatientForm({ patient, onSubmit, viewMode = true }) {
// //     const [formData, setFormData] = useState({
// //         mrn: '',
// //         first_name: '',
// //         last_name: '',
// //         gender: 'M',
// //         date_of_birth: '',
// //         phone: '',
// //         email: '',
// //         address: '',
// //         insurance_provider: '',
// //         insurance_number: '',
// //         facility_id: '',
// //         service_ids: [],
// //     });
// //     const [facilities, setFacilities] = useState([]);
// //     const [services, setServices] = useState([]);
// //     const [error, setError] = useState('');
// //     const [isEditMode, setIsEditMode] = useState(!viewMode);

// //     useEffect(() => {
// //         getFacilities()
// //             .then(res => setFacilities(res.data))
// //             .catch(err => {
// //                 console.error('Failed to fetch facilities:', err);
// //                 setError('Failed to load facilities');
// //             });
// //         getServices()
// //             .then(res => setServices(res.data))
// //             .catch(err => {
// //                 console.error('Failed to fetch services:', err);
// //                 setError('Failed to load services');
// //             });
// //         if (patient) {
// //             setFormData({
// //                 ...patient,
// //                 facility_id: patient.facility.id,
// //                 service_ids: patient.services.map(s => s.id),
// //             });
// //         }
// //     }, [patient]);

// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setFormData(prev => ({ ...prev, [name]: value }));
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         try {
// //             if (patient) {
// //                 const updatedPatient = await updatePatient(patient.id, formData);
// //                 setFormData({
// //                     ...updatedPatient.data,
// //                     facility_id: updatedPatient.data.facility.id,
// //                     service_ids: updatedPatient.data.services.map(s => s.id),
// //                 });
// //                 setIsEditMode(false); // Switch back to view mode
// //                 setError('');
// //             } else {
// //                 await createPatient(formData);
// //                 setFormData({
// //                     mrn: '',
// //                     first_name: '',
// //                     last_name: '',
// //                     gender: 'M',
// //                     date_of_birth: '',
// //                     phone: '',
// //                     email: '',
// //                     address: '',
// //                     insurance_provider: '',
// //                     insurance_number: '',
// //                     facility_id: '',
// //                     service_ids: [],
// //                 });
// //                 onSubmit();
// //                 setError('');
// //             }
// //         } catch (err) {
// //             console.error('Error submitting form:', err);
// //             setError('Failed to save patient');
// //         }
// //     };

// //     const handleEdit = () => {
// //         setIsEditMode(true);
// //     };

// //     const facilityName = facilities.find(f => f.id === formData.facility_id)?.name || 'N/A';
// //     const serviceNames = formData.service_ids
// //         .map(id => services.find(s => s.id === id)?.name)
// //         .filter(name => name)
// //         .join(', ') || 'None';

// //     return (
// //         <div className="bg-card p-6 rounded-lg shadow-md ">
// //             {error && <p className="text-red-500 mb-4">{error}</p>}
// //             {isEditMode ? (
// //                 <form onSubmit={handleSubmit}>
// //                     <div className="grid grid-cols-2  gap-4">
// //                         <div>
// //                             <label className="block text-sm font-medium text-text">MRN</label>
// //                             <input
// //                                 type="text"
// //                                 name="mrn"
// //                                 value={formData.mrn}
// //                                 onChange={handleChange}
// //                                 className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
// //                                 disabled={!!patient}
// //                             />
// //                         </div>
// //                         <div>
// //                             <label className="block text-sm font-medium text-text">First Name</label>
// //                             <input
// //                                 type="text"
// //                                 name="first_name"
// //                                 value={formData.first_name}
// //                                 onChange={handleChange}
// //                                 className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
// //                                 required
// //                             />
// //                         </div>
// //                         <div>
// //                             <label className="block text-sm font-medium text-text">Last Name</label>
// //                             <input
// //                                 type="text"
// //                                 name="last_name"
// //                                 value={formData.last_name}
// //                                 onChange={handleChange}
// //                                 className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
// //                                 required
// //                             />
// //                         </div>
// //                         <div>
// //                             <label className="block text-sm font-medium text-text">Gender</label>
// //                             <select
// //                                 name="gender"
// //                                 value={formData.gender}
// //                                 onChange={handleChange}
// //                                 className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
// //                             >
// //                                 <option value="M">Male</option>
// //                                 <option value="F">Female</option>
// //                                 <option value="O">Other</option>
// //                             </select>
// //                         </div>
// //                         <div>
// //                             <label className="block text-sm font-medium text-text">Date of Birth</label>
// //                             <input
// //                                 type="date"
// //                                 name="date_of_birth"
// //                                 value={formData.date_of_birth}
// //                                 onChange={handleChange}
// //                                 className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
// //                                 required
// //                             />
// //                         </div>
// //                         <div>
// //                             <label className="block text-sm font-medium text-text">Phone</label>
// //                             <input
// //                                 type="tel"
// //                                 name="phone"
// //                                 value={formData.phone}
// //                                 onChange={handleChange}
// //                                 className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
// //                             />
// //                         </div>
// //                         <div>
// //                             <label className="block text-sm font-medium text-text">Email</label>
// //                             <input
// //                                 type="email"
// //                                 name="email"
// //                                 value={formData.email}
// //                                 onChange={handleChange}
// //                                 className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
// //                             />
// //                         </div>
// //                         <div className="col-span-2">
// //                             <label className="block text-sm font-medium text-text">Address</label>
// //                             <textarea
// //                                 name="address"
// //                                 value={formData.address}
// //                                 onChange={handleChange}
// //                                 className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
// //                             />
// //                         </div>
// //                         <div>
// //                             <label className="block text-sm font-medium text-text">Insurance Provider</label>
// //                             <input
// //                                 type="text"
// //                                 name="insurance_provider"
// //                                 value={formData.insurance_provider}
// //                                 onChange={handleChange}
// //                                 className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
// //                             />
// //                         </div>
// //                         <div>
// //                             <label className="block text-sm font-medium text-text">Insurance Number</label>
// //                             <input
// //                                 type="text"
// //                                 name="insurance_number"
// //                                 value={formData.insurance_number}
// //                                 onChange={handleChange}
// //                                 className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
// //                             />
// //                         </div>
// //                         <div>
// //                             <label className="block text-sm font-medium text-text">Facility</label>
// //                             <select
// //                                 name="facility_id"
// //                                 value={formData.facility_id}
// //                                 onChange={handleChange}
// //                                 className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
// //                                 required
// //                             >
// //                                 <option value="">Select Facility</option>
// //                                 {facilities.map(facility => (
// //                                     <option key={facility.id} value={facility.id}>
// //                                         {facility.name}
// //                                     </option>
// //                                 ))}
// //                             </select>
// //                         </div>
// //                         <div>
// //                             <label className="block text-sm font-medium text-text">Services</label>
// //                             <select
// //                                 name="service_ids"
// //                                 multiple
// //                                 value={formData.service_ids}
// //                                 onChange={(e) =>
// //                                     setFormData({
// //                                         ...formData,
// //                                         service_ids: Array.from(e.target.selectedOptions, option => parseInt(option.value)),
// //                                     })
// //                                 }
// //                                 className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
// //                             >
// //                                 {services.map(service => (
// //                                     <option key={service.id} value={service.id}>
// //                                         {service.name}
// //                                     </option>
// //                                 ))}
// //                             </select>
// //                         </div>
// //                     </div>
// //                     <button
// //                         type="submit"
// //                         className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
// //                     >
// //                         {patient ? 'Update Patient' : 'Register Patient'}
// //                     </button>
// //                 </form>
// //             ) : (
// //                 <div className="grid grid-cols-2 gap-4">
// //                     <div>
// //                         <label className="block text-sm font-medium text-text">MRN</label>
// //                         <p className="mt-1 p-2 bg-gray-100 rounded">{formData.mrn || 'N/A'}</p>
// //                     </div>
// //                     <div>
// //                         <label className="block text-sm font-medium text-text">First Name</label>
// //                         <p className="mt-1 p-2 bg-gray-100 rounded">{formData.first_name || 'N/A'}</p>
// //                     </div>
// //                     <div>
// //                         <label className="block text-sm font-medium text-text">Last Name</label>
// //                         <p className="mt-1 p-2 bg-gray-100 rounded">{formData.last_name || 'N/A'}</p>
// //                     </div>
// //                     <div>
// //                         <label className="block text-sm font-medium text-text">Gender</label>
// //                         <p className="mt-1 p-2 bg-gray-100 rounded">{formData.gender || 'N/A'}</p>
// //                     </div>
// //                     <div>
// //                         <label className="block text-sm font-medium text-text">Date of Birth</label>
// //                         <p className="mt-1 p-2 bg-gray-100 rounded">{formData.date_of_birth || 'N/A'}</p>
// //                     </div>
// //                     <div>
// //                         <label className="block text-sm font-medium text-text">Phone</label>
// //                         <p className="mt-1 p-2 bg-gray-100 rounded">{formData.phone || 'N/A'}</p>
// //                     </div>
// //                     <div>
// //                         <label className="block text-sm font-medium text-text">Email</label>
// //                         <p className="mt-1 p-2 bg-gray-100 rounded">{formData.email || 'N/A'}</p>
// //                     </div>
// //                     <div className="col-span-2">
// //                         <label className="block text-sm font-medium text-text">Address</label>
// //                         <p className="mt-1 p-2 bg-gray-100 rounded">{formData.address || 'N/A'}</p>
// //                     </div>
// //                     <div>
// //                         <label className="block text-sm font-medium text-text">Insurance Provider</label>
// //                         <p className="mt-1 p-2 bg-gray-100 rounded">{formData.insurance_provider || 'N/A'}</p>
// //                     </div>
// //                     <div>
// //                         <label className="block text-sm font-medium text-text">Insurance Number</label>
// //                         <p className="mt-1 p-2 bg-gray-100 rounded">{formData.insurance_number || 'N/A'}</p>
// //                     </div>
// //                     <div>
// //                         <label className="block text-sm font-medium text-text">Facility</label>
// //                         <p className="mt-1 p-2 bg-gray-100 rounded">{facilityName}</p>
// //                     </div>
// //                     <div>
// //                         <label className="block text-sm font-medium text-text">Services</label>
// //                         <p className="mt-1 p-2 bg-gray-100 rounded">{serviceNames}</p>
// //                     </div>
// //                     <button
// //                         onClick={handleEdit}
// //                         className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
// //                     >
// //                         Edit
// //                     </button>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // }


// import { useState, useEffect } from 'react';
// import { XMarkIcon } from '@heroicons/react/24/outline';
// import { getFacilities, getServices, createPatient, updatePatient } from '../api/api';

// export default function PatientForm({ patient, onSubmit, viewMode = true, onClose }) {
//   const [formData, setFormData] = useState({
//     mrn: '',
//     first_name: '',
//     last_name: '',
//     gender: 'M',
//     date_of_birth: '',
//     phone: '',
//     email: '',
//     address: '',
//     insurance_provider: '',
//     insurance_number: '',
//     facility_id: '',
//     service_ids: [],
//   });
//   const [facilities, setFacilities] = useState([]);
//   const [services, setServices] = useState([]);
//   const [error, setError] = useState('');
//   const [isEditMode, setIsEditMode] = useState(!viewMode);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     getFacilities()
//       .then(res => setFacilities(res.data))
//       .catch(err => {
//         console.error('Failed to fetch facilities:', err);
//         setError('Failed to load facilities');
//       });
//     getServices()
//       .then(res => setServices(res.data))
//       .catch(err => {
//         console.error('Failed to fetch services:', err);
//         setError('Failed to load services');
//       });
//     if (patient) {
//       setFormData({
//         ...patient,
//         facility_id: patient.facility.id,
//         service_ids: patient.services.map(s => s.id),
//       });
//     }
//   }, [patient]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       if (patient) {
//         const updatedPatient = await updatePatient(patient.id, formData);
//         setFormData({
//           ...updatedPatient.data,
//           facility_id: updatedPatient.data.facility.id,
//           service_ids: updatedPatient.data.services.map(s => s.id),
//         });
//         setIsEditMode(false); // Switch back to view mode
//         setError('');
//       } else {
//         await createPatient(formData);
//         setFormData({
//           mrn: '',
//           first_name: '',
//           last_name: '',
//           gender: 'M',
//           date_of_birth: '',
//           phone: '',
//           email: '',
//           address: '',
//           insurance_provider: '',
//           insurance_number: '',
//           facility_id: '',
//           service_ids: [],
//         });
//         onSubmit();
//         setError('');
//       }
//     } catch (err) {
//       console.error('Error submitting form:', err);
//       setError('Failed to save patient');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleEdit = () => {
//     setIsEditMode(true);
//   };

//   const facilityName = facilities.find(f => f.id === formData.facility_id)?.name || 'N/A';
//   const serviceNames = formData.service_ids
//     .map(id => services.find(s => s.id === id)?.name)
//     .filter(name => name)
//     .join(', ') || 'None';

//   return (
//     <div className="bg-card p-6 rounded-lg shadow-md relative">
//       {onClose && (
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-secondary hover:text-opacity-80"
//         >
//           <XMarkIcon className="h-6 w-6" />
//         </button>
//       )}
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       {isEditMode ? (
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-text">MRN</label>
//               <input
//                 type="text"
//                 name="mrn"
//                 value={formData.mrn}
//                 onChange={handleChange}
//                 className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
//                 disabled={!!patient}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-text">First Name</label>
//               <input
//                 type="text"
//                 name="first_name"
//                 value={formData.first_name}
//                 onChange={handleChange}
//                 className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-text">Last Name</label>
//               <input
//                 type="text"
//                 name="last_name"
//                 value={formData.last_name}
//                 onChange={handleChange}
//                 className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-text">Gender</label>
//               <select
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleChange}
//                 className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
//               >
//                 <option value="M">Male</option>
//                 <option value="F">Female</option>
//                 <option value="O">Other</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-text">Date of Birth</label>
//               <input
//                 type="date"
//                 name="date_of_birth"
//                 value={formData.date_of_birth}
//                 onChange={handleChange}
//                 className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-text">Phone</label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-text">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
//               />
//             </div>
//             <div className="col-span-2">
//               <label className="block text-sm font-medium text-text">Address</label>
//               <textarea
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-text">Insurance Provider</label>
//               <input
//                 type="text"
//                 name="insurance_provider"
//                 value={formData.insurance_provider}
//                 onChange={handleChange}
//                 className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-text">Insurance Number</label>
//               <input
//                 type="text"
//                 name="insurance_number"
//                 value={formData.insurance_number}
//                 onChange={handleChange}
//                 className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-text">Facility</label>
//               <select
//                 name="facility_id"
//                 value={formData.facility_id}
//                 onChange={handleChange}
//                 className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
//                 required
//               >
//                 <option value="">Select Facility</option>
//                 {facilities.map(facility => (
//                   <option key={facility.id} value={facility.id}>
//                     {facility.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-text">Services</label>
//               <select
//                 name="service_ids"
//                 multiple
//                 value={formData.service_ids}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     service_ids: Array.from(e.target.selectedOptions, option => parseInt(option.value)),
//                   })
//                 }
//                 className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
//               >
//                 {services.map(service => (
//                   <option key={service.id} value={service.id}>
//                     {service.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//           <button
//             type="submit"
//             className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 disabled:opacity-50"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? (patient ? 'Updating...' : 'Registering...') : (patient ? 'Update Patient' : 'Register Patient')}
//           </button>
//         </form>
//       ) : (
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-text">MRN</label>
//             <p className="mt-1 p-2 bg-gray-100 rounded">{formData.mrn || 'N/A'}</p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-text">First Name</label>
//             <p className="mt-1 p-2 bg-gray-100 rounded">{formData.first_name || 'N/A'}</p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-text">Last Name</label>
//             <p className="mt-1 p-2 bg-gray-100 rounded">{formData.last_name || 'N/A'}</p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-text">Gender</label>
//             <p className="mt-1 p-2 bg-gray-100 rounded">{formData.gender || 'N/A'}</p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-text">Date of Birth</label>
//             <p className="mt-1 p-2 bg-gray-100 rounded">{formData.date_of_birth || 'N/A'}</p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-text">Phone</label>
//             <p className="mt-1 p-2 bg-gray-100 rounded">{formData.phone || 'N/A'}</p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-text">Email</label>
//             <p className="mt-1 p-2 bg-gray-100 rounded">{formData.email || 'N/A'}</p>
//           </div>
//           <div className="col-span-2">
//             <label className="block text-sm font-medium text-text">Address</label>
//             <p className="mt-1 p-2 bg-gray-100 rounded">{formData.address || 'N/A'}</p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-text">Insurance Provider</label>
//             <p className="mt-1 p-2 bg-gray-100 rounded">{formData.insurance_provider || 'N/A'}</p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-text">Insurance Number</label>
//             <p className="mt-1 p-2 bg-gray-100 rounded">{formData.insurance_number || 'N/A'}</p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-text">Facility</label>
//             <p className="mt-1 p-2 bg-gray-100 rounded">{facilityName}</p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-text">Services</label>
//             <p className="mt-1 p-2 bg-gray-100 rounded">{serviceNames}</p>
//           </div>
//           <button
//             onClick={handleEdit}
//             className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
//           >
//             Edit
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { getFacilities, getServices, createPatient, updatePatient } from '../api/api';

export default function PatientForm({ patient, onSubmit, viewMode = true, onClose }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    gender: 'M',
    date_of_birth: '',
    phone: '',
    email: '',
    address: '',
    insurance_provider: '',
    insurance_number: '',
    facility_id: '',
    service_ids: [],
    ...(patient ? { mrn: patient.mrn } : {}), // Include mrn only if patient exists
  });
  const [facilities, setFacilities] = useState([]);
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');
  const [isEditMode, setIsEditMode] = useState(!viewMode);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getFacilities()
      .then(res => setFacilities(res.data))
      .catch(err => {
        console.error('Failed to fetch facilities:', err);
        setError('Failed to load facilities');
      });
    getServices()
      .then(res => setServices(res.data))
      .catch(err => {
        console.error('Failed to fetch services:', err);
        setError('Failed to load services');
      });
    if (patient) {
      setFormData({
        ...patient,
        facility_id: patient.facility.id,
        service_ids: patient.services.map(s => s.id),
      });
    }
  }, [patient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (patient) {
        const updatedPatient = await updatePatient(patient.id, formData);
        setFormData({
          ...updatedPatient.data,
          facility_id: updatedPatient.data.facility.id,
          service_ids: updatedPatient.data.services.map(s => s.id),
        });
        setIsEditMode(false); // Switch back to view mode
        setError('');
      } else {
        // Exclude mrn from formData for new patient
        const { mrn, ...createData } = formData;
        await createPatient(createData);
        setFormData({
          first_name: '',
          last_name: '',
          gender: 'M',
          date_of_birth: '',
          phone: '',
          email: '',
          address: '',
          insurance_provider: '',
          insurance_number: '',
          facility_id: '',
          service_ids: [],
        });
        onSubmit();
        setError('');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to save patient');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const facilityName = facilities.find(f => f.id === formData.facility_id)?.name || 'N/A';
  const serviceNames = formData.service_ids
    .map(id => services.find(s => s.id === id)?.name)
    .filter(name => name)
    .join(', ') || 'None';

  return (
    <div className="bg-card p-6 rounded-lg shadow-md relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-secondary hover:text-opacity-80"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      )}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {isEditMode ? (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {patient && (
              <div>
                <label className="block text-sm font-medium text-text">MRN</label>
                <input
                  type="text"
                  name="mrn"
                  value={formData.mrn}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
                  disabled
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text">Date of Birth</label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-text">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text">Insurance Provider</label>
              <input
                type="text"
                name="insurance_provider"
                value={formData.insurance_provider}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text">Insurance Number</label>
              <input
                type="text"
                name="insurance_number"
                value={formData.insurance_number}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text">Facility</label>
              <select
                name="facility_id"
                value={formData.facility_id}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
                required
              >
                <option value="">Select Facility</option>
                {facilities.map(facility => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text">Services</label>
              <select
                name="service_ids"
                multiple
                value={formData.service_ids}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    service_ids: Array.from(e.target.selectedOptions, option => parseInt(option.value)),
                  })
                }
                className="mt-1 p-2 w-full border rounded focus:ring focus:ring-primary focus:ring-opacity-50"
              >
                {services.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? (patient ? 'Updating...' : 'Registering...') : (patient ? 'Update Patient' : 'Register Patient')}
          </button>
        </form>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text">MRN</label>
            <p className="mt-1 p-2 bg-gray-100 rounded">{formData.mrn || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-text">First Name</label>
            <p className="mt-1 p-2 bg-gray-100 rounded">{formData.first_name || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-text">Last Name</label>
            <p className="mt-1 p-2 bg-gray-100 rounded">{formData.last_name || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-text">Gender</label>
            <p className="mt-1 p-2 bg-gray-100 rounded">{formData.gender || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-text">Date of Birth</label>
            <p className="mt-1 p-2 bg-gray-100 rounded">{formData.date_of_birth || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-text">Phone</label>
            <p className="mt-1 p-2 bg-gray-100 rounded">{formData.phone || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-text">Email</label>
            <p className="mt-1 p-2 bg-gray-100 rounded">{formData.email || 'N/A'}</p>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-text">Address</label>
            <p className="mt-1 p-2 bg-gray-100 rounded">{formData.address || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-text">Insurance Provider</label>
            <p className="mt-1 p-2 bg-gray-100 rounded">{formData.insurance_provider || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-text">Insurance Number</label>
            <p className="mt-1 p-2 bg-gray-100 rounded">{formData.insurance_number || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-text">Facility</label>
            <p className="mt-1 p-2 bg-gray-100 rounded">{facilityName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-text">Services</label>
            <p className="mt-1 p-2 bg-gray-100 rounded">{serviceNames}</p>
          </div>
          <button
            onClick={handleEdit}
            className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}