import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const language =
    localStorage.getItem(
      'language'
    ) || 'en';


  const translations = {

    en: {

      title:
        'Smart Diagnostic',

      subtitle:
        'Industrial AI Diagnostic Platform',

      email:
        'Technician Email',

      password:
        'Password',

      admin:
        'I am Factory Admin',

      adminCode:
        'Factory Admin Secret Code',

      wrongCode:
        'Wrong admin secret code',

      login:
        'LOGIN',

      create:
        'CREATE TECHNICIAN ACCOUNT',

      error:
        'Invalid email or password'
    },


    fr: {

      title:
        'Smart Diagnostic',

      subtitle:
        'Plateforme IA Industrielle',

      email:
        'Email Technicien',

      password:
        'Mot de passe',

      admin:
        'Je suis Admin Usine',

      adminCode:
        'Code Secret Admin',

      wrongCode:
        'Code admin incorrect',

      login:
        'CONNEXION',

      create:
        'CRÉER COMPTE TECHNICIEN',

      error:
        'Email ou mot de passe invalide'
    },


    ar: {

      title:
        'Smart Diagnostic',

      subtitle:
        'منصة التشخيص الصناعي الذكية',

      email:
        'بريد الفني',

      password:
        'كلمة المرور',

      admin:
        'أنا مدير المصنع',

      adminCode:
        'الرمز السري للمدير',

      wrongCode:
        'رمز المدير غير صحيح',

      login:
        'تسجيل الدخول',

      create:
        'إنشاء حساب فني',

      error:
        'البريد أو كلمة المرور خاطئة'
    }

  };


  const t =
    translations[language];


  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [isAdmin, setIsAdmin] =
    useState(false);

  const [adminSecret,
    setAdminSecret] =
    useState('');


  const handleLogin =
    async () => {

    try {

      await signInWithEmailAndPassword(

        auth,
        email.trim(),
        password

      );


      if (isAdmin) {

        if (
          adminSecret !== '1234'
        ) {

          alert(
            t.wrongCode
          );

          return;
        }


        localStorage.setItem(
          'isFactoryAdmin',
          'true'
        );

        navigate(
          '/factory-admin'
        );

      } else {

        localStorage.setItem(
          'isLoggedIn',
          'true'
        );

        localStorage.setItem(
          'currentTechnician',
          email.trim()
        );

        navigate('/dashboard');
      }

    } catch (error) {

      console.log(error);

      alert(t.error);

    }

  };


  return (

    <div className="min-h-screen bg-black flex items-center justify-center p-4">

      <div className="w-full max-w-xl bg-[#11131d] rounded-3xl p-6 md:p-12 border border-zinc-800">

        <h1 className="text-5xl md:text-7xl font-bold text-cyan-400">
          {t.title}
        </h1>

        <p className="text-gray-400 mt-4 text-lg">
          {t.subtitle}
        </p>


        <div className="mt-10 space-y-6">

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            placeholder={t.email}
            className="w-full bg-[#23232b] text-white p-5 rounded-2xl outline-none border border-zinc-700"
          />


          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            placeholder={t.password}
            className="w-full bg-[#23232b] text-white p-5 rounded-2xl outline-none border border-zinc-700"
          />


          <div className="w-full bg-[#23232b] text-white p-5 rounded-2xl flex justify-between items-center border border-zinc-700">

            <span>
              {t.admin}
            </span>

            <input
              type="checkbox"
              checked={isAdmin}
              onChange={() =>
                setIsAdmin(!isAdmin)
              }
              className="w-6 h-6"
            />

          </div>


          {isAdmin && (

            <input
              type="password"
              value={adminSecret}
              onChange={(e) =>
                setAdminSecret(
                  e.target.value
                )
              }
              placeholder={t.adminCode}
              className="w-full bg-[#23232b] text-white p-5 rounded-2xl outline-none border border-zinc-700"
            />

          )}


          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-cyan-500 hover:bg-cyan-400 transition text-black font-bold py-5 rounded-2xl text-lg"
          >
            {t.login}
          </button>


          <button
            type="button"
            onClick={() =>
              navigate('/register')
            }
            className="w-full bg-[#23232b] hover:bg-zinc-700 transition text-white py-5 rounded-2xl border border-zinc-700"
          >
            {t.create}
          </button>

        </div>

      </div>

    </div>
  );
}