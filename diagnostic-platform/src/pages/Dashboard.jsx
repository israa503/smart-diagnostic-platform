import { useNavigate } from 'react-router-dom';

export default function Dashboard() {

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


  return (

    <div className="min-h-screen bg-black text-white flex">

      <div className="w-72 bg-zinc-900 border-r border-zinc-800 p-6 overflow-y-auto">

        <h1 className="text-3xl font-bold text-cyan-400 mb-12">
          Smart Diagnostic
        </h1>


        <div className="space-y-4">

          <button className="w-full text-left bg-cyan-500 text-black font-bold p-4 rounded-2xl">
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


      <div className="flex-1 p-8 overflow-y-auto">

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-5xl font-bold mb-3">
              Welcome,
              {' '}
              {technician?.name || 'Technician'}
            </h1>

            <p className="text-zinc-400">
              Real-time industrial diagnostics
            </p>

          </div>


          <div className="bg-green-500 text-black px-6 py-3 rounded-2xl font-bold">
            ONLINE
          </div>

        </div>


        <div className="grid grid-cols-4 gap-6 mb-10">

          <div className="bg-zinc-900 p-8 rounded-3xl">

            <h3 className="text-zinc-400 mb-4">
              Total Tests
            </h3>

            <p className="text-6xl font-bold text-cyan-400">
              {history.length}
            </p>

          </div>


          <div className="bg-zinc-900 p-8 rounded-3xl">

            <h3 className="text-zinc-400 mb-4">
              Faults
            </h3>

            <p className="text-6xl font-bold text-red-400">
              {faults}
            </p>

          </div>


          <div className="bg-zinc-900 p-8 rounded-3xl">

            <h3 className="text-zinc-400 mb-4">
              Success Rate
            </h3>

            <p className="text-6xl font-bold text-green-400">
              {successRate}%
            </p>

          </div>


          <div className="bg-zinc-900 p-8 rounded-3xl">

            <h3 className="text-zinc-400 mb-4">
              Status
            </h3>

            <p className="text-4xl font-bold text-green-400">
              ACTIVE
            </p>

          </div>

        </div>


        <div className="grid grid-cols-2 gap-8 mb-10">

          <div className="bg-zinc-900 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-8">
              Technician Information
            </h2>

            <div className="space-y-5">

              <div className="bg-zinc-800 p-5 rounded-2xl">
                Name: {technician?.name}
              </div>

              <div className="bg-zinc-800 p-5 rounded-2xl">
                Technician ID: {technician?.factoryID}
              </div>

              <div className="bg-zinc-800 p-5 rounded-2xl">
                Email: {technician?.email}
              </div>

              <div className="bg-zinc-800 p-5 rounded-2xl">
                Status: ACTIVE
              </div>

            </div>

          </div>


          <div className="bg-zinc-900 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-8">
              AI Recommendations
            </h2>

            <div className="space-y-5">

              <div className="bg-zinc-800 p-5 rounded-2xl">
                Inspect connector stability regularly.
              </div>

              <div className="bg-zinc-800 p-5 rounded-2xl">
                Monitor voltage fluctuations carefully.
              </div>

              <div className="bg-zinc-800 p-5 rounded-2xl">
                Continue preventive maintenance checks.
              </div>

            </div>

          </div>

        </div>


        <div className="bg-zinc-900 rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-8">
            Recent Diagnostic Activity
          </h2>


          {history.length === 0 ? (

            <div className="bg-zinc-800 p-8 rounded-2xl text-center">

              <p className="text-zinc-400">
                No diagnostic activity yet
              </p>

            </div>

          ) : (

            <div className="space-y-5">

              {history
                .slice()
                .reverse()
                .slice(0, 5)
                .map((item, index) => (

                <div
                  key={index}
                  className="bg-zinc-800 p-5 rounded-2xl"
                >

                  <div className="flex justify-between items-center">

                    <p className="font-bold">
                      {item.result}
                    </p>

                    <p className="text-zinc-400">
                      {item.date}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>

  );
}