import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import AuthProvider from './context/AuthProvider';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Notfound from './components/Notfound';
import About from './components/About';
import Search from './components/Search';
import EditProfile from './components/EditProfile';
import Appointment from './components/Appointments';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthProvider';
import  Messages from './components/Messages';

function RequireAuth({ children }) {
  const [authUser] = useAuth();

  if (!authUser) {
    return <Login />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/" element={<RequireAuth><Navbar /></RequireAuth>} >
            <Route index element={<Home />} />
            <Route path="/editez-profile" element={<EditProfile />} />
            <Route path="/rendez-vous" element={<Appointment />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/apropos" element={<About />} />
            <Route path="/medecins" element={<Search />} />
          </Route>
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
