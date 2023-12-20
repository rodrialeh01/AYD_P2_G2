import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Select from "react-select";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Service from "../../Service/Service";

export default function Registro() {
  const [rolSelect, setRolSelect] = useState(0);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    birthDate: "",
    password: "",
    role: "0",
  });

  const handleInputChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelect = (value) => {
    setRolSelect(value);
  };

  function parseDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }

  const options = [
    { value: "0", label: "Cuidador" },
    { value: "1", label: "Cliente" },
  ];

  const validPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    input.birthDate = parseDate(input.birthDate);
    console.log(input);
    input.role = rolSelect;
    if (!validPassword(input.password)) {
      toast.error(
        "Error al registrar - La contraseña debe tener mínimo 8 caracteres, una mayúscula y un número.",
        {
          position: "upper-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      return;
    }
    try {
      const res = await Service.registro(input);
      if (res.status === 200) {
        toast.success("Registro exitoso", {
          position: "upper-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        toast.error(res.data.message, {
          position: "upper-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al registrar", {
        position: "upper-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <Toaster />
      <div className="h-screen md:flex font">
        <div
          className="fuente3 relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-verde1 to-verde4 i justify-around items-center hidden"
          style={{
            backgroundImage:
              "url('https://i.postimg.cc/g2FL7Fw2/imagen-2023-12-16-192405927.png')",
            backgroundColor: "rgba(127, 63, 191, 0.7)",
            backgroundSize: "cover",
            backgroundPosition: "center right",
          }}
        >
          <div style={{ width: "400px", height: "400px" }}>
            <div className="flex items-center justify-center">
              <img
                src="https://i.ibb.co/VDSqVFN/animal-care.png"
                alt="animal-care"
                border="0"
                className="object-cover items-center flex justify-center"
              />
            </div>
          </div>
        </div>
        <div className="flex md:w-1/2 justify-center py-10 items-center bg-gradient-to-tr from-verde5 to-verde3">
          <form className="">
            <h1 className="text-white font-bold text-4xl mb-1 ">
              <span>Bienvenido</span>, Regístrate
            </h1>
            <p className="text-s font-normal text-white mb-7">
              Hotel Huellita Feliz - Lo mejor para tu mascota
            </p>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-verde1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>

              <input
                className="pl-2 outline-none border-none bg-transparent text-white placeholder-black placeholder-opacity-50"
                type="text"
                name="name"
                id="name"
                placeholder="Nombre"
                onChange={handleInputChange}
                required
                style={{ width: "100%" }}
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-verde1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none bg-transparent text-white placeholder-black placeholder-opacity-50"
                type="text"
                name="lastName"
                id="lastName"
                onChange={handleInputChange}
                placeholder="Apellido"
                required
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 25 25"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-verde1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>

              <input
                className="pl-2 outline-none border-none bg-transparent text-white placeholder-black placeholder-opacity-50"
                type="number"
                name="phone"
                id="phone"
                placeholder="Número de Teléfono"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-verde1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none bg-transparent text-white placeholder-black placeholder-opacity-50"
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
                placeholder="Correo Electrónico"
                required
                style={{ width: "100%" }}
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-verde1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>

              <input
                className="pl-2 outline-none border-none bg-transparent text-white placeholder-black placeholder-opacity-50"
                type="password"
                name="password"
                id="password"
                onChange={handleInputChange}
                placeholder="Contraseña"
                required
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3  rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-verde1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>

              <input
                className="pl-2 outline-none border-none bg-transparent text-white "
                type="date"
                name="birthDate"
                id="birthDate"
                onChange={handleInputChange}
                placeholder="fecha_nacimiento"
                required
              />
            </div>

            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-verde1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>

              <Select
                className="py-2 px-3 rounded-2xl w-full"
                classNamePrefix="select"
                defaultValue={options[0]}
                name="rol"
                id="rol"
                options={options}
                onChange={(e) => handleSelect(e.value)}
              />
            </div>

            <button
              type="submit"
              className="block w-full bg-azul4 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 hover:bg-azul5 transition duration-300 ease-in-out"
              onClick={(e) => handleSubmit(e)}
            >
              Registrar
            </button>
            <p className="mt-6 text-xs text-white text-center">
              También puedes{" "}
              <Link
                to="/"
                className="border-b border-white-500 border-dotted text-white-500 hover:text-gray-800 transition-all duration-300 ease-in-out"
              >
                Iniciar Sesion
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
