
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from '../Components/Header';
// import PatientForm from '../Components/PatientForm';
// import { Dialog, Transition } from '@headlessui/react';
// import { Fragment } from 'react';

// export default function PatientRegistration() {
//   const [showSuccess, setShowSuccess] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = () => {
//     setShowSuccess(true);
//     setTimeout(() => {
//       setShowSuccess(false);
//       navigate('/');
//     }, 2000); // Redirect after 2 seconds
//   };

//   return (
//     <div className='bg-slate-100 h-[100vh]'>
//       <Header />
//       <main className="container mx-auto p-6 w-[50%]">
//         <PatientForm onSubmit={handleSubmit} viewMode={false} />
//       </main>
//       <Transition appear show={showSuccess} as={Fragment}>
//         <Dialog as="div" className="relative z-10" onClose={() => {}}>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black bg-opacity-25" />
//           </Transition.Child>

//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className="w-full max-w-md bg-accent text-white rounded-lg shadow-md p-6">
//                   <Dialog.Title as="h2" className="text-xl font-bold mb-4">
//                     Success
//                   </Dialog.Title>
//                   <p>Patient registered successfully!</p>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>
//     </div>
//   );
// }

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import PatientForm from '../Components/PatientForm';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function PatientRegistration() {
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/');
    }, 2000); // Redirect after 2 seconds
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className='bg-slate-100 h-[100vh]'>
      <Header />
      <main className="container mx-auto p-6 md:w-[50%] ">
        <PatientForm onSubmit={handleSubmit} viewMode={false} onClose={handleClose} />
      </main>
      <Transition appear show={showSuccess} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md bg-accent text-white rounded-lg shadow-md p-6">
                  <Dialog.Title as="h2" className="text-xl font-bold mb-4">
                    Success
                  </Dialog.Title>
                  <p>Patient registered successfully!</p>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}