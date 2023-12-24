import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaShieldDog } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Service from "../../Service/Service";
import SidebarCliente from "../../components/Sidebar/SidebarCliente";
export default function PerfMascota() {
  const [input, setInput] = useState({
    nombre: "",
    edad: 0,
    especie: "perro",
    raza: "",
    comportamiento: "",
    contacto_veterinario: "",
    comentarios_extra: "",
    id_cliente: "",
  });

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("data_user"));
    if (!usuario) {
      navigate("/");
    }

    if (usuario.rol !== 1) {
      navigate("/");
    }
    input.id_cliente = usuario.id;
  }, []);

  const navigate = useNavigate();

  const handleCrear = async (event) => {
    event.preventDefault();
    try {
      console.log(input);
      if ( input.nombre === "" || input.edad === 0 || input.especie === "" || input.raza === "" || input.comportamiento === "" || input.contacto_veterinario === "" || input.id_cliente === "") {
        toast.error("Por favor llene todos los campos", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        return;
      }

      const res = await Service.createPet(input);
      if (res.status === 200) {
        toast.success("Mascota creada exitosamente", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          navigate("/user/profile");
        }, 3000);
      } else {
        toast.error("Error al crear la mascota", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error("Error al crear la mascota", {
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

  const handleSelect = (value) => {
    setInput({
      ...input,
      especie: value,
    });
  };

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
      <div className="h-full w-full overflow-y-auto bg-gradient-to-tr from-azul4/90 to-azul3 ">
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto outline-none focus:outline-none ">
          <Toaster />
          <SidebarCliente />
          <div className="flex justify-center items-center h-screen w-full border-white border-l-2 ">
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
                    <div className="w-full ">
                      <div className="md:flex md:items-center mb-6">
                        <div className="">
                          <label
                            className="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                            htmlFor="inline-full-name"
                          >
                            Nombre:
                          </label>
                        </div>
                        <div className="w-full mr-[250px]">
                          <input
                            className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-full-name"
                            type="text"
                            name="nombre"
                            required
                            onChange={handleInputChange}
                          ></input>
                        </div>
                      </div>
                      <div className="md:flex md:items-center mb-6">
                        <div className="">
                          <label
                            className="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                            htmlFor="inline-full-name"
                          >
                            Especie:
                          </label>
                        </div>
                        <div className="w-full mr-[250px]">
                          <Select
                            className="py-2 px-3 rounded-2xl w-full"
                            classNamePrefix="select"
                            defaultValue={options[0]}
                            options={options}
                            onChange={(e) => handleSelect(e.value)}
                            name="especie"
                            id="especie"
                            required
                          />
                        </div>
                      </div>

                      <div className="md:flex md:items-center mb-6">
                        <div className="">
                          <label
                            className="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                            htmlFor="inline-full-name"
                          >
                            Raza:
                          </label>
                        </div>
                        <div className="w-full mr-[250px]">
                          <input
                            className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-full-name"
                            type="text"
                            name="raza"
                            required
                            onChange={handleInputChange}
                          ></input>
                        </div>
                      </div>

                      <div className="columns-2 gap-1">
                        <div className="md:flex md:items-center mb-6">
                          <div className="">
                            <label
                              className="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                              htmlFor="inline-full-name"
                            >
                              Edad:
                            </label>
                          </div>
                          <div className="w-full mr-[50px]">
                            <input
                              className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                              id="inline-full-name"
                              type="number"
                              name="edad"
                              required
                              onChange={handleInputChange}
                            ></input>
                          </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                          <div className="">
                            <label
                              className="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                              htmlFor="inline-full-name"
                            >
                              Contacto Veterinario:
                            </label>
                          </div>
                          <div className="w-full mr-[50px]">
                            <input
                              className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                              id="inline-full-name"
                              type="text"
                              name="contacto_veterinario"
                              required
                              onChange={handleInputChange}
                            ></input>
                          </div>
                        </div>
                      </div>
                      <div className="md:flex md:items-center mb-6">
                        <div className="">
                          <label
                            className="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                            htmlFor="inline-full-name"
                          >
                            Comportamiento:
                          </label>
                        </div>
                        <div className="w-full mr-[50px]">
                          <input
                            className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-full-name"
                            type="text"
                            name="comportamiento"
                            required
                            onChange={handleInputChange}
                          ></input>
                        </div>
                      </div>
                      <label
                        className="block text-white font-bold md:text-left mb-1 md:mb-2 pr-4"
                        htmlFor="inline-full-name"
                      >
                        Comentarios extra:
                      </label>
                      <div className="md:flex md:items-center mb-6">
                        <div className=""></div>
                        <div className="w-full ">
                          <textarea
                            className="bg-white appearance-none h-20 overflow-y-auto border-2 border-gray-200 rounded w-full py- px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-full-name"
                            type="text"
                            name="comentarios_extra"
                            onChange={handleInputChange}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*footer*/}

                  <div className="flex items-center justify-end p-1 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-white bg-verde3 hover:bg-verde4 transition duration-300 ease-in-out rounded font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                      onClick={(e) => handleCrear(e)}
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
