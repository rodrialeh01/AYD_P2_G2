import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { GiDogHouse } from "react-icons/gi";
import { SiDatadog } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import Service from "../../Service/Service";
import SidebarCuidador from '../../components/Sidebar/SidebarCuidador';
import { useUser } from "../../userCtx/User";
const MascotasHospedadas = () => {
    const [mascotas, setMascotas] = useState([]);
    const [iduser, setIduser] = useState({});
    const [cantidadMascotasAtendidas, setCantidadMascotasAtendidas] = useState(0);
    const { logged } = useUser();
    const navigate = useNavigate();
    useEffect(() => {
        if (!logged) {
            navigate("/")
        }
        const user = JSON.parse(localStorage.getItem("data_user"));
        setIduser(user.id);
        console.log(user);
        if (user.rol !== 0) {
            navigate("/user/profile");
        }

        Service.getPetsAttended(user.id)
        .then((res) => {
            console.log(res.data.data);
            setCantidadMascotasAtendidas(res.data.data.length);
        })
        .catch((err) => {
            console.log(err);
        });

        Service.getPets()
        .then((res) => {
            console.log(res.data.data);
            setMascotas(res.data.data.filter((mascota) => mascota.is_hospedada === true && mascota.is_atendida === false && !filtroestado(mascota.estado)));
        })
        .catch((err) => {
            console.log(err);
        });


    }, []);

    const filtroestado = (estado) => {
        return String(estado).toLowerCase() === "listo para recoger"
    }

    const AtenerMascota = (id) => {
        
        if(cantidadMascotasAtendidas === 2){
            toast.error("No puedes atender a más de 2 mascotas!", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        const data = {
            id_pet: id,
            id_cuidador: iduser
        }
        console.log(data)
        Service.attendPet(data)
        .then((res) => {
            console.log(res.data.data);
            toast.success("La mascota sera atendida por ti!", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined, 
            });
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        })
        .catch((err) => {
            console.log(err);
            toast.error("Hubo un error al querer atender a la mascota", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    }

    return (
        <div className="flex bg-gradient-to-tr bg-verde3/70">
            <SidebarCuidador/>
            <Toaster />
            <div className="p-7 text-2xl font-semibold flex-1 h-screen overflow-y-scroll scrollbar-hide  border-l-2 border-white">
                <div className="pb-4">
                    <h1 className="text-black text-3xl">
                    <GiDogHouse className="text-4xl inline-block mr-2" />
                    Mascotas Hospedadas
                    </h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:gris-cols-3 xl:grid-cols-3 gap-6">
                {mascotas.map((mascota, index) => (
                    mascota.especie.toLowerCase() === "perro" ? (
                        <div key={index} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-azul3 dark:bg-azul4">
                        <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="https://i.pinimg.com/originals/72/ef/b6/72efb6fe3a22146a7b2d26aff93cc55a.png" alt=""/>
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{mascota.nombre}</h5>
                            <p className="mb-3 text-lg font-normal text-black dark:textblack">
                            <span className="font-bold">Edad: </span>{mascota.edad}<br/>
                            <span className="font-bold">Raza: </span>{mascota.raza}<br/>
                            <span className="font-bold">Comportamiento: </span>{mascota.comportamiento}<br/>
                            <span className="font-bold">Contacto del Veterinario: </span><span className="text-base">{mascota.contacto_veterinario}</span><br/>
                            <span className="font-bold">Comentarios: </span><span className="text-sm">{mascota.comentarios_extra}</span><br/>
                            <span className="font-bold">Fin de hospedaje: </span><span className="text-base">{mascota.fecha_devolucion}</span><br/>
                            </p>
                            <button
                            className="mb-2 sm:mb-0 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-verde4 hover:bg-verde6 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                            type="button"
                            onClick={() => AtenerMascota(mascota._id)}
                            >
                            <SiDatadog className="text-2xl inline-block mr-2" /> Atender Mascota
                            </button>
                        </div>
                        </div>
                    ) : (
                        <div key={index} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-azul3 dark:bg-azul4">
                        <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="https://i.pinimg.com/originals/b0/8a/66/b08a66bd6a5d35b3d9a1bc11ebbcca83.png" alt=""/>
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{mascota.nombre}</h5>
                            <p className="mb-3 text-lg font-normal text-black dark:textblack">
                            <span className="font-bold">Edad: </span>{mascota.edad}<br/>
                            <span className="font-bold">Raza: </span>{mascota.raza}<br/>
                            <span className="font-bold">Comportamiento: </span>{mascota.comportamiento}<br/>
                            <span className="font-bold">Contacto del Veterinario: </span><span className="text-base">{mascota.contacto_veterinario}</span><br/>
                            <span className="font-bold">Comentarios: </span><span className="text-sm">{mascota.comentarios_extra}</span><br/>
                            <span className="font-bold">Fin de hospedaje: </span><span className="text-base">{mascota.fecha_devolucion}</span><br/>
                            </p>
                            <button
                            className="mb-2 sm:mb-0 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-verde4 hover:bg-verde6 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                            type="button"
                            onClick={() => AtenerMascota(mascota._id)}
                            >
                            <SiDatadog className="text-2xl inline-block mr-2" /> Atender Mascota
                            </button>
                        </div>
                        </div>
                    )
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MascotasHospedadas;