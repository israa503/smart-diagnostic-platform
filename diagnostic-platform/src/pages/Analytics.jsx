import { useNavigate } from 'react-router-dom';

export default function Analytics() {

  const navigate = useNavigate();

  const language =
    localStorage.getItem('language')
    || 'en';


  const translations = {

    en: {

      dashboard: 'Dashboard',
      aiAssistant: 'AI Assistant',
      analytics: 'Analytics',
      diagnostic: 'Diagnostic',
      history: 'History',
      settings: 'Settings',
      logout: 'LOGOUT',

      title: 'Analytics',

      subtitle:
        'Real-time diagnostic statistics',

      liveData: 'LIVE DATA',

      totalTests: 'Total Tests',
      totalFaults: 'Total Faults',
      successRate: 'Success Rate',

      shortCircuits:
        'Short Circuits',

      voltageFaults:
        'Voltage Faults',

      ncDetections:
        'NC Detections',

      aiSummary:
        'AI Analytics Summary',

      highFault:
        'High fault activity detected.',

      normalFault:
        'Fault activity within normal range.',

      excellent:
        'Excellent diagnostic success rate.',

      improve:
        'Diagnostic performance should improve.',

      totalCompleted:
        'Total completed diagnostics'
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
        'Analytiques',

      subtitle:
        'Statistiques de diagnostic en temps réel',

      liveData:
        'DONNÉES EN DIRECT',

      totalTests:
        'Tests Totaux',

      totalFaults:
        'Défauts Totaux',

      successRate:
        'Taux de Réussite',

      shortCircuits:
        'Courts Circuits',

      voltageFaults:
        'Défauts de Tension',

      ncDetections:
        'Détections NC',

      aiSummary:
        'Résumé IA',

      highFault:
        'Activité élevée de défauts détectée.',

      normalFault:
        'Activité des défauts normale.',

      excellent:
        'Excellent taux de réussite.',

      improve:
        'Les performances doivent être améliorées.',

      totalCompleted:
        'Diagnostics terminés'
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
        'التحليلات',

      subtitle:
        'إحصائيات التشخيص المباشرة',

      liveData:
        'بيانات مباشرة',

      totalTests:
        'عدد الاختبارات',

      totalFaults:
        'عدد الأعطال',

      successRate:
        'نسبة النجاح',

      shortCircuits:
        'الدوائر القصيرة',

      voltageFaults:
        'أعطال الجهد',

      ncDetections:
        'كشف NC',

      aiSummary:
        'ملخص الذكاء الاصطناعي',

      highFault:
        'تم اكتشاف نشاط أعطال مرتفع.',

      normalFault:
        'نشاط الأعطال طبيعي.',

      excellent:
        'نسبة نجاح ممتازة.',

      improve:
        'يجب تحسين الأداء.',

      totalCompleted:
        'إجمالي التشخيصات'
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

          <button className="w-full text-left bg-cyan-500 text-black font-bold p-4 rounded-2xl">
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

          <button
            onClick={() =>
              navigate('/history')
            }
            className="w-full text-left bg-zinc-800 p-4 rounded-2xl"
          >
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
            {t.liveData}
          </div>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-zinc-900 p-8 rounded-3xl">

            <h3 className="text-zinc-400 mb-4">
              {t.totalTests}
            </h3>

            <p className="text-5xl md:text-6xl font-bold text-cyan-400">
              {totalTests}
            </p>

          </div>


          <div className="bg-zinc-900 p-8 rounded-3xl">

            <h3 className="text-zinc-400 mb-4">
              {t.totalFaults}
            </h3>

            <p className="text-5xl md:text-6xl font-bold text-red-400">
              {faults}
            </p>

          </div>


          <div className="bg-zinc-900 p-8 rounded-3xl">

            <h3 className="text-zinc-400 mb-4">
              {t.successRate}
            </h3>

            <p className="text-5xl md:text-6xl font-bold text-green-400">
              {successRate}%
            </p>

          </div>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-zinc-900 p-8 rounded-3xl">

            <h3 className="text-zinc-400 mb-4">
              {t.shortCircuits}
            </h3>

            <p className="text-5xl md:text-6xl font-bold text-red-400">
              {shortCircuits}
            </p>

          </div>


          <div className="bg-zinc-900 p-8 rounded-3xl">

            <h3 className="text-zinc-400 mb-4">
              {t.voltageFaults}
            </h3>

            <p className="text-5xl md:text-6xl font-bold text-yellow-400">
              {voltageFaults}
            </p>

          </div>


          <div className="bg-zinc-900 p-8 rounded-3xl">

            <h3 className="text-zinc-400 mb-4">
              {t.ncDetections}
            </h3>

            <p className="text-5xl md:text-6xl font-bold text-orange-400">
              {ncCount}
            </p>

          </div>

        </div>


        <div className="bg-zinc-900 rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-8">
            {t.aiSummary}
          </h2>

          <div className="space-y-5">

            <div className="bg-zinc-800 p-5 rounded-2xl">

              {faults > 5
                ? t.highFault
                : t.normalFault}

            </div>

            <div className="bg-zinc-800 p-5 rounded-2xl">

              {successRate >= 90
                ? t.excellent
                : t.improve}

            </div>

            <div className="bg-zinc-800 p-5 rounded-2xl">

              {t.totalCompleted}
              :
              {' '}
              {totalTests}

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}