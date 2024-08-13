import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import toast from 'react-hot-toast';

export default function EditUser() {
  const [authUser, setAuthUser] = useAuth();
  const [formData, setFormData] = useState({
    username: authUser?.user?.username || '',
    name: authUser?.user?.name || '',
    email: authUser?.user?.email || '',
    phone: authUser?.user?.phone || '',
    password: '',
    image: authUser?.user?.image || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/users/${authUser.user._id}`, formData);
      setAuthUser((prevAuthUser) => ({
        ...prevAuthUser,
        user: response.data,
      }));
      toast.success('Mise à jour du profil avec succès');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du profil');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Modifier le Profile</h2>
      <form className="space-y-4">
        {[
         
          { field: 'name', label: 'Nom' },
      
          { field: 'phone', label: 'Téléphone' },
          { field: 'password', label: 'Mot de passe' },
          { field: 'image', label: 'Image' }
        ].map(({ field, label }) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-900 dark:text-white">
              {label}
            </label>
            <input
              type={field === 'password' ? 'password' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
            />
          </div>
        ))}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleEdit}
            className="px-4 py-2 text-white bg-teal-500 rounded-md hover:bg-teal-600 focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-700"
          >
            Modifier le Profile
          </button>
        </div>
      </form>
    </div>
  );
}
