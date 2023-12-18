import React, {useState} from "react";
import toast, { Toaster } from "react-hot-toast";
import "./Login.css";

export default function Login() {

  const [input, setInput] = useState({
    email_user: "",
    pass_user: "",
  });

  const handleInputChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(input);
    toast.success("Iniciando Sesión");
  }


  

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
                  <h1 className="text-2xl xl:text-3xl font-bold">
                    Inicia Sesión
                  </h1>
                  <div className="w-full flex-1 mt-8">
                    <div className="mx-auto max-w-xs">
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium text-black bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="email"
                        placeholder="Email"
                        id="email_user"
                        name="email_user"
                        onChange={handleInputChange}
                      />
                      <input
                        className="w-full px-8 mt-5 py-4 rounded-lg font-medium text-black bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="password"
                        placeholder="Contraseña"
                        id="pass_user"
                        name="pass_user"
                        onChange={handleInputChange}
                      />
                      <button
                        className="mt-5 tracking-wide font-semibold bg-verde3 text-black w-full py-4 rounded-lg hover:bg-verde4 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                        type="button"
                        onClick={(e)=>handleSubmit(e)}
                      >
                        <span className="ml-3">Iniciar Sesión</span>
                      </button>
                      <p className="mt-6 text-xs text-black text-center">
                        Si no tienes una cuenta, Registrate Aqui
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
