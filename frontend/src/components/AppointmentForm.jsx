import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import toast from 'react-hot-toast';

const AppointmentForm = ({ item, onClose }) => {
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [authUser] = useAuth(); // Removed setAuthUser as it's not needed here

  const checkDateAvailability = async () => {
    try {
      const response = await axios.get('http://localhost:3000/appointments/check-date', {
        params: {
          doctorEmail: item.email,
          date: new Date(date).toISOString().split('T')[0] // Convert date to YYYY-MM-DD
        }
      });
      return response.data.message === 'Date is available.';
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue lors de la vérification de la disponibilité de la date.');
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!date) {
      setError('Veuillez sélectionner une date.');
      setLoading(false);
      return;
    }

    const isDateAvailable = await checkDateAvailability();
    if (!isDateAvailable) {
      setError('La date n\'est pas disponible.');
      setLoading(false);
      return;
    }

    try {
      await axios.post('http://localhost:3000/appointments', {
        userName: authUser.user.name,
        doctorName: item.name,
        userEmail: authUser.user.email,
        doctorEmail: item.email,
        userPhone: authUser.user.phone,
        doctorPhone: item.phone,
        doctorSpecialty: item.specialty,
        doctorState: item.state,
        doctorAdress: item.adress,
        doctorPrice: item.price,
        date,
        message
      });

      toast.success('Rendez-vous prévu avec succès.');
      onClose();
    } catch (err) {
      setError('Une erreur est survenue lors de la planification du rendez-vous.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Rendez-vous</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="date">Date :</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="message">Message (optionnel) :</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows="4"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-teal-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-600"
              disabled={loading}
            >
              {loading ? 'En cours de soumission...' : 'Soumettre'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
            >
              Fermer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
