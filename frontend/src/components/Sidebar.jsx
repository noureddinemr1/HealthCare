export default function Sidebar({
    onSelectLocation,
    onSelectSpecialty,
    selectedLocation,
    selectedSpecialty,
    locationOpen,
    specialtyOpen,
    setLocationOpen,
    setSpecialtyOpen
  }) {
    const locations = [
        'places',
        'Tunis',
        'Ariana',
        'Ben Arous',
        'Manouba',
        'Nabeul',
        'Zaghouan',
        'Bizerte',
        'Beja',
        'Jendouba',
        'Kef',
        'Siliana',
        'Sousse',
        'Monastir',
        'Mahdia',
        'Sfax',
        'Gabès',
        'Medenine',
        'Tozeur',
        'Kebili',
        'Gafsa',
        'Sidi Bouzid',
        'Kasserine',
        'Tataouine'
      ];
  
      const specialties = [
        'specialtiés',
        'Cardiologue',
        'Dermatologue',
        'Pédiatre',
        'Ophtalmologue',
        'Gynécologue',
        'Orthopédique',
        'Neurologue',
        'Médecin généraliste',
        'Rhumatologue',
        'Chirurgien',
        'Oncologue',
        'Urologue',
        'Endocrinologue',
        'Gastro-entérologue',
        'Psychiatre',
        'Hématologue',
        'Pneumologue',
        'Néphrologue',
        'Anesthésiste',
        'Médecin du travail'
      ];
      
  
    return (
        <div className="bg-white shadow-md rounded-lg p-6 dark:bg-gray-800 dark:text-white">
        <h3 className="text-lg font-semibold mb-6">Filtrer par</h3>
  
        <div className="mb-6">
          <button
            onClick={() => setLocationOpen(!locationOpen)}
            className="w-full text-left px-4 py-2 font-medium bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
          >
            {selectedLocation === 'All locations' ? 'Lieu' : selectedLocation}
            <svg
              className={`w-4 h-4 inline-block float-right transform ${
                locationOpen ? 'rotate-180' : ''
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {locationOpen && (
            <ul className="mt-2 bg-gray-50 rounded-lg shadow-inner dark:bg-gray-700">
              {locations.map((location, index) => (
                <li key={index}>
                  <button
                    className={`block w-full text-left px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
                      selectedLocation === location ? 'bg-gray-200 dark:bg-gray-600' : ''
                    }`}
                    onClick={() => {
                      onSelectLocation(location);
                    }}
                  >
                    {location}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
  
        <div>
          <button
            onClick={() => setSpecialtyOpen(!specialtyOpen)}
            className="w-full text-left px-4 py-2 font-medium bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
          >
            {selectedSpecialty === 'All specialties' ? 'Spécialité' : selectedSpecialty}
            <svg
              className={`w-4 h-4 inline-block float-right transform ${
                specialtyOpen ? 'rotate-180' : ''
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {specialtyOpen && (
            <ul className="mt-2 bg-gray-50 rounded-lg shadow-inner dark:bg-gray-700">
              {specialties.map((specialty, index) => (
                <li key={index}>
                  <button
                    className={`block w-full text-left px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
                      selectedSpecialty === specialty ? 'bg-gray-200 dark:bg-gray-600' : ''
                    }`}
                    onClick={() => {
                      onSelectSpecialty(specialty);
                    }}
                  >
                    {specialty}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
  