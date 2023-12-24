import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUserLarge } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Service from "../../../Service/Service";
import SidebarCliente from "../../../components/Sidebar/SidebarCliente";
export default function Perfil() {
  const navigate = useNavigate();


  const handleEdit = () => {
    navigate("/user/editprofile");
  };

  const usuario = JSON.parse(localStorage.getItem("data_user"));
  useEffect(() => {
    if (!usuario) {
      navigate("/");
    }

    if (usuario.rol !== 1) {
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
      <div className="flex bg-gradient-to-tr from-azul4/90 to-azul3">
        <SidebarCliente />
        <div className="p-7 text-2xl font-semibold flex-1 h-screen overflow-y-scroll scrollbar-hide  border-l-2 border-white">
          <div>
            <h1 className="text-white text-3xl" data-test-id="title">
              <FaUserLarge className="text-3xl inline-block mr-2" />
              Mi Perfil
            </h1>
          </div>
          <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px]">
              <form>
                <div className="mb-5 pt-3">
                  <label className="mb-5 block text-base font-semibold text-white sm:text-xl">
                    Nombre Completo
                  </label>
                  <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2">
                      <div className="mb-5">
                        <label
                          htmlFor="name"
                          className="mb-3 block text-base font-medium text-white"
                        >
                          Nombre
                        </label>
                        <h2 className="text-4xl text-white font-light">
                          {dataUser.name}
                        </h2>
                      </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
                      <div className="mb-5">
                        <label
                          htmlFor="name"
                          className="mb-3 block text-base font-medium text-white"
                        >
                          Apellido
                        </label>
                        <h2 className="text-4xl text-white font-light">
                          {dataUser.lastName}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="phone"
                    className="mb-3 block text-base font-medium text-white"
                  >
                    Número de Teléfono
                  </label>
                  <h2 className="text-4xl text-white font-light">
                    +502 {dataUser.phone}
                  </h2>
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="mb-3 block text-base font-medium text-white"
                  >
                    Dirección de correo electrónico
                  </label>
                  <h2 className="text-4xl text-white font-light">{dataUser.email}</h2>
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="date"
                    className="mb-3 block text-base font-medium text-white"
                  >
                    Fecha de Nacimiento
                  </label>
                  <h2 className="text-4xl text-white font-light">{dataUser.birthDate}</h2>
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="mb-3 block text-base font-medium text-white"
                  >
                    Rol
                  </label>
                  <h2 className="text-4xl text-white font-light"> Cliente</h2>
                </div>
                <div>
                  <button
                    className={`hover:bg-[#334173] transition duration-300 ease-in-out w-full rounded-md bg-[#48578E] shadow-xl border-2 border-[#334173]/90 py-3 px-8 text-center text-base font-semibold text-white outline-none`}
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
