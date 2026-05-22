import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AIAssistant() {

  const navigate = useNavigate();

  const technicians =
    JSON.parse(
      localStorage.getItem('technicians')
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

  const history =
    technician?.history || [];


  const [messages, setMessages] =
    useState([
      {
        role: 'assistant',
        text:
          'Industrial AI Diagnostic Assistant Online.'
      }
    ]);

  const [input, setInput] =
    useState('');


  const industrialKeywords = [

    'motor',
    'sensor',
    'relay',
    'voltage',
    'current',
    'short circuit',
    'plc',
    'esp32',
    'machine',
    'factory',
    'temperature',
    'diagnostic',
    'fault',
    'alarm',
    'electric',
    'industrial',
    'automation',
    'wiring',
    'contactor',
    'breaker',
    'pump',
    'compressor',
    'bearing',
    'vibration',
    'power',
    'circuit',
    'pcb',
    'arduino',
    'resistor',
    'transistor',
    'fuse',
    'maintenance'

  ];


  const handleLogout = () => {

    localStorage.removeItem(
      'isLoggedIn'
    );

    localStorage.removeItem(
      'isFactoryAdmin'
    );

    navigate('/');

  };


  const generateAIResponse = (
    message
  ) => {

    const lowerMessage =
      message.toLowerCase();


    const isIndustrialQuestion =
      industrialKeywords.some(
        (keyword) =>
          lowerMessage.includes(keyword)
      );


    if (!isIndustrialQuestion) {

      return `
I am an Industrial AI Diagnostic Assistant.

I only answer questions related to:

• industrial systems
• electrical diagnostics
• PLC / ESP32 systems
• machinery
• automation
• maintenance
• sensors
• electrical faults
• factory equipment
`;
    }


    if (
      lowerMessage.includes(
        'short circuit'
      )
    ) {

      return `
Possible short circuit detected.

Recommended actions:

• inspect damaged wiring
• verify insulation
• disconnect overloaded devices
• inspect PCB traces
• test continuity with multimeter
`;
    }


    if (
      lowerMessage.includes(
        'motor'
      )
    ) {

      return `
Motor diagnostic suggestions:

• verify supply voltage
• inspect bearings
• check overheating
• measure winding resistance
• inspect vibration levels
`;
    }


    if (
      lowerMessage.includes(
        'sensor'
      )
    ) {

      return `
Sensor diagnostic steps:

• verify sensor voltage
• inspect signal wiring
• test calibration
• inspect communication protocol
`;
    }


    if (
      lowerMessage.includes(
        'voltage'
      )
    ) {

      return `
Voltage diagnostic recommendations:

• verify power supply
• inspect unstable voltage
• check grounding
• test power regulator
• inspect fuse protection
`;
    }


    if (
      lowerMessage.includes(
        'relay'
      )
    ) {

      return `
Relay troubleshooting:

• inspect relay coil
• verify switching voltage
• inspect contact wear
• test continuity
• inspect overload conditions
`;
    }


    if (
      lowerMessage.includes(
        'esp32'
      )
    ) {

      return `
ESP32 diagnostic suggestions:

• verify COM port
• inspect USB connection
• verify firmware upload
• inspect GPIO wiring
• check power stability
`;
    }


    if (
      lowerMessage.includes(
        'plc'
      )
    ) {

      return `
PLC troubleshooting recommendations:

• verify input/output modules
• inspect ladder logic
• inspect communication lines
• verify power supply
• inspect emergency stop systems
`;
    }


    return `
Industrial diagnostic request received.

Recommended checks:

• inspect wiring
• verify power lines
• inspect sensors
• verify continuity
• inspect hardware connections
• run diagnostic tests
`;
  };


  const sendMessage = () => {

    if (!input.trim()) return;


    const userMessage = {

      role: 'user',
      text: input

    };


    const aiMessage = {

      role: 'assistant',

      text:
        generateAIResponse(input)

    };


    setMessages((prev) => [

      ...prev,
      userMessage,
      aiMessage

    ]);


    setInput('');

  };


  return (

    <div className="min-h-screen bg-black text-white flex">

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

          <button className="w-full text-left bg-cyan-500 text-black font-bold p-4 rounded-2xl">
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

          <button
            onClick={() =>
              navigate('/settings')
            }
            className="w-full text-left bg-zinc-800 p-4 rounded-2xl"
          >
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


      <div className="flex-1 flex flex-col p-4 md:p-8">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              AI Assistant
            </h1>

            <p className="text-zinc-400">
              Intelligent industrial diagnostics
            </p>

          </div>


          <div className="bg-green-500 text-black px-6 py-3 rounded-2xl font-bold">
            ONLINE
          </div>

        </div>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">

          <div className="bg-zinc-900 p-6 rounded-3xl">

            <h3 className="text-zinc-400 mb-3">
              Total Tests
            </h3>

            <p className="text-4xl font-bold text-cyan-400">
              {history.length}
            </p>

          </div>


          <div className="bg-zinc-900 p-6 rounded-3xl">

            <h3 className="text-zinc-400 mb-3">
              Faults
            </h3>

            <p className="text-4xl font-bold text-red-400">

              {
                history.filter(
                  (item) =>
                    item.result.includes('SHORT') ||
                    item.result.includes('FAULT') ||
                    item.result.includes('NC')
                ).length
              }

            </p>

          </div>


          <div className="bg-zinc-900 p-6 rounded-3xl">

            <h3 className="text-zinc-400 mb-3">
              Technician
            </h3>

            <p className="text-2xl font-bold text-green-400">
              {technician?.name || 'N/A'}
            </p>

          </div>


          <div className="bg-zinc-900 p-6 rounded-3xl">

            <h3 className="text-zinc-400 mb-3">
              AI Status
            </h3>

            <p className="text-3xl font-bold text-green-400">
              ACTIVE
            </p>

          </div>

        </div>


        <div className="flex-1 bg-zinc-900 rounded-3xl p-6 overflow-y-auto space-y-4 mb-6">

          {messages.map((message, index) => (

            <div
              key={index}
              className={`p-5 rounded-2xl max-w-[85%] ${
                message.role === 'user'
                  ? 'bg-cyan-500 text-black ml-auto'
                  : 'bg-zinc-800'
              }`}
            >
              {message.text}
            </div>

          ))}

        </div>


        <div className="flex gap-4">

          <input
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            placeholder="Ask about industrial diagnostics..."
            className="flex-1 bg-zinc-900 p-5 rounded-2xl outline-none"
          />

          <button
            onClick={sendMessage}
            className="bg-cyan-500 hover:bg-cyan-400 transition text-black font-bold px-8 rounded-2xl"
          >
            SEND
          </button>

        </div>

      </div>

    </div>

  );
}