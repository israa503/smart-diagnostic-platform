import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {

  const navigate = useNavigate();

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


  const technician =
    technicians.find(
      (tech) =>
        tech.email === currentTechEmail
    );


  const [technicianName, setTechnicianName] =
    useState(
      technician?.name || ''
    );


  const [language, setLanguage] =
    useState(
      localStorage.getItem(
        'language'
      ) || 'en'
    );


  const [newPassword, setNewPassword] =
    useState('');


  const [autoScan, setAutoScan] =
    useState(
      JSON.parse(
        localStorage.getItem(
          'autoScan'
        )
      ) ?? true
    );


  const [aiMonitoring, setAiMonitoring] =
    useState(
      JSON.parse(
        localStorage.getItem(
          'aiMonitoring'
        )
      ) ?? true
    );


  const [notifications, setNotifications] =
    useState(
      JSON.parse(
        localStorage.getItem(
          'notifications'
        )
      ) ?? true
    );


  const handleLogout = () => {

    localStorage.removeItem(
      'isLoggedIn'
    );

    localStorage.removeItem(
      'isFactoryAdmin'
    );

    localStorage.removeItem(
      'currentTechnician'
    );

    navigate('/');

  };


  const saveSettings = () => {

    localStorage.setItem(
      'autoScan',
      JSON.stringify(autoScan)
    );

    localStorage.setItem(
      'aiMonitoring',
      JSON.stringify(aiMonitoring)
    );

    localStorage.setItem(
      'notifications',
      JSON.stringify(notifications)
    );

    localStorage.setItem(
      'language',
      language
    );


    const updatedTechnicians =
      technicians.map((tech) => {

        if (
          tech.email ===
          currentTechEmail
        ) {

          return {

            ...tech,
            name: technicianName,
            password:
              newPassword ||
              tech.password

          };
        }

        return tech;

      });


    localStorage.setItem(
      'technicians',
      JSON.stringify(
        updatedTechnicians
      )
    );


    alert(
      'Settings saved successfully'
    );

  };


  return (

    <div className="min-h-screen bg-black text-white flex">

      {/* SIDEBAR */}

      <div className="w-72 bg-zinc-900 border-r border-zinc-800 p-6 overflow-y-auto hidden md:block">

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

          <button
            onClick={() =>
              navigate('/diagnostic')
            }
            className="w-full text-left bg-zinc-800 p-4 rounded-2xl"
          >
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

          <button className="w-full text-left bg-cyan-500 text-black font-bold p-4 rounded-2xl">
            Settings
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white font-bold p-4 rounded-2xl"
          >
            LOGOUT
          </button>

        </div>

      </div>


      {/* MAIN */}

      <div className="flex-1 p-4 md:p-8 overflow-y-auto">

        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-10">

          <div>

            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Settings
            </h1>

            <p className="text-zinc-400">
              Configure diagnostic system
            </p>

          </div>


          <div className="bg-cyan-500/20 border border-cyan-500 text-cyan-400 px-6 py-3 rounded-2xl font-bold text-center">
            SYSTEM CONFIG
          </div>

        </div>


        <div className="space-y-6">

          {/* TECHNICIAN NAME */}

          <div className="bg-zinc-900 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-4">
              Technician Name
            </h2>

            <input
              value={technicianName}
              onChange={(e) =>
                setTechnicianName(
                  e.target.value
                )
              }
              className="w-full bg-zinc-800 p-5 rounded-2xl outline-none"
              placeholder="Technician Name"
            />

          </div>


          {/* LANGUAGE */}

          <div className="bg-zinc-900 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-4">
              Language
            </h2>

            <select
              value={language}
              onChange={(e) =>
                setLanguage(
                  e.target.value
                )
              }
              className="w-full bg-zinc-800 p-5 rounded-2xl outline-none"
            >

              <option value="en">
                English
              </option>

              <option value="fr">
                French
              </option>

              <option value="ar">
                Arabic
              </option>

            </select>

          </div>


          {/* CHANGE PASSWORD */}

          <div className="bg-zinc-900 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-4">
              Change Password
            </h2>

            <input
              type="password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }
              className="w-full bg-zinc-800 p-5 rounded-2xl outline-none"
              placeholder="New Password"
            />

          </div>


          {/* AUTO SCAN */}

          <div className="bg-zinc-900 rounded-3xl p-8 flex justify-between items-center">

            <div>

              <h2 className="text-2xl font-bold">
                Auto Scan
              </h2>

              <p className="text-zinc-400 mt-2">
                Automatic cable detection
              </p>

            </div>

            <button
              onClick={() =>
                setAutoScan(!autoScan)
              }
              className={`px-6 py-3 rounded-2xl font-bold ${
                autoScan
                  ? 'bg-green-500 text-black'
                  : 'bg-red-500 text-black'
              }`}
            >
              {autoScan ? 'ON' : 'OFF'}
            </button>

          </div>


          {/* AI MONITORING */}

          <div className="bg-zinc-900 rounded-3xl p-8 flex justify-between items-center">

            <div>

              <h2 className="text-2xl font-bold">
                AI Monitoring
              </h2>

              <p className="text-zinc-400 mt-2">
                Enable AI diagnostics
              </p>

            </div>

            <button
              onClick={() =>
                setAiMonitoring(
                  !aiMonitoring
                )
              }
              className={`px-6 py-3 rounded-2xl font-bold ${
                aiMonitoring
                  ? 'bg-green-500 text-black'
                  : 'bg-red-500 text-black'
              }`}
            >
              {aiMonitoring ? 'ON' : 'OFF'}
            </button>

          </div>


          {/* NOTIFICATIONS */}

          <div className="bg-zinc-900 rounded-3xl p-8 flex justify-between items-center">

            <div>

              <h2 className="text-2xl font-bold">
                Notifications
              </h2>

              <p className="text-zinc-400 mt-2">
                Receive alerts
              </p>

            </div>

            <button
              onClick={() =>
                setNotifications(
                  !notifications
                )
              }
              className={`px-6 py-3 rounded-2xl font-bold ${
                notifications
                  ? 'bg-green-500 text-black'
                  : 'bg-red-500 text-black'
              }`}
            >
              {notifications ? 'ON' : 'OFF'}
            </button>

          </div>


          {/* SAVE */}

          <button
            onClick={saveSettings}
            className="w-full bg-cyan-500 hover:bg-cyan-400 transition text-black font-bold py-5 rounded-3xl text-xl"
          >
            SAVE SETTINGS
          </button>

        </div>

      </div>

    </div>

  );
}