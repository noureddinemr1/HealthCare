import { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorAppointmentCard from './DoctorAppointmentCard';
import { useAuth } from '../context/AuthProvider';
import { FaPlus } from 'react-icons/fa';
import AddAppointmentForm from './AddAppointmentForm';
import toast from 'react-hot-toast';

export default function DoctorApp() {
  const [authUser] = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/appointments/doctor/${authUser.user.email}`);
        setAppointments(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des rendez-vous:', error);
      }
    };
    fetchAppointments();
  }, [authUser]);

  const handleAddSuccess = () => {
    toast.success('rendez-vous crée avec succées .')
  };

  return (
    <div className="min-h-screen  dark:bg-gray-900 p-8">
    <h1 className="text-4xl font-extrabold text-teal-400 dark:text-white mb-8 text-center">
      Vos Rendez-vous
    </h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {appointments.length > 0 ? (
          appointments.map(appointment => (
            <DoctorAppointmentCard key={appointment._id} appointment={appointment} />
          ))
        ) : (
          <p className="text-gray-500">Aucun rendez-vous trouvé.</p>
        )}
      </div>

      <div className="fixed bottom-6 right-6">
        <FaPlus 
          className="text-teal-400 cursor-pointer hover:text-teal-700 text-4xl"
          onClick={() => setShowAddForm(true)} 
        />
      </div>

      {showAddForm && (
        <AddAppointmentForm 
          onClose={() => setShowAddForm(false)} 
          onSuccess={handleAddSuccess} 
        />
      )}
    </div>
  );
}
