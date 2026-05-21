import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {

  const navigate = useNavigate();

  const [factoryName, setFactoryName] =
    useState('');

  const [factoryID, setFactoryID] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [confirmPassword, setConfirmPassword] =
    useState('');


  const createAccount = () => {

    if (
      !factoryName ||
      !factoryID ||
      !email ||
      !password ||
      !confirmPassword
    ) {

      alert('Fill all fields');
      return;
    }

    if (password !== confirmPassword) {

      alert('Passwords do not match');
      return;
    }

    const technicianData = {

      name: factoryName,
      factoryID,
      email,
      password,
      tests: 0,
      faults: 0,
      status: 'ACTIVE'

    };

    const existingTechs =
      JSON.parse(
        localStorage.getItem('technicians')
      ) || [];

    existingTechs.push(
      technicianData
    );

    localStorage.setItem(
      'technicians',
      JSON.stringify(existingTechs)
    );

    alert(
      'Technician account created successfully'
    );

    navigate('/');
  };


  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">

      <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-10">

        <div className="flex justify-between items-start mb-10">

          <div>

            <h1 className="text-5xl font-bold text-cyan-400 mb-3">
              Technician Registration
            </h1>

            <p className="text-zinc-400">
              Create industrial technician account
            </p>

          </div>


          <div className="bg-cyan-500/20 border border-cyan-500 text-cyan-400 px-5 py-3 rounded-2xl font-bold">
            NEW TECHNICIAN
          </div>

        </div>


        <div className="grid grid-cols-2 gap-6">

          <input
            value={factoryName}
            onChange={(e) =>
              setFactoryName(e.target.value)
            }
            placeholder="Technician Name"
            className="bg-zinc-800 p-5 rounded-2xl outline-none"
          />

          <input
            value={factoryID}
            onChange={(e) =>
              setFactoryID(e.target.value)
            }
            placeholder="Technician ID"
            className="bg-zinc-800 p-5 rounded-2xl outline-none"
          />

          <input
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Technician Email"
            className="bg-zinc-800 p-5 rounded-2xl outline-none"
          />

          <input
            placeholder="ESP32 COM Port"
            defaultValue="COM6"
            className="bg-zinc-800 p-5 rounded-2xl outline-none"
          />

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Password"
            className="bg-zinc-800 p-5 rounded-2xl outline-none"
          />

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            placeholder="Confirm Password"
            className="bg-zinc-800 p-5 rounded-2xl outline-none"
          />

        </div>


        <div className="bg-zinc-800 rounded-3xl p-6 mt-8">

          <h3 className="text-2xl font-bold mb-5">
            Technician Options
          </h3>

          <div className="space-y-4">

            <div className="flex justify-between items-center">

              <p>Enable AI Monitoring</p>

              <div className="bg-green-500 text-black px-4 py-2 rounded-xl font-bold">
                ON
              </div>

            </div>


            <div className="flex justify-between items-center">

              <p>Enable Auto Scan</p>

              <div className="bg-green-500 text-black px-4 py-2 rounded-xl font-bold">
                ON
              </div>

            </div>


            <div className="flex justify-between items-center">

              <p>Enable Notifications</p>

              <div className="bg-green-500 text-black px-4 py-2 rounded-xl font-bold">
                ON
              </div>

            </div>

          </div>

        </div>


        <button
          onClick={createAccount}
          className="w-full bg-cyan-500 hover:bg-cyan-400 transition text-black font-bold py-5 rounded-2xl mt-10"
        >
          CREATE TECHNICIAN ACCOUNT
        </button>


        <button
          onClick={() => navigate('/')}
          className="w-full bg-zinc-800 hover:bg-zinc-700 transition py-5 rounded-2xl mt-5"
        >
          BACK TO LOGIN
        </button>

      </div>

    </div>
  );
}