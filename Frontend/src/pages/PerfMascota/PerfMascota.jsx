import React, { useState, useEffect } from "react";
import SidebarCliente from "../../components/Sidebar/SidebarCliente";
import Select from "react-select";
import { FaShieldDog } from "react-icons/fa6";
export default function PerfMascota() {
  const [input, setInput] = useState({
    nombre: "",
    edad: 8,
    especie: "",
    raza: "",
    comportamiento: "",
    contacto_veterinario: "",
    comentarios_extra: "",
    id_cliente: "b",
  });

  const handleInputChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const options = [
    { value: "perro", label: "Perro" },
    { value: "gato", label: "Gato" },
  ];

  return (
    <>
      <div class="h-full w-full overflow-y-auto bg-gradient-to-tr from-azul4/90 to-azul3">
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto outline-none focus:outline-none ">
          <SidebarCliente />
          <div className=" relative w-7/12 my-6 mx-auto ">
            {/*content*/}
            <div className="border-2 rounded-r-lg shadow-lg relative flex flex-col w-full bg-azul4 outline-silver border-black/75">
              {/*header*/}
              <div className=" flex text-white items-start justify-between p-5 border-b border-solid border-white rounded-t">
                <h3 className="text-2xl font-semibold inline-flex items-center">
                  Perfil Mascota <FaShieldDog className="text-3xl ml-2" />
                </h3>
              </div>
              {/*body*/}

              <form>
                <div className="relative p-6 flex-auto">
                  <div class="w-full ">
                    <div class="md:flex md:items-center mb-6">
                      <div class="">
                        <label
                          class="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                          for="inline-full-name"
                        >
                          Nombre:
                        </label>
                      </div>
                      <div class="w-full mr-[250px]">
                        <input
                          class="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          name="nombre"
                          onChange={handleInputChange}
                        ></input>
                      </div>
                    </div>
                    <div class="md:flex md:items-center mb-6">
                      <div class="">
                        <label
                          class="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                          for="inline-full-name"
                        >
                          Especie:
                        </label>
                      </div>
                      <div class="w-full mr-[250px]">
                        <Select
                          options={options}
                          name="especie"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div class="md:flex md:items-center mb-6">
                      <div class="">
                        <label
                          class="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                          for="inline-full-name"
                        >
                          Raza:
                        </label>
                      </div>
                      <div class="w-full mr-[250px]">
                        <input
                          class="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          name="raza"
                          onChange={handleInputChange}
                        ></input>
                      </div>
                    </div>

                    <div className="columns-2 gap-1">
                      <div class="md:flex md:items-center mb-6">
                        <div class="">
                          <label
                            class="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                            for="inline-full-name"
                          >
                            Edad:
                          </label>
                        </div>
                        <div class="w-full mr-[50px]">
                          <input
                            class="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-full-name"
                            type="number"
                            name="edad"
                            onChange={handleInputChange}
                          ></input>
                        </div>
                      </div>
                      <div class="md:flex md:items-center mb-6">
                        <div class="">
                          <label
                            class="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                            for="inline-full-name"
                          >
                            Contacto Veterinario:
                          </label>
                        </div>
                        <div class="w-full mr-[50px]">
                          <input
                            class="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-full-name"
                            type="text"
                            name="contacto_veterinario"
                            onChange={handleInputChange}
                          ></input>
                        </div>
                      </div>
                    </div>
                    <div class="md:flex md:items-center mb-6">
                      <div class="">
                        <label
                          class="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                          for="inline-full-name"
                        >
                          Comportamiento:
                        </label>
                      </div>
                      <div class="w-full mr-[50px]">
                        <input
                          class="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          name="comportamiento"
                          onChange={handleInputChange}
                        ></input>
                      </div>
                    </div>
                    <label
                      class="block text-white font-bold md:text-left mb-1 md:mb-2 pr-4"
                      for="inline-full-name"
                    >
                      Comentarios extra:
                    </label>
                    <div class="md:flex md:items-center mb-6">
                      <div class=""></div>
                      <div class="w-full ">
                        <textarea
                          class="bg-white appearance-none h-20 overflow-y-auto border-2 border-gray-200 rounded w-full py- px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          name="comentarios_extra"
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </form>

              {/*footer*/}

              <div className="flex items-center justify-end p-1 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-white bg-verde3 hover:bg-verde4 transition duration-300 ease-in-out rounded font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
