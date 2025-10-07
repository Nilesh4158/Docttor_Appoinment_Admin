// Create Ankita doctor account
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('DB connected');

    const doctorSchema = new mongoose.Schema({
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      image: { type: String, required: true },
      speciality: { type: String, required: true },
      degree: { type: String, required: true },
      experience: { type: String, required: true },
      about: { type: String, required: true },
      available: { type: Boolean, default: true },
      fees: { type: Number, required: true },
      address: { type: Object, required: true },
      date: { type: Number, required: true },
      slots_booked: { type: Object, default: {} },
      status: { type: String, default: 'approved' }
    });

    const Doctor = mongoose.model('doctor', doctorSchema);

    await Doctor.deleteOne({ email: 'ankita@gmail.com' });
    console.log('Removed existing Ankita if exists');

    const hashed = await bcrypt.hash('ankita123', 10);
    const doc = await Doctor.create({
      name: 'Dr. Ankita',
      email: 'ankita@gmail.com',
      password: hashed,
      image: 'https://via.placeholder.com/150/ankita.jpg',
      speciality: 'Dermatology',
      degree: 'MBBS, MD',
      experience: '7 Years',
      about: 'Dermatology specialist',
      available: true,
      fees: 80,
      address: { line1: 'Main Road', line2: 'Mumbai' },
      date: Date.now(),
      slots_booked: {},
      status: 'approved'
    });

    console.log('Created Ankita:', doc._id.toString());
    process.exit(0);
  } catch (e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
};

run();
