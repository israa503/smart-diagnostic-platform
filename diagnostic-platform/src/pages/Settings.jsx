import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {

  const navigate = useNavigate();

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

    alert('Settings saved successfully');

  };


  return (

    <div className="min-h-screen bg-black text-white flex">

      <div className="w-72 bg-zinc-900 border-r border-zinc-800 p-6 overflow-y-auto">

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


      <div className="flex-1 p-8 overflow-y-auto">

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-5xl font-bold mb-3">
              Settings
            </h1>

            <p className="text-zinc-400">
              Configure diagnostic system
            </p>

          </div>


          <div className="bg-cyan-500/20 border border-cyan-500 text-cyan-400 px-6 py-3 rounded-2xl font-bold">
            SYSTEM CONFIG
          </div>

        </div>


        <div className="space-y-6">

          <div className="bg-zinc-900 rounded-3xl p-8 flex justify-between items-center">

            <div>

              <h2 className="text-2xl font-bold">
                Auto Scan
              </h2>

              <p className="text-zinc-400 mt-2">
                Automatic cable detection and testing
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


          <div className="bg-zinc-900 rounded-3xl p-8 flex justify-between items-center">

            <div>

              <h2 className="text-2xl font-bold">
                AI Monitoring
              </h2>

              <p className="text-zinc-400 mt-2">
                Enable AI diagnostic assistance
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


          <div className="bg-zinc-900 rounded-3xl p-8 flex justify-between items-center">

            <div>

              <h2 className="text-2xl font-bold">
                Notifications
              </h2>

              <p className="text-zinc-400 mt-2">
                Receive diagnostic alerts
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