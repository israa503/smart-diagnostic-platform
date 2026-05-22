import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {

  const navigate = useNavigate();

  const currentLanguage =
    localStorage.getItem(
      'language'
    ) || 'en';


  const translations = {

    en: {

      dashboard: 'Dashboard',
      aiAssistant: 'AI Assistant',
      analytics: 'Analytics',
      diagnostic: 'Diagnostic',
      history: 'History',
      settings: 'Settings',
      logout: 'LOGOUT',

      title: 'Settings',

      subtitle:
        'Configure diagnostic system',

      config:
        'SYSTEM CONFIG',

      technicianName:
        'Technician Name',

      language:
        'Language',

      changePassword:
        'Change Password',

      newPassword:
        'New Password',

      autoScan:
        'Auto Scan',

      autoScanDesc:
        'Automatic cable detection',

      aiMonitoring:
        'AI Monitoring',

      aiMonitoringDesc:
        'Enable AI diagnostics',

      notifications:
        'Notifications',

      notificationsDesc:
        'Receive alerts',

      save:
        'SAVE SETTINGS',

      success:
        'Settings saved successfully'
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
        'Paramètres',

      subtitle:
        'Configurer le système',

      config:
        'CONFIGURATION',

      technicianName:
        'Nom Technicien',

      language:
        'Langue',

      changePassword:
        'Changer mot de passe',

      newPassword:
        'Nouveau mot de passe',

      autoScan:
        'Scan Automatique',

      autoScanDesc:
        'Détection automatique câble',

      aiMonitoring:
        'Surveillance IA',

      aiMonitoringDesc:
        'Activer diagnostics IA',

      notifications:
        'Notifications',

      notificationsDesc:
        'Recevoir alertes',

      save:
        'ENREGISTRER',

      success:
        'Paramètres enregistrés'
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
        'الإعدادات',

      subtitle:
        'إعداد نظام التشخيص',

      config:
        'إعدادات النظام',

      technicianName:
        'اسم الفني',

      language:
        'اللغة',

      changePassword:
        'تغيير كلمة المرور',

      newPassword:
        'كلمة مرور جديدة',

      autoScan:
        'الفحص التلقائي',

      autoScanDesc:
        'كشف الكابلات تلقائياً',

      aiMonitoring:
        'مراقبة الذكاء',

      aiMonitoringDesc:
        'تفعيل تشخيص الذكاء',

      notifications:
        'الإشعارات',

      notificationsDesc:
        'استقبال التنبيهات',

      save:
        'حفظ الإعدادات',

      success:
        'تم حفظ الإعدادات'
    }

  };


  const t =
    translations[
      currentLanguage
    ];


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
        tech.email ===
        currentTechEmail
    );


  const [technicianName,
    setTechnicianName] =
    useState(
      technician?.name ||
      technician?.technicianName ||
      ''
    );


  const [language,
    setLanguage] =
    useState(
      currentLanguage
    );


  const [newPassword,
    setNewPassword] =
    useState('');


  const [autoScan,
    setAutoScan] =
    useState(

      JSON.parse(
        localStorage.getItem(
          'autoScan'
        )
      ) ?? true

    );


  const [aiMonitoring,
    setAiMonitoring] =
    useState(

      JSON.parse(
        localStorage.getItem(
          'aiMonitoring'
        )
      ) ?? true

    );


  const [notifications,
    setNotifications] =
    useState(

      JSON.parse(
        localStorage.getItem(
          'notifications'
        )
      ) ?? true

    );


  const handleLogout = () => {

    localStorage.removeItem(
      'isLoggedIn'
    );

    localStorage.removeItem(
      'isFactoryAdmin'
    );

    localStorage.removeItem(
      'currentTechnician'
    );

    navigate('/');

  };


  const saveSettings = () => {

    localStorage.setItem(
      'language',
      language
    );


    localStorage.setItem(
      'autoScan',
      JSON.stringify(
        autoScan
      )
    );


    localStorage.setItem(
      'aiMonitoring',
      JSON.stringify(
        aiMonitoring
      )
    );


    localStorage.setItem(
      'notifications',
      JSON.stringify(
        notifications
      )
    );


    const updatedTechnicians =
      technicians.map((tech) => {

        if (
          tech.email ===
          currentTechEmail
        ) {

          return {

            ...tech,

            name:
              technicianName,

            technicianName:
              technicianName,

            password:
              newPassword ||
              tech.password

          };

        }

        return tech;

      });


    localStorage.setItem(

      'technicians',

      JSON.stringify(
        updatedTechnicians
      )

    );


    alert(
      translations[
        language
      ].success
    );


    window.location.reload();

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

          <button
            onClick={() =>
              navigate('/history')
            }
            className="w-full text-left bg-zinc-800 p-4 rounded-2xl"
          >
            {t.history}
          </button>

          <button className="w-full text-left bg-cyan-500 text-black font-bold p-4 rounded-2xl">
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
            {t.config}
          </div>

        </div>


        <div className="space-y-6">

          <div className="bg-zinc-900 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-4">
              {t.technicianName}
            </h2>

            <input
              value={technicianName}
              onChange={(e) =>
                setTechnicianName(
                  e.target.value
                )
              }
              className="w-full bg-zinc-800 p-5 rounded-2xl outline-none"
              placeholder={t.technicianName}
            />

          </div>


          <div className="bg-zinc-900 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-4">
              {t.language}
            </h2>

            <select
              value={language}
              onChange={(e) =>
                setLanguage(
                  e.target.value
                )
              }
              className="w-full bg-zinc-800 p-5 rounded-2xl outline-none"
            >

              <option value="en">
                English
              </option>

              <option value="fr">
                Français
              </option>

              <option value="ar">
                العربية
              </option>

            </select>

          </div>


          <div className="bg-zinc-900 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-4">
              {t.changePassword}
            </h2>

            <input
              type="password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }
              className="w-full bg-zinc-800 p-5 rounded-2xl outline-none"
              placeholder={t.newPassword}
            />

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