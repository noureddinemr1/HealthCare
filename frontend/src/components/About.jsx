import { useState, useEffect } from 'react';
import Loading from './Loading';

export default function About() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400); 
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="sm:flex relative  left-10 items-center max-w-screen-xl">
            <div className="sm:w-1/2 p-10">
              <div className="image object-center text-center">
                <img
                  src="about.png"
                  height={50} width={400}
                  alt="Our Company"
                />
              </div>
            </div>
            <div className="sm:w-1/2 p-5">
              <div className="text">
                <span className="text-gray-500 border-b-2 border-teal-400 uppercase">
                  A propos
                </span>
                <h2 className="my-4 font-bold text-6xl sm:text-4xl">
                A propos de
<span className="text-teal-400"> HealthCare</span>
                </h2>
                <p className="text-gray-700">
                Notre mission est de faciliter l'accès aux soins de santé pour tous. Grâce à notre plateforme, vous pouvez facilement trouver des médecins spécialisés, consulter leurs disponibilités et prendre rendez-vous en ligne en quelques minutes. Nous nous engageons à offrir un service fiable et sécurisé pour que vous puissiez gérer vos besoins de santé avec sérénité. Que vous cherchiez un généraliste ou un spécialiste, notre réseau de professionnels de santé est là pour vous accompagner.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
