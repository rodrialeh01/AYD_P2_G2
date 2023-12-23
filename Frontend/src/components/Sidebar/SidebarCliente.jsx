import React, { useEffect, useState } from "react";
import { FaShieldDog, FaUserLarge } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { MdPets } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import hflogo2 from "../../assets/logo2.png";
import { useUser } from "../../userCtx/User";

const SidebarCliente = () => {
    const [open, setOpen] = useState(true);
    const { logged, setLogged } = useUser();
    useEffect(() => {
        console.log(logged);
        if (logged) {
          const user = JSON.parse(localStorage.getItem("data_user"));
          console.log(localStorage.getItem('data_user'));
        }
    }, [logged]);
    const Menus = [
        {
            name: "Mi Perfil",
            icon: <FaUserLarge className="text-3xl"/>,
            path: "/user/profile",
        },
        {
            name: "Crear Perfil de mi Mascota",
            icon: <FaShieldDog className="text-3xl"/>,
            path: "/user/profilepet",
        },
        {
            name: "Mis Mascotas",
            icon: <MdPets className="text-3xl"/>,
            path: "/user/mypets",
        }
    ]
    const navigate = useNavigate();

    const handlerGoTo = (path) => {
        navigate(path);
    }

    const Logout = () => {
        localStorage.removeItem("data_user");
        setLogged(false);
        navigate("/");
    }
    return(
        <div className="flex">
            <div className={`${open ? 'w-72' : 'w-20'} duration-300 h-screen p-5 pt-8 bg-azul4 relative`}>
                <img
                    src="https://png.pngtree.com/png-vector/20190423/ourlarge/pngtree-left-direction-arrow-icon-png-image_971494.jpg"
                    className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-azul4 ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                />
                <div className="flex gap-x-4 items-center mb-9">
                    <img
                        src={hflogo2}
                        className={`cursor-pointer duration-500 w-10 h-10 text-white ${open && "rotate-[360deg]"}`}
                    >
                  </img>
                  <h1 className={`text-white origin-left font-medium text-xl duration-300 ${!open && 'hidden'}`}>Huellita Feliz</h1>
                </div>
                <ul>
                    {Menus.map((item, index) => (
                        <li key={index} className={`text-white text-sm flex items-center gap-x-4 cursor-pointer pt-2 mt-2 pb-2 mb-2 hover:bg-azul3 rounded-md`} onClick={() => handlerGoTo(item.path)}>
                            <div className={`${!open ? 'mr-4' : ''}`}>{item.icon}</div>
                            <span className={`${!open && 'hidden'} origin-left duration-200`}>{item.name}</span>
                        </li>
                    ))}
                    <li key={Menus.length} className={`text-white text-sm flex items-center gap-x-4 cursor-pointer pt-2 mt-2 pb-2 mb-2 hover:bg-azul3 rounded-md`} onClick={Logout}>
                        <div className={`${!open ? 'mr-4' : ''}`}><IoLogOut className="text-3xl"/></div>
                        <span className={`${!open && 'hidden'} origin-left duration-200`}>{"Cerrar Sesión"}</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SidebarCliente;