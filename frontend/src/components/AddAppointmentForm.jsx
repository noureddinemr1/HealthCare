import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import toast from 'react-hot-toast';

const AddAppointmentForm = ({ onClose, onSuccess }) => {
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [authUser,setAuthUser] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('http://localhost:3000/appointments/add', {
        userName : authUser.user.username,
        doctorEmail : authUser.user.email,
        date,
      });

      onSuccess();
      onClose();
    } catch (err) {
      toast.error('Une erreur s\'est produite lors de la création du rendez-vous.');
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Ajouter un Rendez-vous</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="date">Date:</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-teal-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-600"
              disabled={loading}
            >
              {loading ? 'En cours...' : 'Ajouter'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAppointmentForm;
