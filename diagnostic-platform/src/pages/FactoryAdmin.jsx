import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function FactoryAdmin() {

  const navigate = useNavigate();

  const [search, setSearch] =
    useState('');

  const [refresh, setRefresh] =
    useState(false);


  const technicians =
    JSON.parse(
      localStorage.getItem('technicians')
    ) || [];


  const filteredTechnicians =
    technicians.filter((tech) =>
      tech.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );


  const deleteTechnician = (email) => {

    const updatedTechs =
      technicians.filter(
        (tech) =>
          tech.email !== email
      );

    localStorage.setItem(
      'technicians',
      JSON.stringify(updatedTechs)
    );

    setRefresh(!refresh);

  };


  const toggleStatus = (email) => {

    const updatedTechs =
      technicians.map((tech) => {

        if (tech.email === email) {

          return {

            ...tech,

            status:
              tech.status === 'ACTIVE'
                ? 'DISABLED'
                : 'ACTIVE'

          };

        }

        return tech;

      });


    localStorage.setItem(
      'technicians',
      JSON.stringify(updatedTechs)
    );

    setRefresh(!refresh);

  };


  return (

    <div className="min-h-screen bg-black text-white flex">

      <div className="w-80 bg-zinc-900 border-r border-zinc-800 p-6 overflow-y-auto">

        <h1 className="text-3xl font-bold text-cyan-400 mb-12">
          Factory Admin
        </h1>


        <div className="space-y-4">

          <button className="w-full text-left bg-cyan-500 text-black font-bold p-4 rounded-2xl">
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


      <div className="flex-1 p-8 overflow-y-auto">

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-5xl font-bold mb-3">
              Technician Management
            </h1>

            <p className="text-zinc-400">
              Real factory technician control
            </p>

          </div>


          <div className="bg-cyan-500/20 border border-cyan-500 text-cyan-400 px-6 py-3 rounded-2xl font-bold">
            ADMIN CONTROL
          </div>

        </div>


        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search technician..."
          className="w-full bg-zinc-900 border border-zinc-800 p-5 rounded-2xl outline-none mb-10"
        />


        <div className="grid grid-cols-3 gap-6 mb-10">

          <div className="bg-zinc-900 p-8 rounded-3xl">

            <h3 className="text-zinc-400 mb-4">
              Technicians
            </h3>

            <p className="text-6xl font-bold text-cyan-400">
              {technicians.length}
            </p>

          </div>


          <div className="bg-zinc-900 p-8 rounded-3xl">

            <h3 className="text-zinc-400 mb-4">
              Active
            </h3>

            <p className="text-6xl font-bold text-green-400">

              {
                technicians.filter(
                  (tech) =>
                    tech.status === 'ACTIVE'
                ).length
              }

            </p>

          </div>


          <div className="bg-zinc-900 p-8 rounded-3xl">

            <h3 className="text-zinc-400 mb-4">
              Disabled
            </h3>

            <p className="text-6xl font-bold text-red-400">

              {
                technicians.filter(
                  (tech) =>
                    tech.status === 'DISABLED'
                ).length
              }

            </p>

          </div>

        </div>


        <div className="space-y-6">

          {filteredTechnicians.map(
            (tech, index) => (

            <div
              key={index}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h2 className="text-3xl font-bold mb-3">
                    {tech.name}
                  </h2>

                  <p className="text-zinc-400 mb-2">
                    ID: {tech.factoryID}
                  </p>

                  <p className="text-zinc-400 mb-2">
                    Email: {tech.email}
                  </p>

                  <p className="text-zinc-400">
                    Tests: {tech.tests}
                  </p>

                </div>


                <div className="text-right">

                  <div className={`px-5 py-3 rounded-2xl font-bold ${
                    tech.status === 'ACTIVE'
                      ? 'bg-green-500 text-black'
                      : 'bg-red-500 text-black'
                  }`}>

                    {tech.status}

                  </div>


                  <p className="text-red-400 mt-4 text-lg font-bold">
                    Faults: {tech.faults}
                  </p>

                </div>

              </div>


              <div className="grid grid-cols-5 gap-4 mt-8">

                <button
                  onClick={() =>
                    navigate(
                      '/technician-profile',
                      {
                        state: {
                          technician: tech
                        }
                      }
                    )
                  }
                  className="bg-cyan-500 hover:bg-cyan-400 transition text-black font-bold py-4 rounded-2xl"
                >
                  Profile
                </button>


                <button
                  onClick={() =>
                    toggleStatus(
                      tech.email
                    )
                  }
                  className={`font-bold py-4 rounded-2xl ${
                    tech.status === 'ACTIVE'
                      ? 'bg-yellow-500 text-black'
                      : 'bg-green-500 text-black'
                  }`}
                >

                  {tech.status === 'ACTIVE'
                    ? 'Disable'
                    : 'Enable'}

                </button>


                <button
                  className="bg-zinc-800 hover:bg-zinc-700 transition py-4 rounded-2xl"
                >
                  Analytics
                </button>


                <button
                  className="bg-zinc-800 hover:bg-zinc-700 transition py-4 rounded-2xl"
                >
                  History
                </button>


                <button
                  onClick={() =>
                    deleteTechnician(
                      tech.email
                    )
                  }
                  className="bg-red-500 hover:bg-red-400 transition text-black font-bold py-4 rounded-2xl"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );
}