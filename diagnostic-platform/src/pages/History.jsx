import { useNavigate } from 'react-router-dom';

export default function History() {

  const navigate = useNavigate();

  const language =
    localStorage.getItem('language')
    || 'en';


  const translations = {

    en: {

      dashboard:
        'Dashboard',

      aiAssistant:
        'AI Assistant',

      analytics:
        'Analytics',

      diagnostic:
        'Diagnostic',

      history:
        'History',

      settings:
        'Settings',

      logout:
        'LOGOUT',

      title:
        'Diagnostic History',

      subtitle:
        'Previous cable test records',

      tests:
        'TESTS',

      noHistory:
        'No Diagnostic History',

      noHistoryDesc:
        'Start diagnostics to create history',

      fault:
        'FAULT',

      pass:
        'PASS'
    },


    fr: {

      dashboard:
        'Tableau de bord',

      aiAssistant:
        'Assistant IA',

      analytics:
        'Analytiques',

      diagnostic:
        'Diagnostic',

      history:
        'Historique',

      settings:
        'Paramètres',

      logout:
        'DÉCONNEXION',

      title:
        'Historique Diagnostic',

      subtitle:
        'Historique des tests câble',

      tests:
        'TESTS',

      noHistory:
        'Aucun Historique',

      noHistoryDesc:
        'Commencez des diagnostics',

      fault:
        'DÉFAUT',

      pass:
        'PASSÉ'
    },


    ar: {

      dashboard:
        'لوحة التحكم',

      aiAssistant:
        'المساعد الذكي',

      analytics:
        'التحليلات',

      diagnostic:
        'التشخيص',

      history:
        'السجل',

      settings:
        'الإعدادات',

      logout:
        'تسجيل الخروج',

      title:
        'سجل التشخيص',

      subtitle:
        'سجل اختبارات الكابلات',

      tests:
        'اختبارات',

      noHistory:
        'لا يوجد سجل',

      noHistoryDesc:
        'ابدأ التشخيص لإنشاء سجل',

      fault:
        'عطل',

      pass:
        'نجاح'
    }

  };


  const t = translations[language];


  const technicians =
    JSON.parse(
      localStorage.getItem(
        'technicians'
      )
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
            {t.dashboard}
          </button>

          <button
            onClick={() =>
              navigate('/ai')
            }
            className="w-full text-left bg-zinc-800 p-4 rounded-2xl"
          >
            {t.aiAssistant}
          </button>

          <button
            onClick={() =>
              navigate('/analytics')
            }
            className="w-full text-left bg-zinc-800 p-4 rounded-2xl"
          >
            {t.analytics}
          </button>

          <button
            onClick={() =>
              navigate('/diagnostic')
            }
            className="w-full text-left bg-zinc-800 p-4 rounded-2xl"
          >
            {t.diagnostic}
          </button>

          <button className="w-full text-left bg-cyan-500 text-black font-bold p-4 rounded-2xl">
            {t.history}
          </button>

          <button
            onClick={() =>
              navigate('/settings')
            }
            className="w-full text-left bg-zinc-800 p-4 rounded-2xl"
          >
            {t.settings}
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white font-bold p-4 rounded-2xl"
          >
            {t.logout}
          </button>

        </div>

      </div>


      <div className="flex-1 p-4 md:p-8 overflow-y-auto">

        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-10">

          <div>

            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              {t.title}
            </h1>

            <p className="text-zinc-400">
              {t.subtitle}
            </p>

          </div>


          <div className="bg-cyan-500/20 border border-cyan-500 text-cyan-400 px-6 py-3 rounded-2xl font-bold text-center">
            {history.length} {t.tests}
          </div>

        </div>


        {history.length === 0 ? (

          <div className="bg-zinc-900 rounded-3xl p-10 md:p-20 text-center">

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t.noHistory}
            </h2>

            <p className="text-zinc-400">
              {t.noHistoryDesc}
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
                      ? t.fault
                      : t.pass}

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