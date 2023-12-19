import React from 'react';
import { SiDatadog } from "react-icons/si";
import SidebarCuidador from '../../components/Sidebar/SidebarCuidador';
const AtenderMascota = () => {
    return (
        <div className="flex bg-gradient-to-tr bg-verde3/70">
            <SidebarCuidador/>
            <div className="p-7 text-2xl font-semibold flex-1 h-screen overflow-y-scroll scrollbar-hide  border-l-2 border-white">
                <div className="pb-4">
                    <h1 className="text-black text-3xl">
                    <SiDatadog className="text-4xl inline-block mr-2" />
                    Atender Mascota
                    </h1>
                </div>
            </div>
            
        </div>
    )
}

export default AtenderMascota