import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FactorySettings() {

  const navigate = useNavigate();

  const [factoryName, setFactoryName] =
    useState(
      localStorage.getItem(
        'factoryName'
      ) || 'COFAT'
    );

  const [adminCode, setAdminCode] =
    useState(
      localStorage.getItem(
        'factoryAdminCode'
      ) || '1234'
    );

  const [notifications, setNotifications] =
    useState(
      JSON.parse(
        localStorage.getItem(
          'factoryNotifications'
        )
      ) ?? true
    );

  const [aiMonitoring, setAiMonitoring] =
    useState(
      JSON.parse(
        localStorage.getItem(
          'factoryAiMonitoring'
        )
      ) ?? true
    );

  const [autoScan, setAutoScan] =
    useState(
      JSON.parse(
        localStorage.getItem(
          'factoryAutoScan'
        )
      ) ?? true
    );


  const saveSettings = () => {

    localStorage.setItem(
      'factoryName',
      factoryName
    );

    localStorage.setItem(
      'factoryAdminCode',
      adminCode
    );

    localStorage.setItem(
      'factoryNotifications',
      JSON.stringify(notifications)
    );

    localStorage.setItem(
      'factoryAiMonitoring',
      JSON.stringify(aiMonitoring)
    );

    localStorage.setItem(
      'factoryAutoScan',
      JSON.stringify(autoScan)
    );

    alert(
      'Factory settings updated successfully'
    );

  };


  return (

    <div className="min-h-screen bg-black text-white flex">

      <div className="w-80 bg-zinc-900 p-6 overflow-y-auto">

        <h1 className="text-3xl font-bold text-cyan-400 mb-12">
          Factory Admin
        </h1>


        <div className="space-y-4">

          <button
            onClick={() =>
              navigate('/factory-admin')
            }
            className="w-full text-left bg-zinc-800 p-4 rounded-2xl"
          >
            Technician Management
          </button>

          <button
            onClick={() =>
              navigate('/factory-analytics')
            }
            className="w-full text-left bg-zinc-800 p-4 rounded-2xl"
          >
            Global Analytics
          </button>

          <button
            onClick={() =>
              navigate('/factory-ai')
            }
            className="w-full text-left bg-zinc-800 p-4 rounded-2xl"
          >
            Factory AI Assistant
          </button>

          <button className="w-full text-left bg-cyan-500 text-black font-bold p-4 rounded-2xl">
            Factory Settings
          </button>

          <button
            onClick={() => {

              localStorage.removeItem(
                'isFactoryAdmin'
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
              Factory Settings
            </h1>

            <p className="text-zinc-400">
              Configure factory management system
            </p>

          </div>


          <div className="bg-cyan-500/20 border border-cyan-500 text-cyan-400 px-6 py-3 rounded-2xl font-bold">
            FACTORY CONFIG
          </div>

        </div>


        <div className="space-y-6">

          <div className="bg-zinc-900 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-4">
              Factory Name
            </h2>

            <input
              value={factoryName}
              onChange={(e) =>
                setFactoryName(
                  e.target.value
                )
              }
              className="w-full bg-zinc-800 p-5 rounded-2xl outline-none"
            />

          </div>


          <div className="bg-zinc-900 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-4">
              Factory Admin Code
            </h2>

            <input
              value={adminCode}
              onChange={(e) =>
                setAdminCode(
                  e.target.value
                )
              }
              className="w-full bg-zinc-800 p-5 rounded-2xl outline-none"
            />

          </div>


          <div className="bg-zinc-900 rounded-3xl p-8 flex justify-between items-center">

            <div>

              <h2 className="text-2xl font-bold">
                Notifications
              </h2>

              <p className="text-zinc-400 mt-2">
                Receive factory alerts
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


          <div className="bg-zinc-900 rounded-3xl p-8 flex justify-between items-center">

            <div>

              <h2 className="text-2xl font-bold">
                AI Monitoring
              </h2>

              <p className="text-zinc-400 mt-2">
                Enable factory AI supervision
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
                Auto Scan
              </h2>

              <p className="text-zinc-400 mt-2">
                Automatic diagnostic monitoring
              </p>

            </div>

            <button
              onClick={() =>
                setAutoScan(
                  !autoScan
                )
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


          <button
            onClick={saveSettings}
            className="w-full bg-cyan-500 hover:bg-cyan-400 transition text-black font-bold py-5 rounded-3xl text-xl"
          >
            SAVE FACTORY SETTINGS
          </button>

        </div>

      </div>

    </div>

  );
}