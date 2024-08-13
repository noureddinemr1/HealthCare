import React from 'react';

export default function UserAppointmentCard({ appointment }) {
  return (
    <div className="bg-gradient-to-br from-teal-300 via-teal-200 to-teal-400 rounded-2xl shadow-xl dark:bg-gray-800 border border-transparent dark:border-gray-700 p-8 max-w-sm mx-auto transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-br hover:from-teal-300 hover:via-teal-300 hover:to-teal-400">
      <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">
        Rendez-vous avec Dr. {appointment.doctorName}
      </h2>
      <div className="space-y-4">
        <div className="flex justify-between text-base text-gray-800 dark:text-gray-200">
          <span className="font-semibold">Date:</span>
          <span>{appointment.date.substring(0,10)}</span>
        </div>
        <div className="flex justify-between text-base text-gray-800 dark:text-gray-200">
          <span className="font-semibold">Email:</span>
          <span>{appointment.doctorEmail}</span>
        </div>
        <div className="flex justify-between text-base text-gray-800 dark:text-gray-200">
          <span className="font-semibold">Téléphone:</span>
          <span>{appointment.doctorPhone}</span>
        </div>
        <div className="flex justify-between text-base text-gray-800 dark:text-gray-200">
          <span className="font-semibold">Spécialité:</span>
          <span>{appointment.doctorSpecialty || 'N/A'}</span>
        </div>
        <div className="flex justify-between text-base text-gray-800 dark:text-gray-200">
          <span className="font-semibold">État:</span>
          <span>{appointment.doctorState || 'N/A'}</span>
        </div>
        <div className="flex justify-between text-base text-gray-800 dark:text-gray-200">
          <span className="font-semibold">Adresse:</span>
          <span>{appointment.doctorAdress || 'N/A'}</span>
        </div>
        <div className="flex justify-between text-base text-gray-800 dark:text-gray-200">
          <span className="font-semibold">Tarif:</span>
          <span>{appointment.doctorPrice ? `TND ${appointment.doctorPrice.toFixed(2)}` : 'N/A'}</span>
        </div>
        {appointment.message && (
          <div className="mt-6 text-base text-gray-800 dark:text-gray-300">
            <span className="font-bold">Message:</span>
            <p className="mt-2 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-inner">
              {appointment.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
