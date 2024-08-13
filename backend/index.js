import express from 'express';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';


const app = express();
const port = 4000;
const uri = 'mongodb://localhost:27017/Health'; 

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});


const doctorSchema = new mongoose.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, default: '' },
    specialty: { type: String, default: '' },
    state: { type: String, default: '' },
    adress: { type: String, default: '' },
    price: { type: Number, default: 0 },
});

const Doctor = mongoose.model('doctors', doctorSchema);
const PublicDoctor = mongoose.model('public_doctors', doctorSchema);
const appointmentSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    doctorName: { type: String, required: true },
    userEmail: { type: String, required: true },
    doctorEmail: { type: String, required: true },
    userPhone: { type: String, required: true },
    doctorPhone: { type: String, required: true },
    doctorSpecialty: { type: String, default: '' },
    doctorState: { type: String, default: '' },
    doctorAdress: { type: String, default: '' },
    doctorPrice: { type: Number, default: 0 },
    date: { type: Date, required: true },
    message: { type: String, default: '' } 
});

const Appointment = mongoose.model('appointments', appointmentSchema);
const appointment_RSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    doctorEmail: { type: String, required: true },
    date: { type: Date, required: true },
    
});

const appointment_R = mongoose.model('dates', appointment_RSchema);
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: ''
    },
});

const User = mongoose.model('users', userSchema);

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    object: String,
    message: String,
});

const Contact = mongoose.model('contacts', contactSchema);

app.use(bodyParser.json());


app.get('/doctors', async (req, res) => {
    try {
        const doctors = await PublicDoctor.find();
        res.json(doctors);
    } catch (e) {
        res.status(500).json({ message: 'Error fetching doctors' });
    }
});
app.get('/public_doctors/:email', async (req, res) => {
    try {
        const doctors = await PublicDoctor.find({ email: req.params.email });
        if (doctors.length > 0) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    } catch (e) {
        res.status(500).json({ message: 'Error fetching doctors' });
    }
});

app.put('/doctors/:email', async (req, res) => {
    try {
        const updateData = req.body;
        if(updateData.password ===""){
            delete updateData.password;
        }
        else{
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(updateData.password, salt);
        }

        const updatedDoctor = await Doctor.findOneAndUpdate({ email: req.params.email }, updateData, { new: true });

        await PublicDoctor.findOneAndUpdate({ email: req.params.email }, updateData, { new: true });

        res.json(updatedDoctor);
    } catch (error) {
        res.status(500).json({ message: 'Error updating doctor profile', error: error.message });
    }
});

app.post('/publish_doctor', async (req, res) => {
    try {
        const doctorData = req.body;

        // Log incoming data for debugging
        console.log('Received doctorData:', doctorData);

        // Find the doctor by username (or any unique field)
        const doctor = await Doctor.findOne({ username: doctorData.username });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Create a new PublicDoctor entry with the incoming data
        const publicDoctor = new PublicDoctor({
            username: doctorData.username,
            name: doctorData.name,
            email: doctorData.email,
            phone: doctorData.phone,
            adress: doctorData.adress,
            specialty: doctorData.specialty,
            image: doctorData.image,
            state: doctorData.state,
            price: doctorData.price,
            password: doctor.password,  // Reuse the existing hashed password
        });

        // Save the new public doctor profile
        await publicDoctor.save();

        // Respond with success
        res.status(200).json({ message: 'Doctor profile published successfully', publicDoctor });
    } catch (error) {
        // Log the error for debugging
        console.error('Error in /publish_doctor route:', error);

        // Respond with a 500 status and error message
        res.status(500).json({ message: 'Error publishing doctor profile', error: error.message });
    }
});


app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if(updateData.password ===""){
            delete updateData.password;
        }
        else{
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(updateData.password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user profile', error: error.message });
    }
});

