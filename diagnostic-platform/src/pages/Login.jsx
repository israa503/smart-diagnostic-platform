import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      if (isAdmin) {
        navigate("/factory-admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      alert("Invalid email or password");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-[#11131d] rounded-3xl p-6 md:p-12">

        <h1 className="text-5xl md:text-7xl font-bold text-cyan-400 leading-none">
          Smart Diagnostic
        </h1>

        <p className="text-gray-400 mt-4 text-lg">
          Industrial AI Diagnostic Platform
        </p>

        <div className="mt-10 space-y-6">

          <input
            type="email"
            placeholder="Technician Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#23232b] text-white p-5 rounded-2xl outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#23232b] text-white p-5 rounded-2xl outline-none"
          />

          <div className="w-full bg-[#23232b] text-white p-5 rounded-2xl flex justify-between items-center">
            <span>I am Factory Admin</span>

            <input
              type="checkbox"
              checked={isAdmin}
              onChange={() => setIsAdmin(!isAdmin)}
              className="w-6 h-6"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-5 rounded-2xl"
          >
            LOGIN
          </button>

          <button
            onClick={() => navigate("/register")}
            className="w-full bg-[#23232b] text-white py-5 rounded-2xl"
          >
            CREATE TECHNICIAN ACCOUNT
          </button>

        </div>
      </div>
    </div>
  );
}