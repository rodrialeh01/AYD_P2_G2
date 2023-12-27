import { useEffect, useState } from "react";
import { FaStore } from "react-icons/fa6";
import Service from "../../Service/Service";
import SidebarCliente from "../../components/Sidebar/SidebarCliente";
const TiendaCliente = () => {
    const [productos, setProductos] = useState([]);
    useEffect(() => {
      Service.getProducts()
      .then((res) => {
        console.log(res.data.data);
        setProductos(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }, []);
    return (
        <>
            <div className="flex bg-azul3">
                <SidebarCliente/>
                <div className="p-7 text-2xl font-semibold flex-1 h-screen overflow-y-scroll scrollbar-hide  border-l-2 border-white">
                    <div className="pb-4">
                        <h1 className="text-white text-3xl">
                        <FaStore className="text-4xl inline-block mr-2" />
                        Tienda
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:gris-cols-3 xl:grid-cols-3 gap-6">
                    {productos.map((product, index) => (
                        <div key={index} className="flex flex-col items-center justify-center shadow-md rounded-lg max-w-sm bg-verde6 m-4 border-white border-2">
                            <a href="#">
                            <img className="rounded-t-lg p-8 align-middle items-center" src={product.image} alt="product image" />
                            </a>
                            <div className="px-5 pb-5">
                            <a href="#">
                                <h3 className="text-black font-semibold text-xl tracking-tight">{product.name}</h3>
                            </a>
                            <p className="text-black font-bold text-base">Cantidad: <span className="font-normal">{product.quantity}</span></p>
                            <p className="text-black text-base font-normal">{product.description}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-3xl font-bold text-black">Q{product.price}</span>
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default TiendaCliente;