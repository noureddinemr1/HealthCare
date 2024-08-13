import { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import Card from './Card';
import Details from './Details';
import Loading from './Loading';


export default function Home() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const targetRef = useRef(null);
  const [loading,setLoading] = useState(true)

  const scrollToDiv = () => {
    targetRef.current.scrollIntoView({ behavior: 'smooth' });
  };



  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/doctors');
        if (response.data && Array.isArray(response.data)) {
          setItems(response.data);
        } else {
          console.error("Response data is not an array");
        }
      } catch (e) {
        console.log(e);
      }
    };
    setTimeout(() => {
      fetchItems();
      setLoading(false);
    }, 400);
    
  }, []);

  
  return (
    <>
    {loading ? <Loading/> : 
    <>
      <div className="  bg-white flex  items-center  ">
        <div className="container mx-40 px-7 flex justify-center relative py-16">
          <div className="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20">
            <span className="w-20 h-2 bg-gray-800 dark:bg-white mb-12"></span>
            <h1 className="font-bebas-neue uppercase  sm:text-6xl font-black flex flex-col leading-none dark:text-white text-gray-800">
            Votre santé, notre 
              <span className="text-5xl sm:text-7xl">priorité.</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-700 dark:text-white">
            Simplifiez vos démarches médicales grâce à notre plateforme intuitive. Découvrez des professionnels de santé près de chez vous et réservez votre consultation en ligne rapidement.
            </p>
            <div className="flex mt-8">
              <button onClick={scrollToDiv} className=" py-2 px-4 rounded-lg bg-teal-400 border-2 border-transparent text-white text-md mr-4 hover:bg-teal-500">
              Donateurs
              </button>
            </div>
          </div>
          <div className="hidden sm:block sm:w-1/3 lg:w-3/5 relative -right-48">
            <img src="home.jpg" height={100} width={500} alt=''/>
          </div>
        </div>
      </div>
      <div className='grid-cols-5 gap-5 h-20 '>

      </div>

      <div ref={targetRef} className="container mx-auto p-4">
        {selectedItem ? (
          <Details item={selectedItem} onClose={() => setSelectedItem(null)} />
        ) : (
          <div className="grid lg:grid-cols-3 gap-3">
            {items.map((item, index) => (
              <Card key={index} item={item} onClick1={() => setSelectedItem(item)} />
            ))}
          </div>
        )}
      </div>
      </>
      }
    </>
  );
}
