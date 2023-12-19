import React, { useEffect, useState } from "react";
import { FaUserLarge } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Service from "../../../Service/Service";
import toast, { Toaster } from "react-hot-toast";
import SidebarCliente from "../../../components/Sidebar/SidebarCliente";
const EditProfile = () => {

  const navigate = useNavigate();

  const validPassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(password);
  };

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

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("data_user"));
    if (!usuario) {
      navigate("/");
    }

    if (usuario.rol !== 1) {
      navigate("/");
    }

    
    obtenerUsuario();

    userDetails.birthDate = parseDate(userDetails.birthDate);


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
        navigate("/user/profile");
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
      navigate("/user/profile");

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
    navigate("/user/profile");
  };

  return (
    
    <div className="flex bg-gradient-to-tr from-azul4/90 to-azul3  ">
      <SidebarCliente />
      <div className="p-7 text-2xl font-semibold flex-1 h-screen overflow-y-scroll scrollbar-hide  border-l-2 border-white">
        <Toaster />
        <div>
          <h1 className="text-white text-3xl">
            <FaUserLarge className="text-3xl inline-block mr-2" />
            Editar Mi Perfil
          </h1>
        </div>
        <div class="flex items-center justify-center p-12">
          <div class="mx-auto w-full max-w-[550px]">
            <form
              onSubmit={(e) => {
                handleEditar(e);
              }}
            >
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
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Ingresa tu Nombre"
                        defaultValue={userDetails.name}
                        onChange={handleInputChange}
                        required
                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
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
                      <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder="Ingresa tu Apellido"
                        defaultValue={userDetails.lastName}
                        onChange={handleInputChange}
                        required
                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
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
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Ingresa tu número de teléfono"
                  defaultValue={userDetails.phone}
                  onChange={handleInputChange}
                  required
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div class="mb-5">
                <label
                  for="email"
                  class="mb-3 block text-base font-medium text-white"
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
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div class="mb-5">
                <label
                  for="name"
                  class="mb-3 block text-base font-medium text-white"
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

                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div class="mb-5">
                <label
                  for="date"
                  class="mb-3 block text-base font-medium text-white"
                >
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  name="birthDate"
                  id="birthDate"
                  defaultValue={userDetails.birthDate}
                  onChange={handleInputChange}
                  required
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div>
              <button
                    className={`hover:bg-[#334173] transition duration-300 ease-in-out w-full rounded-md bg-[#48578E] py-3 px-8 mb-3 shadow-xl border-2 border-[#334173]/90 py-3 px-8 text-center text-base font-semibold text-white outline-none`}
                    onClick={(e) => handleEditar(e)}
                  >
                
                  Aplicar Cambios
                </button>
                <button
                  class="hover:shadow-form w-full rounded-md bg-white py-3 px-8 text-center text-base font-semibold text-rojo2 outline-none"
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

export default EditProfile;
