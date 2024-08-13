import { useAuth } from '../context/AuthProvider';

export default function DoctorCard({ item, onClick1, onClick2 }) {
  const [authUser,setAuthUser] = useAuth();
  return (
    <div 
      className="my-6 mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg cursor-pointer" 
      onClick={onClick1}
    >
      <div 
        className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 dark:bg-gray-800 dark:text-white dark:border dark:border-gray-700"
      >
        <div className="relative">
          <img 
            className="w-full h-60 object-cover object-top" 
            src={item.image} 
            alt="Doctor" 
          />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">
            {item.name}
          </h2>
          <p className="font-bold text-gray-600 dark:text-gray-300 mb-4">
            Spécialité: {item.specialty}
          </p>
          <p className="text-md text-gray-500 dark:text-gray-400 mb-6 flex items-center">
            <svg 
              className="inline-block w-5 h-5 mr-2 text-teal-500" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 7.25 7 13 7 13s7-5.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            {item.state}
          </p>
          <div className="flex flex-col justify-between items-start">
            <span className="text-lg font-semibold text-teal-500 dark:text-teal-400 mb-4">
              {item.price} TND
            </span>
            {authUser.user.role==="citoyen" ?
            <button 
              onClick={onClick2}
              className="bg-teal-500 text-white text-md px-5 py-2 rounded-full border-2 border-teal-500 hover:bg-white hover:text-teal-500 transition-colors duration-200"
            >
              Prendre Rendez-vous
            </button> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
