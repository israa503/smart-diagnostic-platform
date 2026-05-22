import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FactorySettings() {

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
        'Factory Settings',

      subtitle:
        'Configure factory management system',

      config:
        'FACTORY CONFIG',

      factoryName:
        'Factory Name',

      adminCode:
        'Factory Admin Code',

      notifications:
        'Notifications',

      notifDesc:
        'Receive factory alerts',

      aiMonitoring:
        'AI Monitoring',

      aiDesc:
        'Enable factory AI supervision',

      autoScan:
        'Auto Scan',

      autoDesc:
        'Automatic diagnostic monitoring',

      save:
        'SAVE FACTORY SETTINGS',

      success:
        'Factory settings updated successfully'
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
        'Paramètres Usine',

      subtitle:
        'Configurer le système usine',

      config:
        'CONFIG USINE',

      factoryName:
        'Nom Usine',

      adminCode:
        'Code Admin',

      notifications:
        'Notifications',

      notifDesc:
        'Recevoir alertes usine',

      aiMonitoring:
        'Surveillance IA',

      aiDesc:
        'Activer supervision IA',

      autoScan:
        'Scan Automatique',

      autoDesc:
        'Surveillance automatique',

      save:
        'ENREGISTRER PARAMÈTRES',

      success:
        'Paramètres enregistrés'
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
        'إعدادات المصنع',

      subtitle:
        'إعداد نظام إدارة المصنع',

      config:
        'إعدادات المصنع',

      factoryName:
        'اسم المصنع',

      adminCode:
        'رمز المدير',

      notifications:
        'الإشعارات',

      notifDesc:
        'استقبال تنبيهات المصنع',

      aiMonitoring:
        'مراقبة الذكاء',

      aiDesc:
        'تفعيل إشراف الذكاء الاصطناعي',

      autoScan:
        'الفحص التلقائي',

      autoDesc:
        'مراقبة تشخيص تلقائية',

      save:
        'حفظ الإعدادات',

      success:
        'تم حفظ الإعدادات بنجاح'
    }

  };


  const t = translations[language];


  const [factoryName, setFactoryName] =
    useState(
      localStorage.getItem(
        'factoryName'
      ) || 'COFAT'
    );


  const [adminCode, setAdminCode] =
    useState(
      localStorage.getItem(
        'factoryAdminCode'
      ) || '1234'
    );


  const [notifications, setNotifications] =
    useState(
      JSON.parse(
        localStorage.getItem(
          'factoryNotifications'
        )
      ) ?? true
    );


  const [aiMonitoring, setAiMonitoring] =
    useState(
      JSON.parse(
        localStorage.getItem(
          'factoryAiMonitoring'
        )
      ) ?? true
    );


  const [autoScan, setAutoScan] =
    useState(
      JSON.parse(
        localStorage.getItem(
          'factoryAutoScan'
        )
      ) ?? true
    );


  const saveSettings = () => {

    localStorage.setItem(
      'factoryName',
      factoryName
    );

    localStorage.setItem(
      'factoryAdminCode',
      adminCode
    );

    localStorage.setItem(
      'factoryNotifications',
      JSON.stringify(notifications)
    );

    localStorage.setItem(
      'factoryAiMonitoring',
      JSON.stringify(aiMonitoring)
    );

    localStorage.setItem(
      'factoryAutoScan',
      JSON.stringify(autoScan)
    );

    alert(t.success);

  };


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

          <button className="w-full text-left bg-cyan-500 text-black font-bold p-4 rounded-2xl">
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
            {t.config}
          </div>

        </div>


        <div className="space-y-6">

          <div className="bg-zinc-900 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-4">
              {t.factoryName}
            </h2>

            <input
              value={factoryName}
              onChange={(e) =>
                setFactoryName(
                  e.target.value
                )
              }
              className="w-full bg-zinc-800 p-5 rounded-2xl outline-none"
            />

          </div>


          <div className="bg-zinc-900 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-4">
              {t.adminCode}
            </h2>

            <input
              value={adminCode}
              onChange={(e) =>
                setAdminCode(
                  e.target.value
                )
              }
              className="w-full bg-zinc-800 p-5 rounded-2xl outline-none"
            />

          </div>


          <div className="bg-zinc-900 rounded-3xl p-8 flex justify-between items-center">

            <div>

              <h2 className="text-2xl font-bold">
                {t.notifications}
              </h2>

              <p className="text-zinc-400 mt-2">
                {t.notifDesc}
              </p>

            </div>

            <button
              onClick={() =>
                setNotifications(
                  !notifications
                )
              }
              className={`px-6 py-3 rounded-2xl font-bold ${
                notifications
                  ? 'bg-green-500 text-black'
                  : 'bg-red-500 text-black'
              }`}
            >
              {notifications ? 'ON' : 'OFF'}
            </button>

          </div>


          <div className="bg-zinc-900 rounded-3xl p-8 flex justify-between items-center">

            <div>

              <h2 className="text-2xl font-bold">
                {t.aiMonitoring}
              </h2>

              <p className="text-zinc-400 mt-2">
                {t.aiDesc}
              </p>

            </div>

            <button
              onClick={() =>
                setAiMonitoring(
                  !aiMonitoring
                )
              }
              className={`px-6 py-3 rounded-2xl font-bold ${
                aiMonitoring
                  ? 'bg-green-500 text-black'
                  : 'bg-red-500 text-black'
              }`}
            >
              {aiMonitoring ? 'ON' : 'OFF'}
            </button>

          </div>


          <div className="bg-zinc-900 rounded-3xl p-8 flex justify-between items-center">

            <div>

              <h2 className="text-2xl font-bold">
                {t.autoScan}
              </h2>

              <p className="text-zinc-400 mt-2">
                {t.autoDesc}
              </p>

            </div>

            <button
              onClick={() =>
                setAutoScan(
                  !autoScan
                )
              }
              className={`px-6 py-3 rounded-2xl font-bold ${
                autoScan
                  ? 'bg-green-500 text-black'
                  : 'bg-red-500 text-black'
              }`}
            >
              {autoScan ? 'ON' : 'OFF'}
            </button>

          </div>


          <button
            onClick={saveSettings}
            className="w-full bg-cyan-500 hover:bg-cyan-400 transition text-black font-bold py-5 rounded-3xl text-xl"
          >
            {t.save}
          </button>

        </div>

      </div>

    </div>

  );
}