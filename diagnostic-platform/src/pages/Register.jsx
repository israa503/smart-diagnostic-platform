import { useState } from "react";

import {
  createUserWithEmailAndPassword
}
from "firebase/auth";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where
}
from "firebase/firestore";

import {
  auth,
  db
}
from "../firebase/firebase";

import {
  useNavigate
}
from "react-router-dom";


export default function Register() {

  const navigate = useNavigate();

  const language =
    localStorage.getItem('language')
    || 'en';


  const translations = {

    en: {

      title:
        'Technician Registration',

      subtitle:
        'Create industrial technician account',

      technicianName:
        'Technician Name',

      technicianId:
        'Technician ID',

      email:
        'Technician Email',

      password:
        'Password',

      confirmPassword:
        'Confirm Password',

      create:
        'CREATE TECHNICIAN ACCOUNT',

      creating:
        'CREATING ACCOUNT...',

      back:
        'BACK TO LOGIN',

      fill:
        'Please fill all fields',

      match:
        'Passwords do not match',

      emailExists:
        'Email already exists',

      idExists:
        'Technician ID already exists',

      success:
        'Account created successfully'
    },


    fr: {

      title:
        'Inscription Technicien',

      subtitle:
        'Créer un compte technicien industriel',

      technicianName:
        'Nom Technicien',

      technicianId:
        'ID Technicien',

      email:
        'Email Technicien',

      password:
        'Mot de passe',

      confirmPassword:
        'Confirmer mot de passe',

      create:
        'CRÉER COMPTE TECHNICIEN',

      creating:
        'CRÉATION DU COMPTE...',

      back:
        'RETOUR LOGIN',

      fill:
        'Veuillez remplir tous les champs',

      match:
        'Les mots de passe ne correspondent pas',

      emailExists:
        'Email déjà utilisé',

      idExists:
        'ID technicien déjà utilisé',

      success:
        'Compte créé avec succès'
    },


    ar: {

      title:
        'تسجيل الفني',

      subtitle:
        'إنشاء حساب فني صناعي',

      technicianName:
        'اسم الفني',

      technicianId:
        'رقم الفني',

      email:
        'بريد الفني',

      password:
        'كلمة المرور',

      confirmPassword:
        'تأكيد كلمة المرور',

      create:
        'إنشاء حساب فني',

      creating:
        'جاري إنشاء الحساب...',

      back:
        'العودة لتسجيل الدخول',

      fill:
        'يرجى ملء جميع الحقول',

      match:
        'كلمات المرور غير متطابقة',

      emailExists:
        'البريد مستخدم مسبقاً',

      idExists:
        'رقم الفني مستخدم مسبقاً',

      success:
        'تم إنشاء الحساب بنجاح'
    }

  };


  const t = translations[language];


  const [formData, setFormData] =
    useState({

      technicianName: "",
      technicianId: "",
      email: "",
      password: "",
      confirmPassword: ""

    });


  const [loading, setLoading] =
    useState(false);


  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };


  const handleRegister =
    async () => {

    const {

      technicianName,
      technicianId,
      email,
      password,
      confirmPassword

    } = formData;


    if (

      !technicianName ||
      !technicianId ||
      !email ||
      !password ||
      !confirmPassword

    ) {

      alert(t.fill);

      return;
    }


    if (
      password !== confirmPassword
    ) {

      alert(t.match);

      return;
    }


    try {

      setLoading(true);


      const emailQuery = query(

        collection(
          db,
          "technicians"
        ),

        where(
          "email",
          "==",
          email
        )

      );


      const emailSnapshot =
        await getDocs(
          emailQuery
        );


      if (
        !emailSnapshot.empty
      ) {

        alert(
          t.emailExists
        );

        setLoading(false);

        return;
      }


      const idQuery = query(

        collection(
          db,
          "technicians"
        ),

        where(
          "technicianId",
          "==",
          technicianId
        )

      );


      const idSnapshot =
        await getDocs(idQuery);


      if (
        !idSnapshot.empty
      ) {

        alert(
          t.idExists
        );

        setLoading(false);

        return;
      }


      const userCredential =
        await createUserWithEmailAndPassword(

          auth,
          email,
          password

        );


      await addDoc(

        collection(
          db,
          "technicians"
        ),

        {

          uid:
            userCredential.user.uid,

          technicianName,
          technicianId,
          email,

          role:
            "technician",

          tests: 0,
          faults: 0,
          history: [],

          status:
            "ACTIVE",

          createdAt:
            new Date()

        }

      );


      alert(t.success);

      navigate("/");

    } catch (error) {

      console.error(error);

      alert(error.message);

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="min-h-screen bg-black flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-[#111117] rounded-3xl p-6 md:p-10 border border-zinc-800 shadow-2xl">

        <h1 className="text-4xl md:text-6xl font-bold text-cyan-400 leading-tight">

          {t.title}

        </h1>


        <p className="text-gray-400 mt-3 mb-8">

          {t.subtitle}

        </p>


        <div className="space-y-5">

          <input
            type="text"
            name="technicianName"
            placeholder={t.technicianName}
            value={formData.technicianName}
            onChange={handleChange}
            className="w-full bg-[#23232b] text-white rounded-2xl px-5 py-4 outline-none border border-zinc-700"
          />


          <input
            type="text"
            name="technicianId"
            placeholder={t.technicianId}
            value={formData.technicianId}
            onChange={handleChange}
            className="w-full bg-[#23232b] text-white rounded-2xl px-5 py-4 outline-none border border-zinc-700"
          />


          <input
            type="email"
            name="email"
            placeholder={t.email}
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-[#23232b] text-white rounded-2xl px-5 py-4 outline-none border border-zinc-700"
          />


          <input
            type="password"
            name="password"
            placeholder={t.password}
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-[#23232b] text-white rounded-2xl px-5 py-4 outline-none border border-zinc-700"
          />


          <input
            type="password"
            name="confirmPassword"
            placeholder={t.confirmPassword}
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full bg-[#23232b] text-white rounded-2xl px-5 py-4 outline-none border border-zinc-700"
          />


          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-400 transition text-black font-bold py-4 rounded-2xl"
          >

            {loading
              ? t.creating
              : t.create}

          </button>


          <button
            onClick={() =>
              navigate("/")
            }
            className="w-full bg-[#23232b] hover:bg-zinc-700 transition text-white py-4 rounded-2xl border border-zinc-700"
          >

            {t.back}

          </button>

        </div>

      </div>

    </div>

  );
}