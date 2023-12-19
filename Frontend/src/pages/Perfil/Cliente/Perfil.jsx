import React, { useEffect, useState } from "react";
import { FaUserLarge } from "react-icons/fa6";
import SidebarCliente from "../../../components/Sidebar/SidebarCliente";
export default function Perfil() {
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
      <div className="flex bg-gradient-to-tr from-azul4/90 to-azul3">
        <SidebarCliente />
        <div className="p-7 text-2xl font-semibold flex-1 h-screen overflow-y-scroll scrollbar-hide  border-l-2 border-white">
          <div>
            <h1 className="text-white text-3xl">
              <FaUserLarge className="text-3xl inline-block mr-2" />
              Mi Perfil
            </h1>
          </div>
          <div class="flex items-center justify-center p-12">
            <div class="mx-auto w-full max-w-[550px]">
              <form>
                <div class="mb-5 pt-3">
                  <label class="mb-5 block text-base font-semibold text-white sm:text-xl">
                    Nombre Completo
                  </label>
                  <div class="-mx-3 flex flex-wrap">
                    <div class="w-full px-3 sm:w-1/2">
                      <div class="mb-5">
                        <label
                          for="name"
                          class="mb-3 block text-base font-medium text-white"
                        >
                          Nombre
                        </label>
                        <h2 className="text-4xl text-white font-light">
                          {dataUser.nombre}
                        </h2>
                      </div>
                    </div>
                    <div class="w-full px-3 sm:w-1/2">
                      <div class="mb-5">
                        <label
                          for="name"
                          class="mb-3 block text-base font-medium text-white"
                        >
                          Apellido
                        </label>
                        <h2 className="text-4xl text-white font-light">
                          {dataUser.apellido}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mb-5">
                  <label
                    for="phone"
                    class="mb-3 block text-base font-medium text-white"
                  >
                    Número de Teléfono
                  </label>
                  <h2 className="text-4xl text-white font-light">
                    +502 {dataUser.telefono}
                  </h2>
                </div>
                <div class="mb-5">
                  <label
                    for="email"
                    class="mb-3 block text-base font-medium text-white"
                  >
                    Dirección de correo electrónico
                  </label>
                  <h2 className="text-4xl text-white font-light"></h2>
                </div>

                <div class="mb-5">
                  <label
                    for="date"
                    class="mb-3 block text-base font-medium text-white"
                  >
                    Fecha de Nacimiento
                  </label>
                  <h2 className="text-4xl text-white font-light"></h2>
                </div>
                <div class="mb-5">
                  <label
                    for="email"
                    class="mb-3 block text-base font-medium text-white"
                  >
                    Rol
                  </label>
                  <h2 className="text-4xl text-white font-light"> Cliente</h2>
                </div>
                <div>
                  <button
                    className={`hover:bg-[#334173] transition duration-300 ease-in-out w-full rounded-md bg-[#48578E] shadow-xl border-2 border-[#334173]/90 py-3 px-8 text-center text-base font-semibold text-white outline-none`}
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
