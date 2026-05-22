import {
  useNavigate,
  useLocation
}
from 'react-router-dom';

export default function TechnicianProfile() {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const technician =
    location.state?.technician;


  const language =
    localStorage.getItem(
      'language'
    ) || 'en';


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

      noTech:
        'No Technician Selected',

      title:
        'Technician Profile',

      subtitle:
        'Real technician diagnostics data',

      totalTests:
        'Total Tests',

      faults:
        'Faults',

      successRate:
        'Success Rate',

      aiRating:
        'AI Rating',

      excellent:
        'EXCELLENT',

      good:
        'GOOD',

      technicianInfo:
        'Technician Information',

      name:
        'Name',

      technicianId:
        'Technician ID',

      email:
        'Email',

      status:
        'Status',

      aiEvaluation:
        'AI Evaluation',

      frequent:
        'Frequent faults detected.',

      normal:
        'Fault activity within normal range.',

      performance:
        'Excellent diagnostic performance.',

      improve:
        'Performance improvement recommended.',

      diagnostics:
        'Total diagnostics',

      realHistory:
        'Real Diagnostic History',

      noHistory:
        'No diagnostic history available',

      fault:
        'FAULT',

      pass:
        'PASS'
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

      noTech:
        'Aucun technicien sélectionné',

      title:
        'Profil Technicien',

      subtitle:
        'Données diagnostics réelles',

      totalTests:
        'Tests Totaux',

      faults:
        'Défauts',

      successRate:
        'Taux de Réussite',

      aiRating:
        'Évaluation IA',

      excellent:
        'EXCELLENT',

      good:
        'BON',

      technicianInfo:
        'Informations Technicien',

      name:
        'Nom',

      technicianId:
        'ID Technicien',

      email:
        'Email',

      status:
        'Statut',

      aiEvaluation:
        'Évaluation IA',

      frequent:
        'Défauts fréquents détectés.',

      normal:
        'Activité défaut normale.',

      performance:
        'Performance excellente.',

      improve:
        'Amélioration recommandée.',

      diagnostics:
        'Diagnostics totaux',

      realHistory:
        'Historique Réel',

      noHistory:
        'Aucun historique disponible',

      fault:
        'DÉFAUT',

      pass:
        'PASSÉ'
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

      noTech:
        'لم يتم اختيار فني',

      title:
        'ملف الفني',

      subtitle:
        'بيانات التشخيص الحقيقية',

      totalTests:
        'عدد الاختبارات',

      faults:
        'الأعطال',

      successRate:
        'نسبة النجاح',

      aiRating:
        'تقييم الذكاء',

      excellent:
        'ممتاز',

      good:
        'جيد',

      technicianInfo:
        'معلومات الفني',

      name:
        'الاسم',

      technicianId:
        'رقم الفني',

      email:
        'البريد الإلكتروني',

      status:
        'الحالة',

      aiEvaluation:
        'تقييم الذكاء',

      frequent:
        'تم اكتشاف أعطال متكررة.',

      normal:
        'نشاط الأعطال طبيعي.',

      performance:
        'أداء التشخيص ممتاز.',

      improve:
        'يوصى بتحسين الأداء.',

      diagnostics:
        'إجمالي التشخيصات',

      realHistory:
        'السجل الحقيقي',

      noHistory:
        'لا يوجد سجل تشخيص',

      fault:
        'عطل',

      pass:
        'نجاح'
    }

  };


  const t =
    translations[language];


  if (!technician) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center">

        <h1 className="text-4xl font-bold">
          {t.noTech}
        </h1>

      </div>

    );
  }


  const history =
    technician.history || [];


  const faults =
    history.filter(
      (item) =>
        item.result.includes(
          'SHORT'
        ) ||
        item.result.includes(
          'FAULT'
        ) ||
        item.result.includes(
          'NC'
        )
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
              navigate(
                '/factory-admin'
              )
            }
            className="w-full text-left bg-zinc-800 p-4 rounded-2xl"
          >
            {t.technicianManagement}
          </button>


          <button
            onClick={() =>
              navigate(
                '/factory-analytics'
              )
            }
            className="w-full text-left bg-zinc-800 p-4 rounded-2xl"
          >
            {t.globalAnalytics}
          </button>


          <button
            onClick={() =>
              navigate(
                '/factory-ai'
              )
            }
            className="w-full text-left bg-zinc-800 p-4 rounded-2xl"
          >
            {t.factoryAI}
          </button>


          <button
            onClick={() =>
              navigate(
                '/factory-settings'
              )
            }
            className="w-full text-left bg-zinc-800 p-4 rounded-2xl"
          >
            {t.factorySettings}
          </button>


          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-black font-bold p-4 rounded-2xl"
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


          <div className={`px-6 py-3 rounded-2xl font-bold text-center ${
            technician.status ===
            'ACTIVE'
              ? 'bg-green-500 text-black'
              : 'bg-red-500 text-black'
          }`}>

            {technician.status}

          </div>

        </div>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">

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
              {t.aiRating}
            </h3>

            <p className="text-3xl md:text-4xl font-bold text-yellow-400">

              {successRate >= 90
                ? t.excellent
                : t.good}

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
                {t.name}: {technician.name}
              </div>

              <div className="bg-zinc-800 p-5 rounded-2xl">
                {t.technicianId}: {technician.factoryID || technician.technicianId}
              </div>

              <div className="bg-zinc-800 p-5 rounded-2xl">
                {t.email}: {technician.email}
              </div>

              <div className="bg-zinc-800 p-5 rounded-2xl">
                {t.status}: {technician.status}
              </div>

            </div>

          </div>


          <div className="bg-zinc-900 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-8">
              {t.aiEvaluation}
            </h2>

            <div className="space-y-5">

              <div className="bg-zinc-800 p-5 rounded-2xl">

                {faults > 5
                  ? t.frequent
                  : t.normal}

              </div>


              <div className="bg-zinc-800 p-5 rounded-2xl">

                {successRate >= 90
                  ? t.performance
                  : t.improve}

              </div>


              <div className="bg-zinc-800 p-5 rounded-2xl">

                {t.diagnostics}
                :
                {' '}
                {history.length}

              </div>

            </div>

          </div>

        </div>


        <div className="bg-zinc-900 rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-8">
            {t.realHistory}
          </h2>


          {history.length === 0 ? (

            <div className="bg-zinc-800 p-8 rounded-2xl text-center">

              <p className="text-zinc-400">
                {t.noHistory}
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

                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">

                    <div>

                      <p className="text-xl font-bold break-words">
                        {item.result}
                      </p>

                      <p className="text-zinc-400 mt-2">
                        {item.date}
                      </p>

                    </div>


                    <div className={`px-5 py-3 rounded-2xl font-bold text-center ${
                      item.result.includes('SHORT') ||
                      item.result.includes('FAULT') ||
                      item.result.includes('NC')
                        ? 'bg-red-500 text-black'
                        : 'bg-green-500 text-black'
                    }`}>

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

    </div>

  );
}