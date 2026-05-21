import {
  useState,
  useEffect
} from 'react';

import { useNavigate } from 'react-router-dom';

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [isFactoryAdmin, setIsFactoryAdmin] =
    useState(false);

  const [adminCode, setAdminCode] =
    useState('');


  /* AUTO LOGIN */

  useEffect(() => {

    const isLoggedIn =
      localStorage.getItem(
        'isLoggedIn'
      );

    const isFactoryAdminLogged =
      localStorage.getItem(
        'isFactoryAdmin'
      );


    if (isLoggedIn) {

      navigate('/dashboard');

    }

    if (isFactoryAdminLogged) {

      navigate('/factory-admin');

    }

  }, []);


  const login = () => {

    /* FACTORY ADMIN LOGIN */

    if (isFactoryAdmin) {

      const savedCode =
        localStorage.getItem(
          'factoryAdminCode'
        ) || '1234';


      if (adminCode === savedCode) {

        localStorage.setItem(
          'isFactoryAdmin',
          'true'
        );

        navigate('/factory-admin');

      }

      else {

        alert(
          'Invalid Factory Admin Code'
        );

      }

      return;
    }


    /* TECHNICIAN LOGIN */

    const technicians =
      JSON.parse(
        localStorage.getItem(
          'technicians'
        )
      ) || [];


    const technician =
      technicians.find(
        (tech) =>
          tech.email === email &&
          tech.password === password
      );


    if (!technician) {

      alert(
        'Invalid email or password'
      );

      return;
    }


    /* BLOCK DISABLED TECHNICIANS */

    if (
      technician.status === 'DISABLED'
    ) {

      alert(
        'Your account has been disabled by Factory Admin'
      );

      return;
    }


    /* SUCCESS LOGIN */

    localStorage.setItem(
      'isLoggedIn',
      'true'
    );

    localStorage.setItem(
      'currentTechnician',
      technician.email
    );

    navigate('/dashboard');

  };


  return (

    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">

      <div className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-3xl p-10">

        <h1 className="text-5xl font-bold text-cyan-400 mb-3">
          Smart Diagnostic
        </h1>

        <p className="text-zinc-400 mb-10">
          Industrial AI Diagnostic Platform
        </p>


        <div className="space-y-6">

          {!isFactoryAdmin && (

            <>
              <input
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Technician Email"
                className="w-full bg-zinc-800 p-5 rounded-2xl outline-none"
              />

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Password"
                className="w-full bg-zinc-800 p-5 rounded-2xl outline-none"
              />
            </>

          )}


          <div className="bg-zinc-800 rounded-2xl p-5 flex justify-between items-center">

            <p className="text-lg">
              I am Factory Admin
            </p>

            <input
              type="checkbox"
              checked={isFactoryAdmin}
              onChange={() =>
                setIsFactoryAdmin(
                  !isFactoryAdmin
                )
              }
              className="w-6 h-6"
            />

          </div>


          {isFactoryAdmin && (

            <input
              value={adminCode}
              onChange={(e) =>
                setAdminCode(e.target.value)
              }
              placeholder="Factory Admin Code"
              className="w-full bg-zinc-800 p-5 rounded-2xl outline-none"
            />

          )}

        </div>


        <button
          onClick={login}
          className="w-full bg-cyan-500 hover:bg-cyan-400 transition text-black font-bold py-5 rounded-2xl mt-10"
        >
          LOGIN
        </button>


        {!isFactoryAdmin && (

          <button
            onClick={() =>
              navigate('/register')
            }
            className="w-full bg-zinc-800 hover:bg-zinc-700 transition py-5 rounded-2xl mt-5"
          >
            CREATE TECHNICIAN ACCOUNT
          </button>

        )}

      </div>

    </div>

  );
}