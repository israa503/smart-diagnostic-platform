import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function FactoryAdmin() {

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
        'Technician Management',

      subtitle:
        'Real factory technician control',

      adminControl:
        'ADMIN CONTROL',

      search:
        'Search technician...',

      technicians:
        'Technicians',

      active:
        'Active',

      disabled:
        'Disabled',

      id:
        'ID',

      email:
        'Email',

      tests:
        'Tests',

      faults:
        'Faults',

      profile:
        'Profile',

      disable:
        'Disable',

      enable:
        'Enable',

      analytics:
        'Analytics',

      history:
        'History',

      delete:
        'Delete'
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
        'Gestion Techniciens',

      subtitle:
        'Contrôle réel des techniciens',

      adminControl:
        'CONTRÔLE ADMIN',

      search:
        'Rechercher technicien...',

      technicians:
        'Techniciens',

      active:
        'Actifs',

      disabled:
        'Désactivés',

      id:
        'ID',

      email:
        'Email',

      tests:
        'Tests',

      faults:
        'Défauts',

      profile:
        'Profil',

      disable:
        'Désactiver',

      enable:
        'Activer',

      analytics:
        'Analytiques',

      history:
        'Historique',

      delete:
        'Supprimer'
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
        'إدارة الفنيين',

      subtitle:
        'التحكم الكامل بالفنيين',

      adminControl:
        'تحكم المدير',

      search:
        'ابحث عن فني...',

      technicians:
        'الفنيون',

      active:
        'النشطون',

      disabled:
        'المعطلون',

      id:
        'المعرف',

      email:
        'البريد الإلكتروني',

      tests:
        'الاختبارات',

      faults:
        'الأعطال',

      profile:
        'الملف الشخصي',

      disable:
        'تعطيل',

      enable:
        'تفعيل',

      analytics:
        'التحليلات',

      history:
        'السجل',

      delete:
        'حذف'
    }

  };


  const t = translations[language];


  const [search, setSearch] =
    useState('');

  const [refresh, setRefresh] =
    useState(false);


  const technicians =
    JSON.parse(
      localStorage.getItem(
        'technicians'
      )
    ) || [];


  const filteredTechnicians =
    technicians.filter((tech) =>
      tech.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );


  const deleteTechnician = (email) => {

    const updatedTechs =
      technicians.filter(
        (tech) =>
          tech.email !== email
      );

    localStorage.setItem(
      'technicians',
      JSON.stringify(updatedTechs)
    );

    setRefresh(!refresh);

  };


  const toggleStatus = (email) => {

    const updatedTechs =
      technicians.map((tech) => {

        if (tech.email === email) {

          return {

            ...tech,

            status:
              tech.status === 'ACTIVE'
                ? 'DISABLED'
                : 'ACTIVE'

          };

        }

        return tech;

      });


    localStorage.setItem(
      'technicians',
      JSON.stringify(updatedTechs)
    );

    setRefresh(!refresh);

  };


  const handleLogout = () => {

    localStorage.removeItem(
      'isFactoryAdmin'
    );

    navigate('/');

  };


  return (

    <div className="min-h-screen bg-black text-white flex">

      <div className="w-80 bg-zinc-900 border-r border-zinc-800 p-6 overflow-y-auto hidden md:block">

        <h1 className="text-3xl font-bold text-cyan-400 mb-12">
          Factory Admin
        </h1>


        <div className="space-y-4">

          <button className="w-full text-left bg-cyan-500 text-black font-bold p-4 rounded-2xl">
            {t.technicianManagement}
          </button>

          <button
            onClick={() =>
              navigate('/factory-analytics')
            }
            className="w-full text-left bg-zinc-800 p-4 rounded-2xl"
          >
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
            {t.adminControl}
          </div>

        </div>


        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder={t.search}
          className="w-full bg-zinc-900 border border-zinc-800 p-5 rounded-2xl outline-none mb-10"
        />


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

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
              {t.active}
            </h3>

            <p className="text-5xl md:text-6xl font-bold text-green-400">

              {
                technicians.filter(
                  (tech) =>
                    tech.status === 'ACTIVE'
                ).length
              }

            </p>

          </div>


          <div className="bg-zinc-900 p-8 rounded-3xl">

            <h3 className="text-zinc-400 mb-4">
              {t.disabled}
            </h3>

            <p className="text-5xl md:text-6xl font-bold text-red-400">

              {
                technicians.filter(
                  (tech) =>
                    tech.status === 'DISABLED'
                ).length
              }

            </p>

          </div>

        </div>


        <div className="space-y-6">

          {filteredTechnicians.map(
            (tech, index) => (

            <div
              key={index}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8"
            >

              <div className="flex flex-col md:flex-row justify-between md:items-start gap-6">

                <div>

                  <h2 className="text-2xl md:text-3xl font-bold mb-3">
                    {tech.name}
                  </h2>

                  <p className="text-zinc-400 mb-2">
                    {t.id}: {tech.factoryID}
                  </p>

                  <p className="text-zinc-400 mb-2">
                    {t.email}: {tech.email}
                  </p>

                  <p className="text-zinc-400">
                    {t.tests}: {tech.tests}
                  </p>

                </div>


                <div className="text-left md:text-right">

                  <div className={`px-5 py-3 rounded-2xl font-bold inline-block ${
                    tech.status === 'ACTIVE'
                      ? 'bg-green-500 text-black'
                      : 'bg-red-500 text-black'
                  }`}>

                    {tech.status}

                  </div>


                  <p className="text-red-400 mt-4 text-lg font-bold">
                    {t.faults}: {tech.faults}
                  </p>

                </div>

              </div>


              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-8">

                <button
                  onClick={() =>
                    navigate(
                      '/technician-profile',
                      {
                        state: {
                          technician: tech
                        }
                      }
                    )
                  }
                  className="bg-cyan-500 hover:bg-cyan-400 transition text-black font-bold py-4 rounded-2xl"
                >
                  {t.profile}
                </button>


                <button
                  onClick={() =>
                    toggleStatus(
                      tech.email
                    )
                  }
                  className={`font-bold py-4 rounded-2xl ${
                    tech.status === 'ACTIVE'
                      ? 'bg-yellow-500 text-black'
                      : 'bg-green-500 text-black'
                  }`}
                >

                  {tech.status === 'ACTIVE'
                    ? t.disable
                    : t.enable}

                </button>


                <button
                  className="bg-zinc-800 hover:bg-zinc-700 transition py-4 rounded-2xl"
                >
                  {t.analytics}
                </button>


                <button
                  className="bg-zinc-800 hover:bg-zinc-700 transition py-4 rounded-2xl"
                >
                  {t.history}
                </button>


                <button
                  onClick={() =>
                    deleteTechnician(
                      tech.email
                    )
                  }
                  className="bg-red-500 hover:bg-red-400 transition text-black font-bold py-4 rounded-2xl"
                >
                  {t.delete}
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );
}