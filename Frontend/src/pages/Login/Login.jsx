import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Service from "../../Service/Service";
import { useUser } from "../../userCtx/User.jsx";
import "./Login.css";

export default function Login() {
  const { logged, setLogged } = useUser();
  const [input, setInput] = useState({
    email_user: "",
    pass_user: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (logged) {
      if (JSON.parse(localStorage.getItem("data_user")).rol === 0)
        navigate("/petcare/profile");
      else 
      navigate("/user/profile");
    }
  }, [logged]);

  const handleInputChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let data = {
        email: input.email_user,
        password: input.pass_user,
      }
      const res = await Service.login(data);
      if (res.status === 200) {
        const savedData = {
          id: res.data.data._id,
          rol: res.data.data.role,
        };
        localStorage.setItem("data_user", JSON.stringify(savedData));
        setLogged(true);
        toast.success("Inicio de sesión exitoso", {
          position: "bottom-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
       // setTimeout(() => {
          if (res.data.data.role === 0) {
            navigate("/petcare/profile");
          } else {
            navigate("/user/profile");
          }
        //}, 500);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="h-full bg-gradient-to-t from-[#395a8f] to-[#4e9fc1]">
        <div className="min-h-screen text-black loginbg flex items-center justify-center p-12">
          <div className="max-w-screen m-0 sm:m-10 bg-[#E9ECEE] shadow-2xl rounded-r-lg flex flex-1">
            <div
              className="hidden lg:flex lg:w-1/2 bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "url('https://i.postimg.cc/gjy7k60Z/imagen-2023-12-16-001220150.png')",
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
            ></div>

            <div className="lg:w-1/2 p-6 sm:p-12">
              <form>
                <div className="flex items-center justify-center">
                  <div style={{ width: "200px", height: "200px" }}>
                    <img
                      src="https://i.ibb.co/VDSqVFN/animal-care.png"
                      alt="animal-care"
                      border="0"
                    />
                  </div>
                </div>
                <div className="mt-12 flex flex-col items-center">
                  <h1 className="text-2xl xl:text-3xl font-bold" data-test-id="cypress-header-login">
                    Inicia Sesión
                  </h1>
                  <div className="w-full flex-1 mt-8">
                    <div className="mx-auto max-w-xs">
                      <input
                        data-test-id="cypress-email-login"
                        className="w-full px-8 py-4 rounded-lg font-medium text-black bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="email"
                        placeholder="Email"
                        id="email_user"
                        name="email_user"
                        onChange={handleInputChange}
                      />
                      <input
                        className="w-full px-8 mt-5 py-4 rounded-lg font-medium text-black bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        data-test-id="cypress-password-login"
                        type="password"
                        placeholder="Contraseña"
                        id="pass_user"
                        name="pass_user"
                        onChange={handleInputChange}
                      />
                      <button
                        className="mt-5 tracking-wide font-semibold bg-verde3 text-black w-full py-4 rounded-lg hover:bg-verde4 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                        type="button"
                        data-test-id="cypress-button-login"
                        onClick={(e) => handleSubmit(e)}
                      >
                        <span className="ml-3">Iniciar Sesión</span>
                      </button>
                      <p className="mt-6 text-xs text-black text-center">
                        Si no tienes una cuenta,{" "}
                        <Link
                          to="/registro"
                          className="border-b border-azul4 border-dotted text-blue-500 hover:text-blue-800 transition-all duration-300 ease-in-out"
                        >
                          Registrate Aqui
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
