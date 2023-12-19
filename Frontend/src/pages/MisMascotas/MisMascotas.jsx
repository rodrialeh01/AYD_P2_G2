import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { GiDogHouse } from "react-icons/gi";
import { MdPets } from "react-icons/md";
import Service from "../../Service/Service";
import SidebarCliente from "../../components/Sidebar/SidebarCliente";
import { useUser } from "../../userCtx/User";

const MisMascotas = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [fechaFinHospedaje, setFechaFinHospedaje] = useState("");
    const [idMascota, setIdMascota] = useState("");
    const { logged, setLogged } = useUser();
    const [mascotas, setMascotas] = useState([]);
    useEffect(() => {
        if (!logged) {
            navigate("/")
        }
        const user = JSON.parse(localStorage.getItem("data_user"));
        console.log(user);
        if (user.rol !== 1) {
            navigate("/");
        }
        Service.getPetsByClient(user.id)
        .then((res) => {
            console.log(res);
            setMascotas(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    const handleCloseModal = () => {
        setIdMascota("");
        setModalOpen(false);
    };

    const handleDateChange = (e) => {
        if(e.target.value){
            setFechaFinHospedaje(e.target.value);
        }
    };
    const handleHospedarModel = (id) => {
        setIdMascota(id);
        setModalOpen(true);
    }

    const parseDate = (fechaOriginal) => {
        const partesFecha = fechaOriginal.split("-");
        const nuevaFecha = `${partesFecha[2]}/${partesFecha[1]}/${partesFecha[0]}`;
        return nuevaFecha;
    };

    const hospedarMascota = () => {
        const data = {
            id_pet: idMascota,
            fecha_devolucion: parseDate(fechaFinHospedaje),
        }
        console.log(data);
        Service.hostPet(data)
        .then((res) => {
            console.log(res)
            toast.success("Tu mascota se hospedó con exito!", {
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
            toast.error("Error al hospedar mascota", {
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

    return(
        <div className="flex bg-azul3">
            <Toaster />
            <SidebarCliente/>
            <div className="p-7 text-2xl font-semibold flex-1 h-screen overflow-y-scroll scrollbar-hide  border-l-2 border-white">
                <div className="pb-4">
                    <h1 className="text-white text-3xl">
                    <MdPets className="text-4xl inline-block mr-2" />
                    Mis Mascotas
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:gris-cols-3 xl:grid-cols-3 gap-6">
                {mascotas.map((mascota, index) => (
                    mascota.especie.toLowerCase() === "perro" ? (
                        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-verde3 dark:bg-verde4">
                        <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="https://i.pinimg.com/originals/72/ef/b6/72efb6fe3a22146a7b2d26aff93cc55a.png" alt=""/>
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{mascota.nombre}</h5>
                            <p className="mb-3 text-lg font-normal text-black dark:textblack">
                            <span className="font-bold">Edad: </span>{mascota.edad}<br/>
                            <span className="font-bold">Raza: </span>{mascota.raza}<br/>
                            <span className="font-bold">Comportamiento: </span>{mascota.comportamiento}<br/>
                            <span className="font-bold">Contacto del Veterinario: </span><span className="text-base">{mascota.contacto_veterinario}</span><br/>
                            <span className="font-bold">Comentarios: </span><span className="text-sm">{mascota.comentarios_extra}</span><br/>
                            <span className={`${mascota.is_hospedada?'':'hidden'}`}><span className="font-bold">Fin de hospedaje: </span><span className="text-base">{mascota.fecha_devolucion}</span><br/></span>
                            <span className={`${mascota.is_hospedada?'':'hidden'}`}><span className="font-bold">Estado: </span>{mascota.is_atendida?mascota.estado:'En espera de ser atendida'}</span>
                            </p>
                            <button
                            className="mb-2 sm:mb-0 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-azul4 hover:bg-azul5 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                            type="button"
                            disabled={mascota.is_hospedada}
                            onClick={() => handleHospedarModel(mascota._id)}
                            >
                            <GiDogHouse className="text-2xl inline-block mr-2" /> {mascota.is_hospedada?'Hospedado':'Hospedar'}
                            </button>
                        </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-verde3 dark:bg-verde4">
                        <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="https://i.pinimg.com/originals/b0/8a/66/b08a66bd6a5d35b3d9a1bc11ebbcca83.png" alt=""/>
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{mascota.nombre}</h5>
                            <p className="mb-3 text-lg font-normal text-black dark:textblack">
                            <span className="font-bold">Edad: </span>{mascota.edad}<br/>
                            <span className="font-bold">Raza: </span>{mascota.raza}<br/>
                            <span className="font-bold">Comportamiento: </span>{mascota.comportamiento}<br/>
                            <span className="font-bold">Contacto del Veterinario: </span><span className="text-base">{mascota.contacto_veterinario}</span><br/>
                            <span className="font-bold">Comentarios: </span><span className="text-sm">{mascota.comentarios_extra}</span><br/>
                            <span className={`${mascota.is_hospedada?'':'hidden'}`}><span className="font-bold">Fin de hospedaje: </span><span className="text-base">{mascota.fecha_devolucion}</span><br/></span>
                            <span className={`${mascota.is_hospedada?'':'hidden'}`}><span className="font-bold">Estado: </span>{mascota.is_atendida?mascota.estado:'En espera de ser atendida'}</span>
                            </p>
                            <button
                            className="mb-2 sm:mb-0 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-azul4 hover:bg-azul5 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                            type="button"
                            disabled={mascota.is_hospedada}
                            >
                            <GiDogHouse className="text-2xl inline-block mr-2" /> {mascota.is_hospedada?'Hospedado':'Hospedar'}
                            </button>
                        </div>
                        </div>
                    )
                    ))}

                    
                    
                </div>
            </div>
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center">
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-50 z-10" 
                    onClick={handleCloseModal}
                ></div>
                <div className="bg-verde6 p-4 rounded-md shadow-md z-20"> {/* Ajusta el z-index del modal */}
                    {/* Contenido del modal */}
                    <h2 className="text-black font-bold text-xl"><GiDogHouse className="text-xl inline-block mr-2"/>Hospedar</h2>
                    <p className="font-light text-black">Selecciona la fecha en que termina su hospedaje</p>
                    <form>
                    <div className="mb-4">
                        <label htmlFor="fecha" className="block text-black font-bold mb-2">
                        Fecha:
                        </label>
                        <input
                        type="date"
                        id="fecha"
                        name="fecha"
                        min={new Date().toISOString().split("T")[0]}
                        onChange={handleDateChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                        />
                    </div>
                    <button
                        type="button"
                        className="bg-green-500 text-white p-2 mr-2 rounded hover:bg-blue-700"
                        onClick={hospedarMascota}
                    >Hospedar</button>

                    <button
                        type="button"
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                        onClick={handleCloseModal}
                    >
                        Cerrar
                    </button>
                    </form>
                </div>
                </div>
            )}
        </div>
    );
}

export default MisMascotas;