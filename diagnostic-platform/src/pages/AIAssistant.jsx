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
          'AI Diagnostic Assistant Online.'
      }
    ]);


  const [input, setInput] =
    useState('');


  const sendMessage = () => {

    if (!input.trim()) return;

    const userMessage = {

      role: 'user',
      text: input

    };

    let aiResponse =
      'System operating normally.';


    if (
      input.toLowerCase().includes(
        'fault'
      )
    ) {

      const faults =
        history.filter(
          (item) =>
            item.result.includes('SHORT') ||
            item.result.includes('FAULT') ||
            item.result.includes('NC')
        ).length;

      aiResponse =
        `Total detected faults: ${faults}`;
    }


    else if (
      input.toLowerCase().includes(
        'history'
      )
    ) {

      aiResponse =
        `Total diagnostics executed: ${history.length}`;
    }


    else if (
      input.toLowerCase().includes(
        'short'
      )
    ) {

      const shortCount =
        history.filter(
          (item) =>
            item.result.includes('SHORT')
        ).length;

      aiResponse =
        `Short circuits detected: ${shortCount}`;
    }


    else if (
      input.toLowerCase().includes(
        'nc'
      )
    ) {

      const ncCount =
        history.filter(
          (item) =>
            item.result.includes('NC')
        ).length;

      aiResponse =
        `NC detections: ${ncCount}`;
    }


    else if (
      input.toLowerCase().includes(
        'voltage'
      )
    ) {

      const voltageCount =
        history.filter(
          (item) =>
            item.result.includes('VOLTAGE')
        ).length;

      aiResponse =
        `Voltage faults detected: ${voltageCount}`;
    }


    else if (
      input.toLowerCase().includes(
        'success'
      )
    ) {

      const faults =
        history.filter(
          (item) =>
            item.result.includes('SHORT') ||
            item.result.includes('FAULT') ||
            item.result.includes('NC')
        ).length;

      const successRate =
        history.length > 0
          ? Math.round(
              (
                (history.length - faults) /
                history.length
              ) * 100
            )
          : 100;

      aiResponse =
        `Diagnostic success rate: ${successRate}%`;
    }


    const aiMessage = {

      role: 'assistant',
      text: aiResponse

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

        </div>

      </div>


      <div className="flex-1 flex flex-col p-8">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-5xl font-bold mb-3">
              AI Assistant
            </h1>

            <p className="text-zinc-400">
              Intelligent diagnostic analysis
            </p>

          </div>


          <div className="bg-green-500 text-black px-6 py-3 rounded-2xl font-bold">
            ONLINE
          </div>

        </div>


        <div className="grid grid-cols-4 gap-6 mb-8">

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
              className={`p-5 rounded-2xl max-w-[75%] ${
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
            placeholder="Ask AI about faults, NC, voltage, history..."
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