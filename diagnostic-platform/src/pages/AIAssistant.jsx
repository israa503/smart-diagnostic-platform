import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AIAssistant() {

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

      title: 'AI Assistant',

      subtitle:
        'Intelligent industrial diagnostics',

      online: 'ONLINE',

      totalTests: 'Total Tests',
      faults: 'Faults',
      technician: 'Technician',
      aiStatus: 'AI Status',

      active: 'ACTIVE',

      askPlaceholder:
        'Ask about industrial diagnostics...',

      send: 'SEND',

      aiOnline:
        'Industrial AI Diagnostic Assistant Online.',

      restricted:
`I am an Industrial AI Diagnostic Assistant.

I only answer questions related to:

• industrial systems
• electrical diagnostics
• PLC / ESP32 systems
• machinery
• automation
• maintenance
• sensors
• electrical faults
• factory equipment`
    },


    fr: {

      dashboard: 'Tableau de bord',
      aiAssistant: 'Assistant IA',
      analytics: 'Analytiques',
      diagnostic: 'Diagnostic',
      history: 'Historique',
      settings: 'Paramètres',
      logout: 'DÉCONNEXION',

      title: 'Assistant IA',

      subtitle:
        'Diagnostic industriel intelligent',

      online: 'EN LIGNE',

      totalTests: 'Tests Totaux',
      faults: 'Défauts',
      technician: 'Technicien',
      aiStatus: 'Statut IA',

      active: 'ACTIF',

      askPlaceholder:
        'Posez une question industrielle...',

      send: 'ENVOYER',

      aiOnline:
        'Assistant IA industriel en ligne.',

      restricted:
`Je suis un assistant IA industriel.

Je réponds uniquement aux questions concernant :

• systèmes industriels
• diagnostics électriques
• PLC / ESP32
• machines
• automatisation
• maintenance
• capteurs
• équipements industriels`
    },


    ar: {

      dashboard: 'لوحة التحكم',
      aiAssistant: 'المساعد الذكي',
      analytics: 'التحليلات',
      diagnostic: 'التشخيص',
      history: 'السجل',
      settings: 'الإعدادات',
      logout: 'تسجيل الخروج',

      title: 'المساعد الذكي',

      subtitle:
        'تشخيص صناعي ذكي',

      online: 'متصل',

      totalTests: 'عدد الاختبارات',
      faults: 'الأعطال',
      technician: 'الفني',
      aiStatus: 'حالة الذكاء',

      active: 'نشط',

      askPlaceholder:
        'اسأل عن الأعطال الصناعية...',

      send: 'إرسال',

      aiOnline:
        'مساعد التشخيص الصناعي متصل.',

      restricted:
`أنا مساعد تشخيص صناعي ذكي.

أجيب فقط على الأسئلة المتعلقة بـ :

• الأنظمة الصناعية
• الأعطال الكهربائية
• PLC / ESP32
• الآلات
• الأتمتة
• الصيانة
• الحساسات
• المعدات الصناعية`
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


  const [messages, setMessages] =
    useState([
      {
        role: 'assistant',
        text: t.aiOnline
      }
    ]);


  const [input, setInput] =
    useState('');


  const industrialKeywords = [

    'motor',
    'sensor',
    'relay',
    'voltage',
    'current',
    'short circuit',
    'plc',
    'esp32',
    'machine',
    'factory',
    'temperature',
    'diagnostic',
    'fault',
    'alarm',
    'electric',
    'industrial',
    'automation',
    'wiring',
    'contactor',
    'breaker',
    'pump',
    'compressor',
    'bearing',
    'vibration',
    'power',
    'circuit',
    'pcb',
    'arduino',
    'resistor',
    'transistor',
    'fuse',
    'maintenance'

  ];


  const handleLogout = () => {

    localStorage.removeItem(
      'isLoggedIn'
    );

    localStorage.removeItem(
      'isFactoryAdmin'
    );

    navigate('/');

  };


  const generateAIResponse = (
    message
  ) => {

    const lowerMessage =
      message.toLowerCase();


    const isIndustrialQuestion =
      industrialKeywords.some(
        (keyword) =>
          lowerMessage.includes(keyword)
      );


    if (!isIndustrialQuestion) {

      return t.restricted;

    }


    if (
      lowerMessage.includes(
        'motor'
      )
    ) {

      return `
• verify supply voltage
• inspect bearings
• check overheating
• measure winding resistance
• inspect vibration levels
`;

    }


    if (
      lowerMessage.includes(
        'sensor'
      )
    ) {

      return `
• verify sensor voltage
• inspect signal wiring
• test calibration
• inspect communication protocol
`;

    }


    if (
      lowerMessage.includes(
        'short circuit'
      )
    ) {

      return `
• inspect damaged wiring
• verify insulation
• disconnect overloaded devices
• inspect PCB traces
• test continuity
`;

    }


    return `
Industrial diagnostic request received.

Recommended checks:

• inspect wiring
• verify power lines
• inspect sensors
• verify continuity
• inspect hardware connections
`;

  };


  const sendMessage = () => {

    if (!input.trim()) return;


    const userMessage = {

      role: 'user',
      text: input

    };


    const aiMessage = {

      role: 'assistant',

      text:
        generateAIResponse(input)

    };


    setMessages((prev) => [

      ...prev,
      userMessage,
      aiMessage

    ]);


    setInput('');

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

          <button className="w-full text-left bg-cyan-500 text-black font-bold p-4 rounded-2xl">
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


      <div className="flex-1 flex flex-col p-4 md:p-8">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              {t.title}
            </h1>

            <p className="text-zinc-400">
              {t.subtitle}
            </p>

          </div>


          <div className="bg-green-500 text-black px-6 py-3 rounded-2xl font-bold">
            {t.online}
          </div>

        </div>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">

          <div className="bg-zinc-900 p-6 rounded-3xl">

            <h3 className="text-zinc-400 mb-3">
              {t.totalTests}
            </h3>

            <p className="text-4xl font-bold text-cyan-400">
              {history.length}
            </p>

          </div>


          <div className="bg-zinc-900 p-6 rounded-3xl">

            <h3 className="text-zinc-400 mb-3">
              {t.faults}
            </h3>

            <p className="text-4xl font-bold text-red-400">

              {
                history.filter(
                  (item) =>
                    item.result.includes('SHORT') ||
                    item.result.includes('FAULT') ||
                    item.result.includes('NC')
                ).length
              }

            </p>

          </div>


          <div className="bg-zinc-900 p-6 rounded-3xl">

            <h3 className="text-zinc-400 mb-3">
              {t.technician}
            </h3>

            <p className="text-2xl font-bold text-green-400">
              {technician?.name || 'N/A'}
            </p>

          </div>


          <div className="bg-zinc-900 p-6 rounded-3xl">

            <h3 className="text-zinc-400 mb-3">
              {t.aiStatus}
            </h3>

            <p className="text-3xl font-bold text-green-400">
              {t.active}
            </p>

          </div>

        </div>


        <div className="flex-1 bg-zinc-900 rounded-3xl p-6 overflow-y-auto space-y-4 mb-6">

          {messages.map((message, index) => (

            <div
              key={index}
              className={`p-5 rounded-2xl max-w-[85%] ${
                message.role === 'user'
                  ? 'bg-cyan-500 text-black ml-auto'
                  : 'bg-zinc-800'
              }`}
            >
              {message.text}
            </div>

          ))}

        </div>


        <div className="flex gap-4">

          <input
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            placeholder={t.askPlaceholder}
            className="flex-1 bg-zinc-900 p-5 rounded-2xl outline-none"
          />

          <button
            onClick={sendMessage}
            className="bg-cyan-500 hover:bg-cyan-400 transition text-black font-bold px-8 rounded-2xl"
          >
            {t.send}
          </button>

        </div>

      </div>

    </div>

  );
}