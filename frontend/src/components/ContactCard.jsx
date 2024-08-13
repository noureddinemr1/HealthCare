export default function ContactCard({ contact }) {
    return (
      <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg mb-6 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 opacity-10 pointer-events-none"></div>
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-teal-700">{contact.name}</h2>
          <span className="text-sm text-gray-500 italic">{contact.email}</span>
        </div>
        
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-teal-600">Subject:</h3>
          <p className="text-gray-800 mt-1">{contact.object}</p>
        </div>
        
        <div className="flex flex-col mt-3">
          <h3 className="text-lg font-semibold text-teal-600">Message:</h3>
          <p className="text-gray-800 mt-1 overflow-auto max-h-40 scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-gray-200 pr-2">
            {contact.message}
          </p>
        </div>
        
        
      </div>
    );
  }