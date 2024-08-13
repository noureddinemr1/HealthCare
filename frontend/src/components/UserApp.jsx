import { useEffect, useState } from 'react';
import axios from 'axios';
import UserAppointmentCard from './UserAppointmentCard';
import { useAuth } from '../context/AuthProvider';

export default function UserApp() {
  const [authUser] = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/appointments/user/${authUser.user.email}`);
        setAppointments(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des rendez-vous:', error);
      }
    };
    fetchAppointments();
  }, [authUser]);

  return (
    <div className="min-h-screen  dark:bg-gray-900 p-8">
      <h1 className="text-4xl font-extrabold text-teal-400 dark:text-white mb-8 text-center">
        Vos Rendez-vous
      </h1>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {appointments.length > 0 ? (
          appointments.map(appointment => (
            <UserAppointmentCard key={appointment._id} appointment={appointment} />
          ))
        ) : (
          <p className="text-center text-lg text-gray-500 dark:text-gray-400 mt-12">
            Aucun rendez-vous trouvé.
          </p>
        )}
      </div>
    </div>
  );
}
