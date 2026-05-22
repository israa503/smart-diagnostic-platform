import { useNavigate } from 'react-router-dom';

export default function Analytics() {

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


  const totalTests =
    history.length;


  const faults =
    history.filter(
      (item) =>
        item.result.includes('SHORT') ||
        item.result.includes('FAULT') ||
        item.result.includes('NC')
    ).length;


  const success =
    totalTests - faults;


  const successRate =
    totalTests > 0
      ? Math.round(
          (success / totalTests) * 100
        )
      : 0;


  const shortCircuits =
    history.filter(
      (item) =>
        item.result.includes('SHORT')
    ).length;


  const voltageFaults =
    history.filter(
      (item) =>
        item.result.includes('VOLTAGE')
    ).length;


  const ncCount =
    history.filter(
      (item) =>
        item.result.includes('NC')
    ).length;


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

          <button className="w-full text-left bg-cyan-500 text-black font-bold p-4 rounded-2xl">
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


      {/* MAIN */}

      <div className="flex-1 p-4 md:p-8 overflow-y-auto">

        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-10">

          <div>

            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Analytics
            </h1>

            <p className="text-zinc-400">
              Real-time diagnostic statistics
            </p>

          </div>


          <div className="bg-cyan-500/20 border border-cyan-500 text-cyan-400 px-6 py-3 rounded-2xl font-bold text-center">
            LIVE DATA
          </div>

        </div>


        {/* TOP STATS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-zinc-900 p-8 rounded-3xl">

            <h3 className="text-zinc-400 mb-4">
              Total Tests
            </h3>

            <p className="text-5xl md:text-6xl font-bold text-cyan-400">
              {totalTests}
            </p>

          </div>


          <div className="bg-zinc-900 p-8 rounded-3xl">

            <h3 className="text-zinc-400 mb-4">
              Total Faults
            </h3>

            <p className="text-5xl md:text-6xl font-bold text-red-400">
              {faults}
            </p>

          </div>


          <div className="bg-zinc-900 p-8 rounded-3xl">

            <h3 className="text-zinc-400 mb-4">
              Success Rate
            </h3>

            <p className="text-5xl md:text-6xl font-bold text-green-400">
              {successRate}%
            </p>

          </div>

        </div>


        {/* SECOND ROW */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-zinc-900 p-8 rounded-3xl">

            <h3 className="text-zinc-400 mb-4">
              Short Circuits
            </h3>

            <p className="text-5xl md:text-6xl font-bold text-red-400">
              {shortCircuits}
            </p>

          </div>


          <div className="bg-zinc-900 p-8 rounded-3xl">

            <h3 className="text-zinc-400 mb-4">
              Voltage Faults
            </h3>

            <p className="text-5xl md:text-6xl font-bold text-yellow-400">
              {voltageFaults}
            </p>

          </div>


          <div className="bg-zinc-900 p-8 rounded-3xl">

            <h3 className="text-zinc-400 mb-4">
              NC Detections
            </h3>

            <p className="text-5xl md:text-6xl font-bold text-orange-400">
              {ncCount}
            </p>

          </div>

        </div>


        {/* AI SUMMARY */}

        <div className="bg-zinc-900 rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-8">
            AI Analytics Summary
          </h2>

          <div className="space-y-5">

            <div className="bg-zinc-800 p-5 rounded-2xl">

              {faults > 5
                ? 'High fault activity detected.'
                : 'Fault activity within normal range.'}

            </div>

            <div className="bg-zinc-800 p-5 rounded-2xl">

              {successRate >= 90
                ? 'Excellent diagnostic success rate.'
                : 'Diagnostic performance should improve.'}

            </div>

            <div className="bg-zinc-800 p-5 rounded-2xl">

              Total completed diagnostics:
              {' '}
              {totalTests}

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}