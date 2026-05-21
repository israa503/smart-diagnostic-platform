import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FactoryAI() {

  const navigate = useNavigate();

  const technicians =
    JSON.parse(
      localStorage.getItem('technicians')
    ) || [];


  const totalTests =
    technicians.reduce(
      (sum, tech) =>
        sum + (tech.tests || 0),
      0
    );


  const totalFaults =
    technicians.reduce(
      (sum, tech) =>
        sum + (tech.faults || 0),
      0
    );


  const [messages, setMessages] =
    useState([
      {
        role: 'assistant',
        text:
          'Factory AI Assistant Online.'
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
      'Factory systems operating normally.';


    if (
      input.toLowerCase().includes(
        'technician'
      )
    ) {

      aiResponse =
        `Total registered technicians: ${technicians.length}`;
    }


    else if (
      input.toLowerCase().includes(
        'fault'
      )
    ) {

      aiResponse =
        `Factory detected ${totalFaults} total faults.`;
    }


    else if (
      input.toLowerCase().includes(
        'test'
      )
    ) {

      aiResponse =
        `Factory executed ${totalTests} diagnostics.`;
    }


    else if (
      input.toLowerCase().includes(
        'best'
      )
    ) {

      const bestTech =
        technicians.reduce(
          (best, current) => {

            if (
              !best ||
              current.tests > best.tests
            ) {

              return current;

            }

            return best;

          },
          null
        );

      aiResponse =
        bestTech
          ? `Top technician: ${bestTech.name}`
          : 'No technician data available.';
    }


    else if (
      input.toLowerCase().includes(
        'success'
      )
    ) {

      const successRate =
        totalTests > 0
          ? Math.round(
              (
                (totalTests - totalFaults) /
                totalTests
              ) * 100
            )
          : 100;

      aiResponse =
        `Factory success rate: ${successRate}%`;
    }


    else if (
      input.toLowerCase().includes(
        'ai'
      )
    ) {

      aiResponse =
        'AI monitoring system is fully operational.';
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

          <button className="w-full text-left bg-cyan-500 text-black font-bold p-4 rounded-2xl">
            Factory AI Assistant
          </button>

          <button
            onClick={() =>
              navigate('/factory-settings')
            }
            className="w-full text-left bg-zinc-800 p-4 rounded-2xl"
          >
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


      <div className="flex-1 flex flex-col p-8">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-5xl font-bold mb-3">
              Factory AI Assistant
            </h1>

            <p className="text-zinc-400">
              Intelligent factory analysis
            </p>

          </div>


          <div className="bg-green-500 text-black px-6 py-3 rounded-2xl font-bold">
            ONLINE
          </div>

        </div>


        <div className="grid grid-cols-4 gap-6 mb-8">

          <div className="bg-zinc-900 p-6 rounded-3xl">

            <h3 className="text-zinc-400 mb-3">
              Technicians
            </h3>

            <p className="text-4xl font-bold text-cyan-400">
              {technicians.length}
            </p>

          </div>


          <div className="bg-zinc-900 p-6 rounded-3xl">

            <h3 className="text-zinc-400 mb-3">
              Total Tests
            </h3>

            <p className="text-4xl font-bold text-green-400">
              {totalTests}
            </p>

          </div>


          <div className="bg-zinc-900 p-6 rounded-3xl">

            <h3 className="text-zinc-400 mb-3">
              Total Faults
            </h3>

            <p className="text-4xl font-bold text-red-400">
              {totalFaults}
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
            placeholder="Ask about technicians, tests, faults..."
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