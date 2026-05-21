import { useNavigate } from 'react-router-dom';

export default function FactoryAnalytics() {

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


  const activeTechnicians =
    technicians.filter(
      (tech) =>
        tech.status === 'ACTIVE'
    ).length;


  const successRate =
    totalTests > 0
      ? Math.round(
          (
            (totalTests - totalFaults) /
            totalTests
          ) * 100
        )
      : 100;


  const bestTechnician =
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

          <button className="w-full text-left bg-cyan-500 text-black font-bold p-4 rounded-2xl">
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
              Global Factory Analytics
            </h1>

            <p className="text-zinc-400">
              Real-time factory statistics
            </p>

          </div>


          <div className="bg-cyan-500/20 border border-cyan-500 text-cyan-400 px-6 py-3 rounded-2xl font-bold">
            LIVE FACTORY DATA
          </div>

        </div>


        <div className="grid grid-cols-4 gap-6 mb-10">

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
              Total Tests
            </h3>

            <p className="text-6xl font-bold text-green-400">
              {totalTests}
            </p>

          </div>


          <div className="bg-zinc-900 p-8 rounded-3xl">

            <h3 className="text-zinc-400 mb-4">
              Total Faults
            </h3>

            <p className="text-6xl font-bold text-red-400">
              {totalFaults}
            </p>

          </div>


          <div className="bg-zinc-900 p-8 rounded-3xl">

            <h3 className="text-zinc-400 mb-4">
              Success Rate
            </h3>

            <p className="text-6xl font-bold text-yellow-400">
              {successRate}%
            </p>

          </div>

        </div>


        <div className="grid grid-cols-2 gap-8 mb-10">

          <div className="bg-zinc-900 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-8">
              Factory AI Evaluation
            </h2>

            <div className="space-y-5">

              <div className="bg-zinc-800 p-5 rounded-2xl">

                {successRate >= 90
                  ? 'Factory diagnostic performance is excellent.'
                  : 'Factory performance needs optimization.'}

              </div>

              <div className="bg-zinc-800 p-5 rounded-2xl">

                Active technicians:
                {' '}
                {activeTechnicians}

              </div>

              <div className="bg-zinc-800 p-5 rounded-2xl">

                Total diagnostics executed:
                {' '}
                {totalTests}

              </div>

            </div>

          </div>


          <div className="bg-zinc-900 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-8">
              Top Technician
            </h2>

            {bestTechnician ? (

              <div className="space-y-5">

                <div className="bg-zinc-800 p-5 rounded-2xl">

                  Name:
                  {' '}
                  {bestTechnician.name}

                </div>

                <div className="bg-zinc-800 p-5 rounded-2xl">

                  Tests:
                  {' '}
                  {bestTechnician.tests}

                </div>

                <div className="bg-zinc-800 p-5 rounded-2xl">

                  Faults:
                  {' '}
                  {bestTechnician.faults}

                </div>

              </div>

            ) : (

              <div className="bg-zinc-800 p-5 rounded-2xl">

                No technicians available

              </div>

            )}

          </div>

        </div>


        <div className="bg-zinc-900 rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-8">
            Technicians Overview
          </h2>

          <div className="space-y-5">

            {technicians.map((tech, index) => (

              <div
                key={index}
                className="bg-zinc-800 p-5 rounded-2xl flex justify-between items-center"
              >

                <div>

                  <p className="text-xl font-bold">
                    {tech.name}
                  </p>

                  <p className="text-zinc-400">
                    {tech.factoryID}
                  </p>

                </div>


                <div className="text-right">

                  <p className="text-cyan-400 font-bold">
                    Tests: {tech.tests}
                  </p>

                  <p className="text-red-400">
                    Faults: {tech.faults}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );
}