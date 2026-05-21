import {
  useNavigate,
  useLocation
} from 'react-router-dom';

export default function TechnicianProfile() {

  const navigate = useNavigate();

  const location = useLocation();

  const technician =
    location.state?.technician;


  if (!technician) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center">

        <h1 className="text-4xl font-bold">
          No Technician Selected
        </h1>

      </div>

    );
  }


  const history =
    technician.history || [];


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
              Technician Profile
            </h1>

            <p className="text-zinc-400">
              Real technician diagnostics data
            </p>

          </div>


          <div className={`px-6 py-3 rounded-2xl font-bold ${
            technician.status === 'ACTIVE'
              ? 'bg-green-500 text-black'
              : 'bg-red-500 text-black'
          }`}>
            {technician.status}
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
              AI Rating
            </h3>

            <p className="text-4xl font-bold text-yellow-400">
              {successRate >= 90
                ? 'EXCELLENT'
                : 'GOOD'}
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
                Name: {technician.name}
              </div>

              <div className="bg-zinc-800 p-5 rounded-2xl">
                Technician ID: {technician.factoryID}
              </div>

              <div className="bg-zinc-800 p-5 rounded-2xl">
                Email: {technician.email}
              </div>

              <div className="bg-zinc-800 p-5 rounded-2xl">
                Status: {technician.status}
              </div>

            </div>

          </div>


          <div className="bg-zinc-900 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-8">
              AI Evaluation
            </h2>

            <div className="space-y-5">

              <div className="bg-zinc-800 p-5 rounded-2xl">

                {faults > 5
                  ? 'Frequent faults detected.'
                  : 'Fault activity within normal range.'}

              </div>

              <div className="bg-zinc-800 p-5 rounded-2xl">

                {successRate >= 90
                  ? 'Excellent diagnostic performance.'
                  : 'Performance improvement recommended.'}

              </div>

              <div className="bg-zinc-800 p-5 rounded-2xl">

                Total diagnostics:
                {' '}
                {history.length}

              </div>

            </div>

          </div>

        </div>


        <div className="bg-zinc-900 rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-8">
            Real Diagnostic History
          </h2>


          {history.length === 0 ? (

            <div className="bg-zinc-800 p-8 rounded-2xl text-center">

              <p className="text-zinc-400">
                No diagnostic history available
              </p>

            </div>

          ) : (

            <div className="space-y-5">

              {history
                .slice()
                .reverse()
                .map((item, index) => (

                <div
                  key={index}
                  className="bg-zinc-800 p-5 rounded-2xl"
                >

                  <div className="flex justify-between items-center">

                    <div>

                      <p className="text-xl font-bold">
                        {item.result}
                      </p>

                      <p className="text-zinc-400 mt-2">
                        {item.date}
                      </p>

                    </div>


                    <div className={`px-5 py-3 rounded-2xl font-bold ${
                      item.result.includes('SHORT') ||
                      item.result.includes('FAULT') ||
                      item.result.includes('NC')
                        ? 'bg-red-500 text-black'
                        : 'bg-green-500 text-black'
                    }`}>

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

    </div>

  );
}