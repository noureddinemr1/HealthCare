import React, { useState } from 'react';
import AppointmentForm from './AppointmentForm'; // Import the form component
import { useAuth } from '../context/AuthProvider';

const Details = ({ item, onClose }) => {
  const [authUser,setAuthUser] = useAuth();
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div 
      className="font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      style={{ backgroundImage: "url('https://source.unsplash.com/1L71sPT5XKc')" }}
    >
      <div className="w-full max-w-5xl h-[80%] lg:h-[80%] flex items-center bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row w-full h-full">
          {/* Image Section */}
          <div className="lg:w-1/2 h-full">
            <img 
              src={item.image} 
              alt={item.npm} 
              className="w-full h-full object-cover"
              style={{ height: '100%', width: '100%' }}
            />
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center bg-gray-50">
            <h1 className="text-4xl font-extrabold mb-4">{item.npm}</h1>
            <div className="w-3/4 border-b-2 border-teal-500 mb-4"></div>
            <p className="text-xl font-semibold flex items-center mb-4">
              <svg className="h-6 fill-current text-teal-500 pr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
              </svg> Specialité: {item.specialty}
            </p>
            <p className="text-gray-700 text-base mb-4 flex items-center">
              <svg className="h-6 fill-current text-teal-500 pr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" />
              </svg> Lieu: {item.state}
            </p>
            <p className="text-base mb-4">Prix Consultation: {item.price} TND</p>
            <p className="text-base mb-4">Téléphone: {item.phone}</p>
            <p className="text-base mb-4">Email: {item.email}</p>
            <p className="text-base mb-4">Adresse: {item.adress}</p>

            <div className="mt-8">
              {authUser.user.role==="citoyen" ?<><button 
                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg"
                onClick={handleShowForm}
              >
                Prendre rendez-vous
              </button><br/><br/> </>: null}
              
              <button 
                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Conditionally render the AppointmentForm */}
      {showForm && <AppointmentForm item={item} onClose={handleCloseForm} />}
    </div>
  );
};

export default Details;
