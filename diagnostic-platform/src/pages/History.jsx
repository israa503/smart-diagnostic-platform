import { useNavigate } from 'react-router-dom';

export default function History() {

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


  const handleLogout = () => {

    localStorage.removeItem(
      'isLoggedIn'
    );

    localStorage.removeItem(
      'isFactoryAdmin'
    );

    navigate('/');

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

          <button className="w-full text-left bg-cyan-500 text-black font-bold p-4 rounded-2xl">
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


      {/* MAIN */}

      <div className="flex-1 p-4 md:p-8 overflow-y-auto">

        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-10">

          <div>

            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Diagnostic History
            </h1>

            <p className="text-zinc-400">
              Previous cable test records
            </p>

          </div>


          <div className="bg-cyan-500/20 border border-cyan-500 text-cyan-400 px-6 py-3 rounded-2xl font-bold text-center">
            {history.length} TESTS
          </div>

        </div>


        {history.length === 0 ? (

          <div className="bg-zinc-900 rounded-3xl p-10 md:p-20 text-center">

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              No Diagnostic History
            </h2>

            <p className="text-zinc-400">
              Start diagnostics to create history
            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {history
              .slice()
              .reverse()
              .map((item, index) => (

              <div
                key={index}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8"
              >

                <div className="flex flex-col md:flex-row justify-between md:items-start gap-6">

                  <div>

                    <h2 className="text-2xl font-bold mb-4 break-words">
                      {item.result}
                    </h2>

                    <p className="text-zinc-400">
                      {item.date}
                    </p>

                  </div>


                  <div
                    className={`px-5 py-3 rounded-2xl font-bold text-center ${
                      item.result.includes('SHORT') ||
                      item.result.includes('FAULT') ||
                      item.result.includes('NC')
                        ? 'bg-red-500 text-black'
                        : 'bg-green-500 text-black'
                    }`}
                  >

                    {item.result.includes('SHORT') ||
                    item.result.includes('FAULT') ||
                    item.result.includes('NC')
                      ? 'FAULT'
                      : 'PASS'}

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );
}