app.post('/register', async (req, res) => {
    try {
        const { username, name, email, phone, password, role } = req.body;

        const existingUser = await User.findOne({ username });
        const existingDoctor = await Doctor.findOne({ username });
        
        if (existingUser || existingDoctor) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        if (role === "médecin") {
            const createdDoctor = new Doctor({
                username,
                name,
                email,
                phone,
                password: hashedPassword,
            });
            await createdDoctor.save();
            return res.status(200).json({
                message: "Médecin créé avec succès",
                user: {
                    _id: createdDoctor._id,
                    username: createdDoctor.username,
                    name: createdDoctor.name,
                    email: createdDoctor.email,
                    phone: createdDoctor.phone,
                    role: "médecin"
                },
            });
        } else {
            const createdUser = new User({
                username,
                name,
                email,
                phone,
                password: hashedPassword,
            });
            await createdUser.save();
            return res.status(200).json({
                message: "Utilisateur créé avec succès",
                user: {
                    _id: createdUser._id,
                    username: createdUser.username,
                    name: createdUser.name,
                    email: createdUser.email,
                    phone: createdUser.phone,
                    role: "citoyen"
                },
            });
        }
    } catch (e) {
        res.status(500).send("Internal server error");
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        const doctor = await Doctor.findOne({ username });

        const currentUser = user || doctor;

        if (!currentUser) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, currentUser.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const role = user ? "citoyen" : "médecin";
        if(role ==="citoyen"){
        res.status(200).json({
            message: "Login successful",
            user: {
                _id: currentUser._id,
                username: currentUser.username,
                name: currentUser.name,
                email: currentUser.email,
                phone: currentUser.phone,
                role: role,
                image :currentUser.image,

            },
        });}
        else{
            res.status(200).json({
                message: "Login successful",
                user: {
                    _id: currentUser._id,
                    username: currentUser.username,
                    name: currentUser.name,
                    email: currentUser.email,
                    phone: currentUser.phone,
                    role: role,
                    image :currentUser.image,
                    specialty:currentUser.specialty,
                    state : currentUser.state,
                    price : currentUser.price,
                    adress : currentUser.adress,
    
                },});
        }
    } catch (e) {
        res.status(500).send("Internal server error");
    }
});

app.post('/contact', async (req, res) => {
    try {
        const { name, email, object, message } = req.body;
        const createdContact = new Contact({
            name,
            email,
            object,
            message,
        });
        await createdContact.save();
        res.status(200).json("Contact form submitted successfully");
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
});
app.get('/getmessages', async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.json(contacts);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  



app.get('/appointments/doctor/:email', async (req, res) => {
    try {
        const currentDate = new Date();

        // Find appointments where the date is equal to or greater than the current date
        const appointments = await Appointment.find({ 
            doctorEmail: req.params.email,
            date: { $gte: currentDate } // Include current and future appointments
        });

        const appointments_R = await appointment_R.find({ 
            doctorEmail: req.params.email,
            date: { $gte: currentDate } // Include current and future appointments
        });

        // Combine the results
        const appointments_M = [...appointments, ...appointments_R];
        
        res.status(200).json(appointments_M);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments' });
    }
});
app.get('/appointments/user/:email', async (req, res) => {
    try {
        const currentDate = new Date();

        // Find appointments where the date is equal to or greater than the current date
        const appointments = await Appointment.find({ 
            userEmail: req.params.email,
            date: { $gte: currentDate } // Include current and future appointments
        });
        
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments' });
    }
});


// In your Express server file
app.get('/appointments/check-date', async (req, res) => {
    const { doctorEmail, date } = req.query;
    try {
      // Convert date to ISO format if necessary
      const formattedDate = new Date(date).toISOString().split('T')[0];
      
      const existingAppointment = await Appointment.findOne({ doctorEmail, date: formattedDate });
      const existingAppointment_R = await appointment_R.findOne({ doctorEmail, date: formattedDate });
      
      if (existingAppointment || existingAppointment_R) {
        return res.status(400).json({ message: 'This date is already booked. Please choose another date.' });
      }
    
      res.status(200).json({ message: 'Date is available.' });
    } catch (error) {
      console.error('Error checking appointment date:', error); // Log the error
      res.status(500).json({ message: 'Error checking appointment date.' });
    }
  });
  
  app.post('/appointments', async (req, res) => {
    const {
      userName, doctorName, userEmail, doctorEmail,
      userPhone, doctorPhone, doctorSpecialty, doctorState,
      doctorAdress, doctorPrice, date, message
    } = req.body;
    try {
      const formattedDate = new Date(date).toISOString().split('T')[0];
      
      const newAppointment = new Appointment({
        userName, doctorName, userEmail, doctorEmail,
        userPhone, doctorPhone, doctorSpecialty, doctorState,
        doctorAdress, doctorPrice, date: formattedDate, message
      });
    
      await newAppointment.save();
    
      res.status(201).json({ message: 'Appointment created successfully.', appointment: newAppointment });
    } catch (error) {
      console.error('Error creating appointment:', error); // Log the error
      res.status(500).json({ message: 'Error creating appointment.' });
    }
  });
  
  app.post('/appointments/add', async (req, res) => {
    try {           
      const { userName, doctorEmail, date } = req.body;
  
      const newAppointment = new appointment_R({
        userName,
        doctorEmail,
        date,
      });
  
      await newAppointment.save();
      res.status(201).send({ message: 'Appointment created successfully' });
      
    } catch (error) {
      res.status(500).send({ message: 'An error occurred while creating the appointment', error });
      console.log(error);
    }
  });
  


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
