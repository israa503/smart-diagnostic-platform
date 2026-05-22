import { useNavigate } from 'react-router-dom';

export default function FactoryAnalytics() {

  const navigate = useNavigate();

  const language =
    localStorage.getItem('language')
    || 'en';


  const translations = {

    en: {

      technicianManagement:
        'Technician Management',

      globalAnalytics:
        'Global Analytics',

      factoryAI:
        'Factory AI Assistant',

      factorySettings:
        'Factory Settings',

      logout:
        'Logout',

      title:
        'Global Factory Analytics',

      subtitle:
        'Real-time factory statistics',

      liveData:
        'LIVE FACTORY DATA',

      technicians:
        'Technicians',

      totalTests:
        'Total Tests',

      totalFaults:
        'Total Faults',

      successRate:
        'Success Rate',

      aiEvaluation:
        'Factory AI Evaluation',

      excellent:
        'Factory diagnostic performance is excellent.',

      optimize:
        'Factory performance needs optimization.',

      activeTechs:
        'Active technicians',

      diagnosticsExecuted:
        'Total diagnostics executed',

      topTech:
        'Top Technician',

      name:
        'Name',

      tests:
        'Tests',

      faults:
        'Faults',

      noTech:
        'No technicians available',

      overview:
        'Technicians Overview'
    },


    fr: {

      technicianManagement:
        'Gestion Techniciens',

      globalAnalytics:
        'Analytiques Globales',

      factoryAI:
        'Assistant IA Usine',

      factorySettings:
        'Paramètres Usine',

      logout:
        'Déconnexion',

      title:
        'Analytiques Globales',

      subtitle:
        'Statistiques usine en temps réel',

      liveData:
        'DONNÉES USINE',

      technicians:
        'Techniciens',

      totalTests:
        'Tests Totaux',

      totalFaults:
        'Défauts Totaux',

      successRate:
        'Taux de Réussite',

      aiEvaluation:
        'Évaluation IA Usine',

      excellent:
        'Les performances sont excellentes.',

      optimize:
        'Les performances doivent être optimisées.',

      activeTechs:
        'Techniciens actifs',

      diagnosticsExecuted:
        'Diagnostics exécutés',

      topTech:
        'Meilleur Technicien',

      name:
        'Nom',

      tests:
        'Tests',

      faults:
        'Défauts',

      noTech:
        'Aucun technicien disponible',

      overview:
        'Vue des Techniciens'
    },


    ar: {

      technicianManagement:
        'إدارة الفنيين',

      globalAnalytics:
        'التحليلات العامة',

      factoryAI:
        'مساعد المصنع الذكي',

      factorySettings:
        'إعدادات المصنع',

      logout:
        'تسجيل الخروج',

      title:
        'تحليلات المصنع العامة',

      subtitle:
        'إحصائيات المصنع المباشرة',

      liveData:
        'بيانات المصنع',

      technicians:
        'الفنيون',

      totalTests:
        'عدد الاختبارات',

      totalFaults:
        'عدد الأعطال',

      successRate:
        'نسبة النجاح',

      aiEvaluation:
        'تقييم الذكاء الاصطناعي',

      excellent:
        'أداء المصنع ممتاز.',

      optimize:
        'المصنع يحتاج تحسين.',

      activeTechs:
        'الفنيون النشطون',

      diagnosticsExecuted:
        'إجمالي التشخيصات',

      topTech:
        'أفضل فني',

      name:
        'الاسم',

      tests:
        'الاختبارات',

      faults:
        'الأعطال',

      noTech:
        'لا يوجد فنيون',

      overview:
        'نظرة عامة على الفنيين'
    }

  };


  const t = translations[language];


  const technicians =
    JSON.parse(
      localStorage.getItem(
        'technicians'
      )
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


  const handleLogout = () => {

    localStorage.removeItem(
      'isFactoryAdmin'
    );

    navigate('/');

  };


  return (

    <div className="min-h-screen bg-black text-white flex">

      <div className="w-80 bg-zinc-900 p-6 overflow-y-auto hidden md:block">

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
            {t.technicianManagement}
          </button>

          <button className="w-full text-left bg-cyan-500 text-black font-bold p-4 rounded-2xl">
            {t.globalAnalytics}
          </button>

          <button
            onClick={() =>
              navigate('/factory-ai')
            }
            className="w-full text-left bg-zinc-800 p-4 rounded-2xl"
          >
            {t.factoryAI}
          </button>

          <button
            onClick={() =>
              navigate('/factory-settings')
            }
            className="w-full text-left bg-zinc-800 p-4 rounded-2xl"
          >
            {t.factorySettings}
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


        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">

          <div className="bg-zinc-900 p-8 rounded-3xl">

            <h3 className="text-zinc-400 mb-4">
              {t.technicians}
            </h3>

            <p className="text-5xl md:text-6xl font-bold text-cyan-400">
              {technicians.length}
            </p>

          </div>


          <div className="bg-zinc-900 p-8 rounded-3xl">

            <h3 className="text-zinc-400 mb-4">
              {t.totalTests}
            </h3>

            <p className="text-5xl md:text-6xl font-bold text-green-400">
              {totalTests}
            </p>

          </div>


          <div className="bg-zinc-900 p-8 rounded-3xl">

            <h3 className="text-zinc-400 mb-4">
              {t.totalFaults}
            </h3>

            <p className="text-5xl md:text-6xl font-bold text-red-400">
              {totalFaults}
            </p>

          </div>


          <div className="bg-zinc-900 p-8 rounded-3xl">

            <h3 className="text-zinc-400 mb-4">
              {t.successRate}
            </h3>

            <p className="text-5xl md:text-6xl font-bold text-yellow-400">
              {successRate}%
            </p>

          </div>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">

          <div className="bg-zinc-900 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-8">
              {t.aiEvaluation}
            </h2>

            <div className="space-y-5">

              <div className="bg-zinc-800 p-5 rounded-2xl">

                {successRate >= 90
                  ? t.excellent
                  : t.optimize}

              </div>

              <div className="bg-zinc-800 p-5 rounded-2xl">

                {t.activeTechs}
                :
                {' '}
                {activeTechnicians}

              </div>

              <div className="bg-zinc-800 p-5 rounded-2xl">

                {t.diagnosticsExecuted}
                :
                {' '}
                {totalTests}

              </div>

            </div>

          </div>


          <div className="bg-zinc-900 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-8">
              {t.topTech}
            </h2>

            {bestTechnician ? (

              <div className="space-y-5">

                <div className="bg-zinc-800 p-5 rounded-2xl">
                  {t.name}: {bestTechnician.name}
                </div>

                <div className="bg-zinc-800 p-5 rounded-2xl">
                  {t.tests}: {bestTechnician.tests}
                </div>

                <div className="bg-zinc-800 p-5 rounded-2xl">
                  {t.faults}: {bestTechnician.faults}
                </div>

              </div>

            ) : (

              <div className="bg-zinc-800 p-5 rounded-2xl">
                {t.noTech}
              </div>

            )}

          </div>

        </div>


        <div className="bg-zinc-900 rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-8">
            {t.overview}
          </h2>

          <div className="space-y-5">

            {technicians.map((tech, index) => (

              <div
                key={index}
                className="bg-zinc-800 p-5 rounded-2xl flex flex-col md:flex-row justify-between md:items-center gap-4"
              >

                <div>

                  <p className="text-xl font-bold">
                    {tech.name}
                  </p>

                  <p className="text-zinc-400">
                    {tech.factoryID}
                  </p>

                </div>


                <div className="text-left md:text-right">

                  <p className="text-cyan-400 font-bold">
                    {t.tests}: {tech.tests}
                  </p>

                  <p className="text-red-400">
                    {t.faults}: {tech.faults}
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