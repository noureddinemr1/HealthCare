import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import NotFound from "./Notfound";
import ContactCard from "./ContactCard";

export default function Messages() {
  const [contacts, setContacts] = useState([]);
  const [authUser, setAuthUser] = useAuth();

  useEffect(() => {
    fetch('http://localhost:3000/getmessages')
      .then(res => res.json())
      .then(data => setContacts(data))
      .catch(error => console.error('Error fetching contacts:', error));
  }, []);



  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-teal-500">Contact Messages</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map((contact, index) => (
          <ContactCard key={index} contact={contact} />
        ))}
      </div>
    </div>
  );
}