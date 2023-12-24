import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaUserLarge } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Service from "../../../Service/Service";
import SidebarCuidador from "../../../components/Sidebar/SidebarCuidador";
const EditProfileC = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    _id: "",
    name: "",
    lastName: "",
    phone: "",
    email: "",
    birthDate: "",
    password: "",
    role: 0,
  });

  const validPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(password);
  };

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("data_user"));
    if (!usuario) {
      navigate("/");
    }
    
    if (usuario.rol !== 0) {
      navigate("/");
    }


    obtenerUsuario();
    console.log(userDetails.birthDate);
    userDetails.birthDate = parseDate2(userDetails.birthDate);

  }, []);

  const handleInputChange = (event) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value,
    });
  };

  function parseDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }

  function parseDate2(inputDate) {
    const parts = inputDate.split("/");
    const jsDate = new Date(parts[2], parts[1] - 1, parts[0]);

    const day = jsDate.getDate().toString().padStart(2, "0");
    const month = (jsDate.getMonth() + 1).toString().padStart(2, "0");
    const year = jsDate.getFullYear().toString();

    return `${year}-${month}-${day}`;
  }

  const handleEditar = async (event) => {
    event.preventDefault();
    try {

      if (userDetails.name === "" || userDetails.lastName === "" || userDetails.phone === "" || userDetails.birthDate === "") {
        toast.error("Por favor, llene todos los campos", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        return;
      }

      console.log(userDetails.birthDate);
      console.log(userDetails.password);
      if (userDetails.password === undefined) {
        userDetails.password = null;
      }
      if (userDetails.password !== null && userDetails.password !== undefined) {
        if (!validPassword(userDetails.password)) {
          toast.error("La contraseña debe tener al menos 8 caracteres, una mayúscula y un número", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          return;
        }
      }

      const data = {
        name: userDetails.name,
        lastName: userDetails.lastName,
        phone: userDetails.phone,
        birthDate: parseDate(userDetails.birthDate),
        password: userDetails.password,
      };

      console.log(data);

      const res = await Service.editUser(userDetails._id, data);
      if (res.status === 200) {
        toast.success("Perfil editado correctamente", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate("/petcare/profile");
      }
    } catch (error) {
      toast.error("Error al editar el perfil", {
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

  const obtenerUsuario = async () => {
    try {
      const data = JSON.parse(localStorage.getItem("data_user"));
      const res = await Service.getUser(data.id);
      if (res.status === 200) {
        setUserDetails(res.data.data);
        res.data.data.birthDate = parseDate2(res.data.data.birthDate);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlerRegresar = () => {
    navigate("/petcare/profile")
  };

  return (
    <div className="flex bg-gradient-to-tr bg-verde3/70">
      <SidebarCuidador />
      <div className="p-7 text-2xl font-semibold flex-1 h-screen overflow-y-scroll scrollbar-hide  border-l-2 border-white">
        <Toaster />
        <div>
          <h1 className="text-zinc-900 text-3xl">
            <FaUserLarge className="text-3xl inline-block mr-2" />
            Editar Mi Perfil
          </h1>
        </div>
        <div className="flex items-center justify-center p-12">
          <div className="mx-auto w-full max-w-[550px]">
            <form
            >
              <div className="mb-5 pt-3">
                <label className="mb-5 block text-base font-semibold text-zinc-900 sm:text-xl">
                  Nombre Completo
                </label>
                <div className="-mx-3 flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-base font-medium text-zinc-900"
                      >
                        Nombre
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Ingresa tu Nombre"
                        defaultValue={userDetails.name}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-base font-medium text-zinc-900"
                      >
                        Apellido
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Ingresa tu Apellido"
                        defaultValue={userDetails.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="phone"
                  className="mb-3 block text-base font-medium text-zinc-900"
                >
                  Número de Teléfono
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Ingresa tu número de teléfono"
                  defaultValue={userDetails.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="mb-3 block text-base font-medium text-zinc-900"
                >
                  Dirección de correo electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Ingresa tu correo"
                  defaultValue={userDetails.email}
                  onChange={handleInputChange}
                  disabled={true}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="mb-3 block text-base font-medium text-zinc-900"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Ingresa tu contraseña"
                  defaultValue={userDetails.password}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="date"
                  className="mb-3 block text-base font-medium text-zinc-900"
                >
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  name="birthDate"
                  id="birthDate"
                  defaultValue={(userDetails.birthDate)}
                  required
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div>
                <button
                  className={`hover:bg-[#1F6564] transition duration-300 ease-in-out w-full rounded-md bg-[#257F75] py-3 px-8 mb-3 shadow-xl border-2 border-[#1F6564]/90 py-3 px-8 text-center text-base font-semibold text-white  outline-none`}
                  onClick={(e) =>handleEditar(e)}
                >
                  Aplicar Cambios
                </button>
                <button
                  className="hover:shadow-form w-full rounded-md bg-white py-3 px-8 text-center text-base font-semibold text-rojo2 outline-none"
                  onClick={handlerRegresar}
                >
                  Regresar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileC;
