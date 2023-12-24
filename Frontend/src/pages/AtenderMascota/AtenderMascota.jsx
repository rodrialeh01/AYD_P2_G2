import { useEffect, useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { FaBirthdayCake, FaCat, FaDog } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { FiMessageCircle } from "react-icons/fi";
import { RiEmotionHappyLine } from "react-icons/ri";
import { SiDatadog } from "react-icons/si";
import { useNavigate } from 'react-router-dom';
import Service from '../../Service/Service';
import SidebarCuidador from '../../components/Sidebar/SidebarCuidador';
import { useUser } from "../../userCtx/User";
const AtenderMascota = () => {
    const [mascotas, setMascotas] = useState([]);
    const { logged } = useUser();
    const [estado, setEstado] = useState("🦴 Comiendo");
    const navigate = useNavigate();
    useEffect(() => {
        if(!logged){
            navigate("/")
        }
        const user = JSON.parse(localStorage.getItem("data_user"));
        Service.getPetsAttended(user.id)
        .then((res) => {
            console.log(res.data.data);
            setMascotas(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [logged, navigate]);

    const handleSelect = (e) => {
        setEstado(e.target.value);
    }

    const handleCambiarEstado = (id) => {
        const data = {
            id_pet: id,
            estado: estado
        }
        console.log(data);
        Service.updateStatus(data)
        .then((res) => {
            console.log(res.data);
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const mostrarDevolucion = (fecha) => {
        // Obtener la fecha actual
        const today = new Date();

        // Parsear la fecha de entrada en formato "dd/mm/yyyy"
        const [day, month, year] = fecha.split('/').map(Number);
        const inputDateObject = new Date(year, month - 1, day); // Restar 1 al mes ya que en JavaScript los meses van de 0 a 11

        // Comparar las fechas
        return today >= inputDateObject;        
    }
    const handleDevolverMascota = (id) => {
        Service.returnPet(id)
        .then((res) => {
            console.log(res.data);
            toast.success("La mascota fue devuelta exitosamente", {
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
            toast.error("Hubo un error al querer devolver a la mascota", {
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
            <Toaster />
            <SidebarCuidador/>
            <div className="p-7 text-2xl font-semibold flex-1 h-screen overflow-y-scroll scrollbar-hide  border-l-2 border-white">
                <div className="pb-4">
                    <h1 className="text-black text-3xl">
                    <SiDatadog className="text-4xl inline-block mr-2" />
                    Atención a Mascotas
                    </h1>
                </div>
                <div className="grid grid-cols-2 h-screen">
                    {mascotas.map((mascota, index) => (
                    mascota.especie.toLowerCase() === "perro"?(
                    <div key={index} className="col-span-1 p-8">
                        <div className="border-2 p-4 h-full bg-azul4 rounded-xl shadow-lg">
                            <div className="flex flex-col items-center pb-10">
                                <img className="w-24 h-24 mb-3" src="https://i.pinimg.com/originals/72/ef/b6/72efb6fe3a22146a7b2d26aff93cc55a.png" alt="Dog image"/>
                                <h5 className="mb-1 text-2xl font-medium text-gray-900 dark:text-white">{mascota.nombre}</h5>
                                <span className="text-lg text-black dark:text-black"><span className='font-bold'>Fin de Hospedaje: </span>{mascota.fecha_devolucion}</span>
                            </div>
                            <div>
                                <div className="p-4 md:p-5">
                                    <ol className="relative border-s border-verde1  ms-3.5 mb-4 md:mb-5">                  
                                        <li className="mb-10 ms-8">            
                                            <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-verde1 dark:ring-verde3 dark:bg-verde1">
                                                <FaBirthdayCake class="w-2.5 h-2.5 text-verde3 "/>
                                            </span>
                                            <h3 className="flex items-start mb-1 text-lg font-semibold text-gray-900 dark:text-white">Edad:&nbsp; <span className='font-normal'>{mascota.edad}</span></h3>
                                        </li>
                                        <li className="mb-10 ms-8">            
                                            <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-verde1 dark:ring-verde3 dark:bg-verde1">
                                                <FaDog class="w-3.5 h-3.5 text-verde3 "/>
                                            </span>
                                            <h3 className="flex items-start mb-1 text-lg font-semibold text-gray-900 dark:text-white">Raza:&nbsp; <span className='font-normal'>{mascota.especie}</span></h3>
                                        </li>
                                        <li className="mb-10 ms-8">            
                                            <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-verde1 dark:ring-verde3 dark:bg-verde1">
                                                <RiEmotionHappyLine class="w-3.5 h-3.5 text-verde3 "/>
                                            </span>
                                            <h3 className="flex items-start mb-1 text-lg font-semibold text-gray-900 dark:text-white">Comportamiento:&nbsp; <span className='font-normal'>{mascota.comportamiento}</span></h3>
                                        </li>
                                        <li className="mb-10 ms-8">            
                                            <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-verde1 dark:ring-verde3 dark:bg-verde1">
                                                <FaUserDoctor class="w-3.5 h-3.5 text-verde3 "/>
                                            </span>
                                            <h3 className="flex items-start mb-1 text-lg font-semibold text-gray-900 dark:text-white">Contacto del Veterinario:&nbsp; <span className='font-normal'>{mascota.contacto_veterinario}</span></h3>
                                        </li>
                                        <li className="mb-10 ms-8">
                                            <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-verde1 dark:ring-verde3 dark:bg-verde1">
                                            <FiMessageCircle class="w-3.5 h-3.5 text-verde3 "/>
                                            </span>
                                            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">Comentarios extra:</h3>
                                            <p className="block mb-3 text-base font-normal leading-none text-white">{mascota.comentarios_extra}</p>
                                        </li>
                                        <li className="mb-10 ms-8">
                                            <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-verde1 dark:ring-verde3 dark:bg-verde1">
                                                <svg className="w-2.5 h-2.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path fill="currentColor" d="M6 1a1 1 0 0 0-2 0h2ZM4 4a1 1 0 0 0 2 0H4Zm7-3a1 1 0 1 0-2 0h2ZM9 4a1 1 0 1 0 2 0H9Zm7-3a1 1 0 1 0-2 0h2Zm-2 3a1 1 0 1 0 2 0h-2ZM1 6a1 1 0 0 0 0 2V6Zm18 2a1 1 0 1 0 0-2v2ZM5 11v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 11v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 15v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 15v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 11v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM5 15v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM2 4h16V2H2v2Zm16 0h2a2 2 0 0 0-2-2v2Zm0 0v14h2V4h-2Zm0 14v2a2 2 0 0 0 2-2h-2Zm0 0H2v2h16v-2ZM2 18H0a2 2 0 0 0 2 2v-2Zm0 0V4H0v14h2ZM2 4V2a2 2 0 0 0-2 2h2Zm2-3v3h2V1H4Zm5 0v3h2V1H9Zm5 0v3h2V1h-2ZM1 8h18V6H1v2Zm3 3v.01h2V11H4Zm1 1.01h.01v-2H5v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H5v2h.01v-2ZM9 11v.01h2V11H9Zm1 1.01h.01v-2H10v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM9 15v.01h2V15H9Zm1 1.01h.01v-2H10v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM14 15v.01h2V15h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM14 11v.01h2V11h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM4 15v.01h2V15H4Zm1 1.01h.01v-2H5v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H5v2h.01v-2Z"/></svg>
                                            </span>
                                            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">Estado de la mascota:&nbsp; <span className={mascota.estado?'font-normal':'hidden'}>{mascota.estado}</span></h3>
                                            <div className="flex items-center">
                                                <form className="max-w-sm mb-2 mr-2">
                                                    <select id="countries" className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-verde3 focus:border-verde3 block w-full p-2.5 " onChange={handleSelect}>
                                                        <option value="🦴 Comiendo">🦴 Comiendo</option>
                                                        <option value="🦮 Paseando">🦮 Paseando</option>
                                                        <option value="🚿 Bañado">🚿 Bañado</option>
                                                        <option value="💤 Tomando la siesta">💤 Tomando la siesta</option>
                                                        <option value="🥎 Jugando">🥎 Jugando</option>
                                                    </select>
                                                </form>
                                                <button type="button" className="inline-flex items-center py-2 px-3 text-sm font-medium text-white focus:outline-none bg-verde3 rounded-lg border border-verde5 hover:bg-verde5 hover:text-white " onClick={() => handleCambiarEstado(mascota._id)}>
                                                    Actualizar Estado
                                                </button>
                                            </div>
                                        </li>
                                    </ol>
                                    <div>
                                        {mostrarDevolucion(mascota.fecha_devolucion)?
                                        <div><h2 className='flex items-center justify-center mb-2 text-white'>Llegó el día del fin del hospedaje!</h2>
                                        <p className='flex items-center justify-center mb-2 text-white text-base font-normal'>Tienes que devolver a la mascota</p>
                                        <button className="text-white inline-flex w-full justify-center bg-verde6 hover:bg-verde5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={() => handleDevolverMascota(mascota._id)}>
                                        Devolver Mascotas
                                        </button></div> :<></>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
                    :
                    (<div key={index} className="col-span-1 p-8">
                        <div className="border-2 p-4 h-full bg-azul4 rounded-xl shadow-lg">
                            <div className="flex flex-col items-center pb-10">
                                <img className="w-24 h-24 mb-3" src="https://i.pinimg.com/originals/b0/8a/66/b08a66bd6a5d35b3d9a1bc11ebbcca83.png" alt="Cat image"/>
                                <h5 className="mb-1 text-2xl font-medium text-gray-900 dark:text-white">{mascota.nombre}</h5>
                                <span className="text-lg text-black dark:text-black"><span className='font-bold'>Fin de Hospedaje: </span>{mascota.fecha_devolucion}</span>
                            </div>
                            <div>
                                <div className="p-4 md:p-5">
                                    <ol className="relative border-s border-verde1  ms-3.5 mb-4 md:mb-5">                  
                                        <li className="mb-10 ms-8">            
                                            <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-verde1 dark:ring-verde3 dark:bg-verde1">
                                                <FaBirthdayCake class="w-2.5 h-2.5 text-verde3 "/>
                                            </span>
                                            <h3 className="flex items-start mb-1 text-lg font-semibold text-gray-900 dark:text-white">Edad:&nbsp; <span className='font-normal'>{mascota.edad}</span></h3>
                                        </li>
                                        <li className="mb-10 ms-8">            
                                            <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-verde1 dark:ring-verde3 dark:bg-verde1">
                                                <FaCat class="w-3.5 h-3.5 text-verde3 "/>
                                            </span>
                                            <h3 className="flex items-start mb-1 text-lg font-semibold text-gray-900 dark:text-white">Raza:&nbsp; <span className='font-normal'>{mascota.raza}</span></h3>
                                        </li>
                                        <li className="mb-10 ms-8">            
                                            <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-verde1 dark:ring-verde3 dark:bg-verde1">
                                                <RiEmotionHappyLine class="w-3.5 h-3.5 text-verde3 "/>
                                            </span>
                                            <h3 className="flex items-start mb-1 text-lg font-semibold text-gray-900 dark:text-white">Comportamiento:&nbsp; <span className='font-normal'>{mascota.comportamiento}</span></h3>
                                        </li>
                                        <li className="mb-10 ms-8">            
                                            <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-verde1 dark:ring-verde3 dark:bg-verde1">
                                                <FaUserDoctor class="w-3.5 h-3.5 text-verde3 "/>
                                            </span>
                                            <h3 className="flex items-start mb-1 text-lg font-semibold text-gray-900 dark:text-white">Contacto del Veterinario:&nbsp; <span className='font-normal'>{mascota.contacto_veterinario}</span></h3>
                                        </li>
                                        <li className="mb-10 ms-8">
                                            <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-verde1 dark:ring-verde3 dark:bg-verde1">
                                            <FiMessageCircle class="w-3.5 h-3.5 text-verde3 "/>
                                            </span>
                                            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">Comentarios extra:</h3>
                                            <p className="block mb-3 text-base font-normal leading-none text-white">{mascota.comentarios_extra}</p>
                                        </li>
                                        <li className="mb-10 ms-8">
                                            <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-verde1 dark:ring-verde3 dark:bg-verde1">
                                                <svg className="w-2.5 h-2.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path fill="currentColor" d="M6 1a1 1 0 0 0-2 0h2ZM4 4a1 1 0 0 0 2 0H4Zm7-3a1 1 0 1 0-2 0h2ZM9 4a1 1 0 1 0 2 0H9Zm7-3a1 1 0 1 0-2 0h2Zm-2 3a1 1 0 1 0 2 0h-2ZM1 6a1 1 0 0 0 0 2V6Zm18 2a1 1 0 1 0 0-2v2ZM5 11v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 11v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 15v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 15v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 11v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM5 15v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM2 4h16V2H2v2Zm16 0h2a2 2 0 0 0-2-2v2Zm0 0v14h2V4h-2Zm0 14v2a2 2 0 0 0 2-2h-2Zm0 0H2v2h16v-2ZM2 18H0a2 2 0 0 0 2 2v-2Zm0 0V4H0v14h2ZM2 4V2a2 2 0 0 0-2 2h2Zm2-3v3h2V1H4Zm5 0v3h2V1H9Zm5 0v3h2V1h-2ZM1 8h18V6H1v2Zm3 3v.01h2V11H4Zm1 1.01h.01v-2H5v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H5v2h.01v-2ZM9 11v.01h2V11H9Zm1 1.01h.01v-2H10v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM9 15v.01h2V15H9Zm1 1.01h.01v-2H10v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM14 15v.01h2V15h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM14 11v.01h2V11h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM4 15v.01h2V15H4Zm1 1.01h.01v-2H5v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H5v2h.01v-2Z"/></svg>
                                            </span>
                                            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">Estado de la mascota: <span className={mascota.estado?'font-normal':'hidden'}>{mascota.estado}</span></h3>
                                            <div className="flex items-center">
                                                <form className="max-w-sm mb-2 mr-2">
                                                    <select id="countries" className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-verde3 focus:border-verde3 block w-full p-2.5 " onChange={handleSelect}>
                                                        <option value="🦴 Comiendo">🦴 Comiendo</option>
                                                        <option value="🦮 Paseando">🦮 Paseando</option>
                                                        <option value="🚿 Bañado">🚿 Bañado</option>
                                                        <option value="💤 Tomando la siesta">💤 Tomando la siesta</option>
                                                        <option value="🥎 Jugando">🥎 Jugando</option>
                                                    </select>
                                                </form>
                                                <button type="button" className="inline-flex items-center py-2 px-3 text-sm font-medium text-white focus:outline-none bg-verde3 rounded-lg border border-verde5 hover:bg-verde5 hover:text-white " onClick={() => handleCambiarEstado(mascota._id)}>
                                                    Actualizar Estado
                                                </button>
                                            </div>
                                        </li>
                                    </ol>
                                    <div>
                                        {mostrarDevolucion(mascota.fecha_devolucion)?
                                        <div><h2 className='flex items-center justify-center mb-2 text-white'>Llegó el día del fin del hospedaje!</h2>
                                        <p className='flex items-center justify-center mb-2 text-white text-base font-normal'>Tienes que devolver a la mascota</p>
                                        <button className="text-white inline-flex w-full justify-center bg-verde6 hover:bg-verde5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={() => handleDevolverMascota(mascota._id)}>
                                        Devolver Mascotas
                                        </button></div> :<></>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
                    ))}
                </div>
            </div>
            
        </div>
    )
}

export default AtenderMascota