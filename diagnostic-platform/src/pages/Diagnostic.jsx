import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  connectESP32,
  readESP32Data
}
from '../services/esp32Service';


export default function Diagnostic() {

  const navigate = useNavigate();

  const [result, setResult] =
    useState('');

  const [testing, setTesting] =
    useState(false);


  const startDiagnostic =
    async () => {

    const connected =
      await connectESP32();

    if (!connected) {

      alert(
        'ESP32 connection failed'
      );

      return;
    }

    setTesting(true);

    setResult(
      'Waiting ESP32 data...'
    );


    readESP32Data((data) => {

      const randomResult =
        data.trim();

      setResult(randomResult);

      setTesting(false);


      const technicians =
        JSON.parse(
          localStorage.getItem(
            'technicians'
          )
        ) || [];


      const currentTechEmail =
        localStorage.getItem(
          'currentTechnician'
        );


      const updatedTechs =
        technicians.map((tech) => {

          if (
            tech.email === currentTechEmail
          ) {

            const updatedHistory =
              tech.history || [];

            updatedHistory.push({

              result: randomResult,

              date:
                new Date().toLocaleString()

            });

            return {

              ...tech,

              tests: tech.tests + 1,

              faults:
                randomResult.includes(
                  'SHORT'
                ) ||
                randomResult.includes(
                  'FAULT'
                ) ||
                randomResult.includes(
                  'NC'
                )
                  ? tech.faults + 1
                  : tech.faults,

              history: updatedHistory

            };

          }

          return tech;

        });


      localStorage.setItem(
        'technicians',
        JSON.stringify(updatedTechs)
      );

    });

  };


  return (

    <div className="min-h-screen bg-black text-white flex">

      <div className="w-72 bg-zinc-900 border-r border-zinc-800 p-6">

        <h1 className="text-3xl font-bold text-cyan-400 mb-12">
          Smart Diagnostic
        </h1>


        <div className="space-y-4">

          <button
            onClick={() =>
              navigate('/dashboard')
            }
            className="w-full text-left bg-zinc-800 p-4 rounded-2xl"
          >
            Dashboard
          </button>

          <button
            onClick={() =>
              navigate('/ai')
            }
            className="w-full text-left bg-zinc-800 p-4 rounded-2xl"
          >
            AI Assistant
          </button>

          <button
            onClick={() =>
              navigate('/analytics')
            }
            className="w-full text-left bg-zinc-800 p-4 rounded-2xl"
          >
            Analytics
          </button>

          <button className="w-full text-left bg-cyan-500 text-black font-bold p-4 rounded-2xl">
            Diagnostic
          </button>

          <button
            onClick={() =>
              navigate('/history')
            }
            className="w-full text-left bg-zinc-800 p-4 rounded-2xl"
          >
            History
          </button>

          <button
            onClick={() =>
              navigate('/settings')
            }
            className="w-full text-left bg-zinc-800 p-4 rounded-2xl"
          >
            Settings
          </button>

          <button
            onClick={() => {

              localStorage.removeItem(
                'isLoggedIn'
              );

              localStorage.removeItem(
                'currentTechnician'
              );

              navigate('/');

            }}
            className="w-full text-left bg-red-500 text-black font-bold p-4 rounded-2xl"
          >
            Logout
          </button>

        </div>

      </div>


      <div className="flex-1 p-8">

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-5xl font-bold mb-3">
              Diagnostic System
            </h1>

            <p className="text-zinc-400">
              Real-time ESP32 cable testing
            </p>

          </div>


          <div className={`px-6 py-3 rounded-2xl font-bold ${
            testing
              ? 'bg-yellow-500 text-black'
              : 'bg-green-500 text-black'
          }`}>
            {testing ? 'TESTING...' : 'READY'}
          </div>

        </div>


        <div className="bg-zinc-900 rounded-3xl p-10">

          <h2 className="text-3xl font-bold mb-8">
            ESP32 Diagnostic Console
          </h2>


          <div className="bg-black border border-zinc-700 rounded-3xl p-10 min-h-[250px] flex items-center justify-center mb-10">

            <p className="text-2xl text-cyan-400 text-center">
              {result || 'Press START to connect ESP32'}
            </p>

          </div>


          <button
            onClick={startDiagnostic}
            disabled={testing}
            className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-zinc-700 transition text-black font-bold py-6 rounded-3xl text-2xl"
          >
            START DIAGNOSTIC
          </button>

        </div>

      </div>

    </div>

  );
}
