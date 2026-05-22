import { useNavigate } from 'react-router-dom';

export default function Dashboard() {

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
      logout: 'Logout',

      welcome: 'Welcome',
      subtitle:
        'Real-time industrial diagnostics',

      online: 'ONLINE',

      totalTests: 'Total Tests',
      faults: 'Faults',
      successRate: 'Success Rate',
      status: 'Status',

      active: 'ACTIVE',

      technicianInfo:
        'Technician Information',

      name: 'Name',
      technicianId:
        'Technician ID',

      email: 'Email',

      aiRecommendations:
        'AI Recommendations',

      rec1:
        'Inspect connector stability regularly.',

      rec2:
        'Monitor voltage fluctuations carefully.',

      rec3:
        'Continue preventive maintenance checks.',

      recentActivity:
        'Recent Diagnostic Activity',

      noActivity:
        'No diagnostic activity yet'
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
        'Déconnexion',

      welcome:
        'Bienvenue',

      subtitle:
        'Diagnostics industriels en temps réel',

      online:
        'EN LIGNE',

      totalTests:
        'Tests Totaux',

      faults:
        'Défauts',

      successRate:
        'Taux de Réussite',

      status:
        'Statut',

      active:
        'ACTIF',

      technicianInfo:
        'Informations Technicien',

      name:
        'Nom',

      technicianId:
        'ID Technicien',

      email:
        'Email',

      aiRecommendations:
        'Recommandations IA',

      rec1:
        'Inspecter régulièrement les connecteurs.',

      rec2:
        'Surveiller les variations de tension.',

      rec3:
        'Continuer la maintenance préventive.',

      recentActivity:
        'Activité Diagnostique',

      noActivity:
        'Aucune activité diagnostique'
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

      welcome:
        'مرحبا',

      subtitle:
        'تشخيص صناعي مباشر',

      online:
        'متصل',

      totalTests:
        'عدد الاختبارات',

      faults:
        'الأعطال',

      successRate:
        'نسبة النجاح',

      status:
        'الحالة',

      active:
        'نشط',

      technicianInfo:
        'معلومات الفني',

      name:
        'الاسم',

      technicianId:
        'رقم الفني',

      email:
        'البريد الإلكتروني',

      aiRecommendations:
        'توصيات الذكاء الاصطناعي',

      rec1:
        'افحص استقرار الموصلات بانتظام.',

      rec2:
        'راقب تغيرات الجهد الكهربائي.',

      rec3:
        'استمر في الصيانة الوقائية.',

      recentActivity:
        'آخر نشاط تشخيصي',

      noActivity:
        'لا يوجد نشاط تشخيصي'
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


  const handleLogout = () => {

    localStorage.removeItem(
      'isLoggedIn'
    );

    localStorage.removeItem(
      'currentTechnician'
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

          <button className="w-full text-left bg-cyan-500 text-black font-bold p-4 rounded-2xl">
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

              {t.welcome},
              {' '}
              {technician?.name || 'Technician'}

            </h1>

            <p className="text-zinc-400">
              {t.subtitle}
            </p>

          </div>


          <div className="bg-green-500 text-black px-6 py-3 rounded-2xl font-bold text-center">
            {t.online}
          </div>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

          <div className="bg-zinc-900 p-8 rounded-3xl">

            <h3 className="text-zinc-400 mb-4">
              {t.totalTests}
            </h3>

            <p className="text-5xl md:text-6xl font-bold text-cyan-400">
              {history.length}
            </p>

          </div>


          <div className="bg-zinc-900 p-8 rounded-3xl">

            <h3 className="text-zinc-400 mb-4">
              {t.faults}
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


          <div className="bg-zinc-900 p-8 rounded-3xl">

            <h3 className="text-zinc-400 mb-4">
              {t.status}
            </h3>

            <p className="text-4xl font-bold text-green-400">
              {t.active}
            </p>

          </div>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">

          <div className="bg-zinc-900 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-8">
              {t.technicianInfo}
            </h2>

            <div className="space-y-5">

              <div className="bg-zinc-800 p-5 rounded-2xl">
                {t.name}: {technician?.name}
              </div>

              <div className="bg-zinc-800 p-5 rounded-2xl">
                {t.technicianId}: {technician?.factoryID}
              </div>

              <div className="bg-zinc-800 p-5 rounded-2xl">
                {t.email}: {technician?.email}
              </div>

              <div className="bg-zinc-800 p-5 rounded-2xl">
                {t.status}: {t.active}
              </div>

            </div>

          </div>


          <div className="bg-zinc-900 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-8">
              {t.aiRecommendations}
            </h2>

            <div className="space-y-5">

              <div className="bg-zinc-800 p-5 rounded-2xl">
                {t.rec1}
              </div>

              <div className="bg-zinc-800 p-5 rounded-2xl">
                {t.rec2}
              </div>

              <div className="bg-zinc-800 p-5 rounded-2xl">
                {t.rec3}
              </div>

            </div>

          </div>

        </div>


        <div className="bg-zinc-900 rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-8">
            {t.recentActivity}
          </h2>


          {history.length === 0 ? (

            <div className="bg-zinc-800 p-8 rounded-2xl text-center">

              <p className="text-zinc-400">
                {t.noActivity}
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

                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">

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