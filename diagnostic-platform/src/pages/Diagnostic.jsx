import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  connectESP32,
  readESP32Data
}
from '../services/esp32Service';


export default function Diagnostic() {

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

      title:
        'Diagnostic System',

      subtitle:
        'Real-time ESP32 cable testing',

      testing:
        'TESTING...',

      ready:
        'READY',

      console:
        'ESP32 Diagnostic Console',

      waiting:
        'Waiting ESP32 data...',

      pressStart:
        'Press START to connect ESP32',

      start:
        'START DIAGNOSTIC',

      failed:
        'ESP32 connection failed'
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

      title:
        'Système Diagnostic',

      subtitle:
        'Test ESP32 en temps réel',

      testing:
        'TEST EN COURS...',

      ready:
        'PRÊT',

      console:
        'Console ESP32',

      waiting:
        'Attente des données ESP32...',

      pressStart:
        'Appuyez sur START pour connecter ESP32',

      start:
        'DÉMARRER DIAGNOSTIC',

      failed:
        'Connexion ESP32 échouée'
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
        'نظام التشخيص',

      subtitle:
        'اختبار ESP32 مباشر',

      testing:
        'جاري الاختبار...',

      ready:
        'جاهز',

      console:
        'وحدة تشخيص ESP32',

      waiting:
        'انتظار بيانات ESP32...',

      pressStart:
        'اضغط START للاتصال بـ ESP32',

      start:
        'ابدأ التشخيص',

      failed:
        'فشل الاتصال بـ ESP32'
    }

  };


  const t = translations[language];


  const [result, setResult] =
    useState('');


  const [testing, setTesting] =
    useState(false);


  const handleLogout = () => {

    localStorage.removeItem(
      'isLoggedIn'
    );

    localStorage.removeItem(
      'currentTechnician'
    );

    navigate('/');

  };


  const startDiagnostic =
    async () => {

    const connected =
      await connectESP32();

    if (!connected) {

      alert(t.failed);

      return;
    }

    setTesting(true);

    setResult(
      t.waiting
    );


    readESP32Data((data) => {

      const randomResult =
        data.trim();

      setResult(randomResult);

      setTesting(false);


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


      const updatedTechs =
        technicians.map((tech) => {

          if (
            tech.email === currentTechEmail
          ) {

            const updatedHistory =
              tech.history || [];

            updatedHistory.push({

              result: randomResult,

              date:
                new Date().toLocaleString()

            });

            return {

              ...tech,

              tests: tech.tests + 1,

              faults:
                randomResult.includes(
                  'SHORT'
                ) ||
                randomResult.includes(
                  'FAULT'
                ) ||
                randomResult.includes(
                  'NC'
                )
                  ? tech.faults + 1
                  : tech.faults,

              history: updatedHistory

            };

          }

          return tech;

        });


      localStorage.setItem(
        'technicians',
        JSON.stringify(updatedTechs)
      );

    });

  };


  return (

    <div className="min-h-screen bg-black text-white flex">

      <div className="w-72 bg-zinc-900 border-r border-zinc-800 p-6 hidden md:block">

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

          <button className="w-full text-left bg-cyan-500 text-black font-bold p-4 rounded-2xl">
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


      <div className="flex-1 p-4 md:p-8">

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
            testing
              ? 'bg-yellow-500 text-black'
              : 'bg-green-500 text-black'
          }`}>

            {testing
              ? t.testing
              : t.ready}

          </div>

        </div>


        <div className="bg-zinc-900 rounded-3xl p-6 md:p-10">

          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            {t.console}
          </h2>


          <div className="bg-black border border-zinc-700 rounded-3xl p-6 md:p-10 min-h-[250px] flex items-center justify-center mb-10">

            <p className="text-xl md:text-2xl text-cyan-400 text-center break-words">

              {result || t.pressStart}

            </p>

          </div>


          <button
            onClick={startDiagnostic}
            disabled={testing}
            className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-zinc-700 transition text-black font-bold py-6 rounded-3xl text-xl md:text-2xl"
          >
            {t.start}
          </button>

        </div>

      </div>

    </div>

  );
}