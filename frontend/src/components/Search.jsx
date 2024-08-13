import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Details from './Details';
import Card from './Card';
import Loading from './Loading';
import Sidebar from './Sidebar';

export default function Search() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState('places');
  const [selectedSpecialty, setSelectedSpecialty] = useState('specialtiés');
  const [locationOpen, setLocationOpen] = useState(false);
  const [specialtyOpen, setSpecialtyOpen] = useState(false);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:3000/doctors');
      if (response.data) setItems(response.data);
    } catch (e) {
      console.error(e);
    }
    
  };

  useEffect(() => {
    setTimeout(() => {
      fetchItems();
      setLoading(false);
    }, 400);
    
  }, []);

  const filteredItems = items.filter((item) => {
    const locationMatch =
      selectedLocation === 'places' || item.state === selectedLocation;

    const specialtyMatch =
      selectedSpecialty === 'specialtiés' || item.specialty === selectedSpecialty;

    return locationMatch && specialtyMatch;
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='min-h-screen flex'>
      <div className="w-64 p-4">
        <Sidebar
          onSelectLocation={setSelectedLocation}
          onSelectSpecialty={setSelectedSpecialty}
          locationOpen={locationOpen}
          specialtyOpen={specialtyOpen}
          setLocationOpen={setLocationOpen}
          setSpecialtyOpen={setSpecialtyOpen}
          selectedLocation={selectedLocation} 
          selectedSpecialty={selectedSpecialty} 
        />
      </div>
      <div className="flex-1">
        <div className="container mx-auto p-4">
          {selectedItem ? (
            <Details item={selectedItem} onClose={() => setSelectedItem(null)} />
          ) : (
            <div className="grid lg:grid-cols-3 gap-3">
              {filteredItems.map((item, index) => (
                <Card key={index} item={item} onClick1={() => setSelectedItem(item)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
