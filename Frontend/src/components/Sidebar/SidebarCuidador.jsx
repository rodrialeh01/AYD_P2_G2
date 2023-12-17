import React, { useState } from "react";
import { FaUserLarge } from "react-icons/fa6";
import { GiDogHouse } from "react-icons/gi";
import { IoLogOut } from "react-icons/io5";
import { SiDatadog } from "react-icons/si";
import hflogo from "../../assets/logo.png";

const SidebarCuidador = () => {
    const [open, setOpen] = useState(true);
    const Menus = [
        {
            name: "Mi Perfil",
            icon: <FaUserLarge className="text-3xl"/>,
            path: "/petcare/profile",
        },
        {
            name: "Mascotas Hospedadas",
            icon: <GiDogHouse className="text-3xl"/>,
            path: "/petcare/pets",
        },
        {
            name: "Atención a Mascotas",
            icon: <SiDatadog className="text-3xl"/>,
            path: "/petcare/atention",
        }
    ]
    return(
        <div className="flex">
            <div className={`${open ? 'w-72' : 'w-20'} duration-300 h-screen p-5 pt-8 bg-verde6 relative`}>
                <img
                    src="https://png.pngtree.com/png-vector/20190423/ourlarge/pngtree-left-direction-arrow-icon-png-image_971494.jpg"
                    className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-verde6 ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                />
                <div className="flex gap-x-4 items-center mb-9">
                    <img
                        src={hflogo}
                        className={`cursor-pointer duration-500 w-10 h-10 text-black ${open && "rotate-[360deg]"}`}
                    >
                  </img>
                  <h1 className={`text-black origin-left font-medium text-xl duration-300 ${!open && 'hidden'}`}>Huellita Feliz</h1>
                </div>
                <ul>
                    {Menus.map((item, index) => (
                        <li key={index} className={`text-zinc-700 text-sm flex items-center gap-x-4 cursor-pointer pt-2 mt-2 pb-2 mb-2 hover:bg-verde2 rounded-md`}>
                            <div className={`${!open ? 'mr-4' : ''}`}>{item.icon}</div>
                            <span className={`${!open && 'hidden'} origin-left duration-200`}>{item.name}</span>
                        </li>
                    ))}
                    <li key={Menus.length} className={`text-zinc-700 text-sm flex items-center gap-x-4 cursor-pointer pt-2 mt-2 pb-2 mb-2 hover:bg-verde2 rounded-md`}>
                        <div className={`${!open ? 'mr-4' : ''}`}><IoLogOut className="text-3xl"/></div>
                        <span className={`${!open && 'hidden'} origin-left duration-200`}>{"Cerrar Sesión"}</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SidebarCuidador;