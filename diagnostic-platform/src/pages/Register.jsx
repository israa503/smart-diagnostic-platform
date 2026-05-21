import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    technicianName: "",
    technicianId: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    const {
      technicianName,
      technicianId,
      email,
      password,
      confirmPassword,
    } = formData;

    if (
      !technicianName ||
      !technicianId ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // CHECK DUPLICATE EMAIL
      const emailQuery = query(
        collection(db, "technicians"),
        where("email", "==", email)
      );

      const emailSnapshot = await getDocs(emailQuery);

      if (!emailSnapshot.empty) {
        alert("Email already exists");
        setLoading(false);
        return;
      }

      // CHECK DUPLICATE TECHNICIAN ID
      const idQuery = query(
        collection(db, "technicians"),
        where("technicianId", "==", technicianId)
      );

      const idSnapshot = await getDocs(idQuery);

      if (!idSnapshot.empty) {
        alert("Technician ID already exists");
        setLoading(false);
        return;
      }

      // CREATE AUTH ACCOUNT
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // SAVE USER DATA
      await addDoc(collection(db, "technicians"), {
        uid: userCredential.user.uid,
        technicianName,
        technicianId,
        email,
        role: "technician",
        createdAt: new Date(),
      });

      alert("Account created successfully");

      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#111117] rounded-3xl p-6 md:p-10 shadow-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-cyan-400 leading-tight">
          Technician Registration
        </h1>

        <p className="text-gray-400 mt-3 mb-8">
          Create industrial technician account
        </p>

        <div className="space-y-5">
          <input
            type="text"
            name="technicianName"
            placeholder="Technician Name"
            value={formData.technicianName}
            onChange={handleChange}
            className="w-full bg-[#23232b] text-white rounded-2xl px-5 py-4 outline-none"
          />

          <input
            type="text"
            name="technicianId"
            placeholder="Technician ID"
            value={formData.technicianId}
            onChange={handleChange}
            className="w-full bg-[#23232b] text-white rounded-2xl px-5 py-4 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Technician Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-[#23232b] text-white rounded-2xl px-5 py-4 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-[#23232b] text-white rounded-2xl px-5 py-4 outline-none"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full bg-[#23232b] text-white rounded-2xl px-5 py-4 outline-none"
          />

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-4 rounded-2xl transition-all"
          >
            {loading ? "CREATING ACCOUNT..." : "CREATE TECHNICIAN ACCOUNT"}
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full bg-[#23232b] text-white py-4 rounded-2xl"
          >
            BACK TO LOGIN
          </button>
        </div>
      </div>
    </div>
  );
}