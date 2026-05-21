import { useState } from "react";

export default function Register() {
  const [enableAI, setEnableAI] = useState(true);
  const [enableScan, setEnableScan] = useState(true);
  const [enableNotif, setEnableNotif] = useState(true);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-[#111] rounded-3xl p-6 border border-cyan-500 shadow-2xl">

        {/* TITLE */}
        <h1 className="text-4xl md:text-6xl font-bold text-cyan-400 leading-tight">
          Technician Registration
        </h1>

        <p className="text-gray-400 mt-3 text-sm md:text-base">
          Create industrial technician account
        </p>

        {/* FORM */}
        <div className="mt-8 space-y-4">

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Technician Name"
              className="w-full bg-[#222] text-white p-4 rounded-2xl outline-none"
            />

            <input
              type="text"
              placeholder="Technician ID"
              className="w-full bg-[#222] text-white p-4 rounded-2xl outline-none"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="ESP32 Port"
              className="w-full bg-[#222] text-white p-4 rounded-2xl outline-none"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full bg-[#222] text-white p-4 rounded-2xl outline-none"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-[#222] text-white p-4 rounded-2xl outline-none"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full bg-[#222] text-white p-4 rounded-2xl outline-none"
            />
          </div>
        </div>

        {/* OPTIONS */}
        <div className="bg-[#1b1b1b] rounded-3xl p-5 mt-8">

          <h2 className="text-2xl font-bold text-white mb-6">
            Technician Options
          </h2>

          <div className="space-y-5">

            {/* AI */}
            <div className="flex items-center justify-between">
              <span className="text-white">
                Enable AI Monitoring
              </span>

              <button
                onClick={() => setEnableAI(!enableAI)}
                className={`px-5 py-2 rounded-xl font-bold ${
                  enableAI
                    ? "bg-green-500 text-black"
                    : "bg-gray-700 text-white"
                }`}
              >
                {enableAI ? "ON" : "OFF"}
              </button>
            </div>

            {/* SCAN */}
            <div className="flex items-center justify-between">
              <span className="text-white">
                Enable Auto Scan
              </span>

              <button
                onClick={() => setEnableScan(!enableScan)}
                className={`px-5 py-2 rounded-xl font-bold ${
                  enableScan
                    ? "bg-green-500 text-black"
                    : "bg-gray-700 text-white"
                }`}
              >
                {enableScan ? "ON" : "OFF"}
              </button>
            </div>

            {/* NOTIFICATIONS */}
            <div className="flex items-center justify-between">
              <span className="text-white">
                Enable Notifications
              </span>

              <button
                onClick={() => setEnableNotif(!enableNotif)}
                className={`px-5 py-2 rounded-xl font-bold ${
                  enableNotif
                    ? "bg-green-500 text-black"
                    : "bg-gray-700 text-white"
                }`}
              >
                {enableNotif ? "ON" : "OFF"}
              </button>
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <button className="w-full mt-8 bg-cyan-500 hover:bg-cyan-400 transition-all text-black font-bold py-4 rounded-2xl text-lg">
          CREATE TECHNICIAN ACCOUNT
        </button>
      </div>
    </div>
  );
}