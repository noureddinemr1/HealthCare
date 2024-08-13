import React from 'react';

export default function DoctorAppointmentCard({ appointment }) {
  return (
    appointment.userEmail ? (
      <div className="bg-gradient-to-br from-teal-300 via-teal-200 to-teal-400 rounded-2xl shadow-xl dark:bg-gray-800 border border-transparent dark:border-gray-700 p-8 max-w-sm mx-auto transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-br hover:from-teal-300 hover:via-teal-300 hover:to-teal-400">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">
          Rendez-vous avec {appointment.userName}
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between text-base text-gray-800 dark:text-gray-200">
            <span className="font-semibold">Date:</span>
            <span>{appointment.date.substring(0,10)}</span>
          </div>
          <div className="flex justify-between text-base text-gray-800 dark:text-gray-200">
            <span className="font-semibold">Email:</span>
            <span>{appointment.userEmail}</span>
          </div>
          <div className="flex justify-between text-base text-gray-800 dark:text-gray-200">
            <span className="font-semibold">Téléphone:</span>
            <span>{appointment.userPhone}</span>
          </div>
          {appointment.message && (
            <div className="mt-6 text-base text-gray-800 dark:text-gray-300">
              <span className="font-bold">Message:</span>
              <p className="mt-2   p-4 rounded-lg shadow-inner">
                {appointment.message}
              </p>
            </div>
          )}
        </div>
      </div>
    ) : (
      <div className="bg-gradient-to-br from-red-300 via-red-200 to-red-400 rounded-2xl shadow-xl dark:bg-gray-800 border border-transparent dark:border-gray-700 p-8 max-w-sm mx-auto transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-br hover:from-red-300 hover:via-red-300 hover:to-red-400">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">
          Date réservée
        </h2>
        <div className="flex justify-between text-base text-gray-800 dark:text-gray-200">
          <span>Date:</span>
          <span>{appointment.date.substring(0,10)}</span>
        </div>
      </div>
    )
  );
}
