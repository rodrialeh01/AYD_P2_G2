import React, { useEffect, useState } from "react";
import { FaUserLarge } from "react-icons/fa6";
import SidebarCuidador from "../../../components/Sidebar/SidebarCuidador";
import Service from "../../../Service/Service";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function PerfilC() {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate("/petcare/editprofile");
  };

  const usuario = JSON.parse(localStorage.getItem("data_user"));
  useEffect(() => {
    if (!usuario) {
      navigate("/");
    }

    if (usuario.rol !== 0) {
      navigate("/");
    }

    obtenerUsuario();
  }, []);

  const obtenerUsuario = async () => {
    try {
      const res = await Service.getUser(usuario.id);
      if (res.status === 200)
      { 
        setDataUser(res.data.data);
        console.log(res.data.data);
        console.log(dataUser);
      }
    }
    catch (error) {
      toast.error("Error al obtener los datos del usuario", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      

      console.log(error);
    }
  };

  const [dataUser, setDataUser] = useState({
    _id: "",
    name: "",
    lastName: "",
    phone: "",
    email: "",
    birthDate: "",
    password: "",
    role: 0,
  });

  return (
    <div>
      <div className="flex bg-verde3/70">
        <SidebarCuidador />
        <div className="p-7 text-2xl font-semibold flex-1 h-screen overflow-y-scroll scrollbar-hide  border-l-2 border-white">
          <div>
            <h1 className="text-zinc-700  text-3xl">
              <FaUserLarge className="text-3xl inline-block mr-2" />
              Mi Perfil
            </h1>
          </div>
          <div class="flex items-center justify-center p-12">
            <div class="mx-auto w-full max-w-[550px]">
              <form>
                <div class="mb-5 pt-3">
                  <label class="mb-5 block text-base font-semibold text-black  sm:text-xl">
                    Nombre Completo
                  </label>
                  <div class="-mx-3 flex flex-wrap">
                    <div class="w-full px-3 sm:w-1/2">
                      <div class="mb-5">
                        <label
                          for="name"
                          class="mb-3 block text-base font-medium text-black "
                        >
                          Nombre
                        </label>
                        <h2 className="text-4xl text-zinc-700  font-light">
                          {dataUser.name}
                        </h2>
                      </div>
                    </div>
                    <div class="w-full px-3 sm:w-1/2">
                      <div class="mb-5">
                        <label
                          for="name"
                          class="mb-3 block text-base font-medium text-black "
                        >
                          Apellido
                        </label>
                        <h2 className="text-4xl text-zinc-700  font-light">
                          {dataUser.lastName}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mb-5">
                  <label
                    for="phone"
                    class="mb-3 block text-base font-medium text-black "
                  >
                    Número de Teléfono
                  </label>
                  <h2 className="text-4xl text-zinc-700  font-light">
                    +502 {dataUser.phone}
                  </h2>
                </div>
                <div class="mb-5">
                  <label
                    for="email"
                    class="mb-3 block text-base font-medium text-black "
                  >
                    Dirección de correo electrónico
                  </label>
                  <h2 className="text-4xl text-zinc-700  font-light"> {dataUser.email} </h2>
                </div>

                <div class="mb-5">
                  <label
                    for="date"
                    class="mb-3 block text-base font-medium text-black "
                  >
                    Fecha de Nacimiento
                  </label>
                  <h2 className="text-4xl text-zinc-700  font-light">{dataUser.birthDate}</h2>
                </div>
                <div class="mb-5">
                  <label
                    for="email"
                    class="mb-3 block text-base font-medium text-black "
                  >
                    Rol
                  </label>
                  <h2 className="text-4xl text-zinc-700  font-light">
                    {" "}
                    Cuidador
                  </h2>
                </div>
                <div>
                  <button
                    className={`hover:bg-[#1F6564] transition duration-300 ease-in-out w-full rounded-md bg-[#257F75] shadow-xl border-2 border-[#1F6564]/90 py-3 px-8 text-center text-base font-semibold text-white  outline-none`}
                    onClick={handleEdit}
                  >
                    Editar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
