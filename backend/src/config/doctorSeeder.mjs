import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import User from "../models/User.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../../.env") });

const DOCTORS = [
  {
    fullName: "Dr. Alexander Wright",
    email: "alexander.wright@saviours.com",
    password: "123456",
    role: "doctor",
    phone: "+1 (555) 019-2831",
    specialization: "Cardiologist",
    qualification: "MD, DM (Cardiology), FACC",
    experience: 16,
    profileImage: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
    isActive: true,
  },
  {
    fullName: "Dr. Elena Rostova",
    email: "elena.rostova@saviours.com",
    password: "123456",
    role: "doctor",
    phone: "+1 (555) 018-9942",
    specialization: "Neurologist",
    qualification: "MD, DNB (Neurology)",
    experience: 14,
    profileImage: "https://images.unsplash.com/photo-1594824813566-88855ce78347?auto=format&fit=crop&w=800&q=80",
    isActive: true,
  },
  {
    fullName: "Dr. Marcus Vance",
    email: "marcus.vance@saviours.com",
    password: "123456",
    role: "doctor",
    phone: "+1 (555) 017-3829",
    specialization: "Orthopedic",
    qualification: "MS (Orthopedics), MCh",
    experience: 18,
    profileImage: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80",
    isActive: true,
  },
  {
    fullName: "Dr. Sarah Jenkins",
    email: "sarah.jenkins@saviours.com",
    password: "123456",
    role: "doctor",
    phone: "+1 (555) 016-4410",
    specialization: "Pediatrician",
    qualification: "MBBS, MD (Pediatrics), DCH",
    experience: 12,
    profileImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
    isActive: true,
  },
  {
    fullName: "Dr. David Miller",
    email: "david.miller@saviours.com",
    password: "123456",
    role: "doctor",
    phone: "+1 (555) 015-8821",
    specialization: "Dermatologist",
    qualification: "MD (Dermatology, Venereology)",
    experience: 10,
    profileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
    isActive: true,
  },
  {
    fullName: "Dr. Priya Sharma",
    email: "priya.sharma@saviours.com",
    password: "123456",
    role: "doctor",
    phone: "+1 (555) 014-6632",
    specialization: "General Physician",
    qualification: "MBBS, MD (Internal Medicine)",
    experience: 15,
    profileImage: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80",
    isActive: true,
  },
  {
    fullName: "Dr. Robert Chen",
    email: "robert.chen@saviours.com",
    password: "123456",
    role: "doctor",
    phone: "+1 (555) 013-7743",
    specialization: "Ophthalmologist",
    qualification: "MS (Ophthalmology), FRCS",
    experience: 20,
    profileImage: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80",
    isActive: true,
  },
  {
    fullName: "Dr. Emily Watson",
    email: "emily.watson@saviours.com",
    password: "123456",
    role: "doctor",
    phone: "+1 (555) 012-9954",
    specialization: "Dentist",
    qualification: "BDS, MDS (Oral & Maxillofacial Surgery)",
    experience: 11,
    profileImage: "https://images.unsplash.com/photo-1594824813566-88855ce78347?auto=format&fit=crop&w=800&q=80",
    isActive: true,
  },
  {
    fullName: "Dr. James Wilson",
    email: "james.wilson@saviours.com",
    password: "123456",
    role: "doctor",
    phone: "+1 (555) 011-2265",
    specialization: "Pulmonologist",
    qualification: "MD (Pulmonary Medicine), FCCP",
    experience: 17,
    profileImage: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
    isActive: true,
  },
  {
    fullName: "Dr. Lisa Cuddy",
    email: "lisa.cuddy@saviours.com",
    password: "123456",
    role: "doctor",
    phone: "+1 (555) 010-3376",
    specialization: "General Physician",
    qualification: "MD (Internal Medicine), FACP",
    experience: 22,
    profileImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
    isActive: true,
  },
  {
    fullName: "Dr. Gregory House",
    email: "gregory.house@saviours.com",
    password: "123456",
    role: "doctor",
    phone: "+1 (555) 009-4487",
    specialization: "Neurologist",
    qualification: "MD (Nephrology & Infectious Disease)",
    experience: 25,
    profileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
    isActive: true,
  },
  {
    fullName: "Dr. Eric Foreman",
    email: "eric.foreman@saviours.com",
    password: "123456",
    role: "doctor",
    phone: "+1 (555) 008-5598",
    specialization: "Neurologist",
    qualification: "MD, Johns Hopkins Medical School",
    experience: 13,
    profileImage: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80",
    isActive: true,
  },
  {
    fullName: "Dr. Allison Cameron",
    email: "allison.cameron@saviours.com",
    password: "123456",
    role: "doctor",
    phone: "+1 (555) 007-6609",
    specialization: "Cardiologist",
    qualification: "MD (Immunology & Cardiology)",
    experience: 9,
    profileImage: "https://images.unsplash.com/photo-1594824813566-88855ce78347?auto=format&fit=crop&w=800&q=80",
    isActive: true,
  },
  {
    fullName: "Dr. Robert Chase",
    email: "robert.chase@saviours.com",
    password: "123456",
    role: "doctor",
    phone: "+1 (555) 006-7710",
    specialization: "Orthopedic",
    qualification: "MD, Intensive Care Specialist",
    experience: 14,
    profileImage: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80",
    isActive: true,
  },
  {
    fullName: "Dr. Chris Taub",
    email: "chris.taub@saviours.com",
    password: "123456",
    role: "doctor",
    phone: "+1 (555) 005-8821",
    specialization: "Dermatologist",
    qualification: "MD, Plastic & Cosmetic Surgery",
    experience: 19,
    profileImage: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
    isActive: true,
  },
];

export const seedDoctors = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri);
      console.log("Connected to MongoDB for Doctor Seeding...");
    }

    console.log("Seeding 15 doctor accounts with password '123456'...");

    for (const docData of DOCTORS) {
      let doctor = await User.findOne({ email: docData.email });

      if (doctor) {
        // Update existing doctor profile & reset password to 123456
        doctor.fullName = docData.fullName;
        doctor.phone = docData.phone;
        doctor.specialization = docData.specialization;
        doctor.qualification = docData.qualification;
        doctor.experience = docData.experience;
        doctor.profileImage = docData.profileImage;
        doctor.role = "doctor";
        doctor.isActive = true;
        doctor.password = docData.password; // Triggers pre('save') bcrypt hash
        await doctor.save();
        console.log(`Updated doctor: ${doctor.email}`);
      } else {
        // Create new doctor (User.create triggers pre('save') bcrypt hash)
        doctor = await User.create(docData);
        console.log(`Created doctor: ${doctor.email}`);
      }
    }

    // Also update any existing doctor accounts in DB that don't match the list above to set password to 123456 if needed
    const existingDoctors = await User.find({ role: "doctor" });
    for (const doc of existingDoctors) {
      doc.password = "123456";
      await doc.save();
    }

    console.log(`Successfully seeded ${DOCTORS.length} doctors! All doctor accounts set to password: 123456`);
  } catch (error) {
    console.error("Error seeding doctors:", error);
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log("Disconnected from MongoDB.");
    }
  }
};

// Execute if run directly via CLI
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedDoctors().then(() => process.exit(0));
}
