import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../context/AuthProvider";
import toast from 'react-hot-toast';

export default function EditDoctor() {
  const [authUser, setAuthUser] = useAuth();
  const [formData, setFormData] = useState({
    username: authUser?.user?.username || '',
    name: authUser?.user?.name || '',
    email: authUser?.user?.email || '',
    phone: authUser?.user?.phone || '',
    password: '',
    image: authUser?.user?.image || '',
    specialty: authUser?.user?.specialty || '',
    state: authUser?.user?.state || '',
    adress: authUser?.user?.adress || '',
    price: authUser?.user?.price || '',
  });

  const [isPublishEnabled, setIsPublishEnabled] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    const checkIfPublished = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/public_doctors/${authUser.user.email}`);
        setIsPublished(response.data.exists);
      } catch (error) {
        if (error.response?.status === 404) {
          setIsPublished(false);
        } else {
          console.error('Erreur lors de la vérification du statut de publication:', error);
        }
      }
    };

    checkIfPublished();
  }, [authUser.user.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    
    // Check if all required fields are filled
    const allFieldsFilled = Object.entries({ ...formData, [name]: value })
      .filter(([key]) => key !== 'password') // Ignore password field in validation
      .every(([, fieldValue]) => fieldValue && fieldValue.trim !== "");

    setIsPublishEnabled(allFieldsFilled);
  };

  const handleEdit = async () => {
    try {
      await axios.put(`http://localhost:3000/doctors/${authUser.user.email}`, formData);
      
      setAuthUser(prev => ({
        ...prev,
        user: {
          ...prev.user,
          ...formData,
        },
      }));
      
      toast.success('Mise à jour effectuée avec succès');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const handlePublish = async () => {
    try {
        console.log(formData);
        await axios.post('http://localhost:3000/publish_doctor', formData);
        
        toast.success('Profile publié avec succès .');
        handleEdit();
        setIsPublished(true);
    } catch (error) {
        toast.error('Erreur lors de la publication du profile .');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Modifier le Profil</h2>
      <form className="space-y-4">
        {[ 'name',  'phone', 'password', 'image', 'specialty', 'state', 'adress','price'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-900 dark:text-white">
              {
               field === 'name' ? 'Nom' :
               field === 'phone' ? 'Téléphone' :
               field === 'password' ? 'Mot de passe' :
               field === 'image' ? 'Image' :
               field === 'specialty' ? 'Spécialité' :
               field === 'state' ? 'État' :
               field === 'adress' ? 'Adresse' :
               field === 'price' ? 'Prix' :
               field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === 'password' ? 'password' :(field ==='price' ? 'number' : 'text')}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
            />
          </div>
        ))}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleEdit}
            className="px-4 py-2 text-white bg-teal-500 rounded-md hover:bg-teal-600 focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-700"
          >
            Modifier le Profile
          </button>
          {!isPublished && (
            <button
              type="button"
              onClick={handlePublish}
              disabled={!isPublishEnabled}
              className={`px-4 py-2 rounded-md text-white ${isPublishEnabled ? 'bg-teal-500 hover:bg-teal-600' : 'bg-gray-400 cursor-not-allowed'}`}
            >
              Publier le Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
