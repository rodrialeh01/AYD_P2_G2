import { useEffect, useState } from "react";
import SidebarCuidador from "../../components/Sidebar/SidebarCuidador";
import Service from "../../Service/Service";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function TiendaCuidador() {
  const usuario = JSON.parse(localStorage.getItem("data_user"));
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); //estado para el loading
  const [modalEditar, setModalEditar] = useState(false);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [idActual, setIDActual] = useState("");

  useEffect(() => {
    if (!usuario) {
      navigate("/");
    }

    if (usuario.rol !== 0) {
      navigate("/");
    }

    obtProducts();
  }, []);

  const obtProducts = async () => {
    try {
      let res = await Service.getProducts();
      if (res.status === 200) {
        setProducts(res.data.data);
        console.log(res.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [input, setInput] = useState({
    name: "",
    price: 0,
    description: "",
    image: "",
    quantity: 0,
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleEliminar = (id) => {
    console.log(id);
  };

  const handleEditar = async (idActual) => {
    console.log(idActual);
    try {
      let res = await Service.updateProduct(idActual, input);
      if (res.status === 200) {
        setModalEditar(false);
        setInput({
          name: "",
          price: 0,
          description: "",
          image: "",
          quantity: 0,
        });

        toast.success("Producto editado exitosamente", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        obtProducts();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al editar el producto", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleAdd = async () => {
    try {
      input.quantity = parseInt(input.quantity);
      input.price = parseInt(input.price);

      let res = await Service.createProduct(input);
      if (res.status === 200) {
        setModalAgregar(false);
        setInput({
          name: "",
          price: 0,
          description: "",
          image: "",
          quantity: 0,
        });

        toast.success("Producto agregado exitosamente", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        obtProducts();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al agregar el producto", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <>
      <div className="h-screen flex bg-verde4/90 ">
        <SidebarCuidador />
        <Toaster />
        <div className="flex flex-col  border-l-2 border-white w-full h-screen overflow-y-auto scrollbar-hide">
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="mt-5 flex flex-col items-center justify-center">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-9 h-9 mr-2 text-black" // Adjust the margin as needed
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                  />
                </svg>

                <h1 className="text-3xl text-black font-bold">Tienda</h1>
              </div>
            </div>
            <div className="flex justify-end mr-5">
              <button
                data-test-id="cypress-button-createProduct"
                className="hover:bg-[#1F6564] transition duration-300 ease-in-out rounded-md bg-[#257F75] shadow-xl border-2 border-[#1F6564]/90 py-3 px-8 text-center text-base font-semibold text-white  outline-none"
                onClick={() => {
                  setModalAgregar(true);
                }}
              >
                Agregar un nuevo producto
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:gris-cols-3 xl:grid-cols-3 gap-6 ml-3 mt-24">
              {loading ? null : (
                <>
                  {products.map((product, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center shadow-md rounded-lg max-w-sm bg-azul4 m-4 border-white border-2"
                    >
                      <a href="#">
                        <img
                          className="rounded-t-lg p-8 align-middle items-center"
                          src={product.image}
                          alt="product image"
                        />
                      </a>
                      <div className="px-5 pb-5">
                        <a href="#">
                          <h3 className="text-white font-semibold text-xl tracking-tight">
                            {product.name}
                          </h3>
                        </a>
                        <p className="text-white">{product.description}</p>
                        <p className="text-white font-bold text-base">
                          Cantidad:{" "}
                          <span className="font-normal">
                            {product.quantity}
                          </span>
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-3xl font-bold text-white">
                            Q{product.price}
                          </span>
                        </div>
                        <div className="flex items-center justify-between space-x-3 space-y-1">
                          <button
                            className="text-white bg-yellow-500 hover:bg-yellow-700 transition duration-300 ease-in-out focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            onClick={() => {
                              setModalEditar(true);
                              setInput(product);
                              setIDActual(product._id);
                            }}
                          >
                            Editar
                          </button>
                          <button
                            className="text-white bg-red-700 hover:bg-red-900 transition duration-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            onClick={() => handleEliminar(1)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        {modalEditar ? (
          <>
            <div className="shadow-[0_2px_15px_-3px_rgba(255,255,255.07),0_10px_20px_-2px_rgba(255,255,255,0.04)] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
              <div className=" relative w-7/12 my-6 mx-auto">
                {/*content*/}
                <div className="border-2 rounded-r-lg shadow-lg relative flex flex-col w-full bg-green-900 outline-silver border-black/75">
                  {/*header*/}
                  <div className=" flex text-white items-start justify-between p-5 border-b border-solid border-purple rounded-t">
                    <h3 className="text-2xl font-semibold">Editar Producto</h3>
                    <button
                      className="p-1 ml-auto text-dark  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => {
                        setModalEditar(false);
                        setInput({
                          name: "",
                          price: 0,
                          description: "",
                          image: "",
                          quantity: 0,
                        });
                        setIDActual("");
                      }}
                    >
                      <span className=" text-red-500  h-6 w-6 text-2xl block outline-none focus:outline-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 22 22"
                          strokeWidth={1.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                  {/*body*/}

                  <form>
                    <div className="w-full bg-black2 items-center justify-center">
                      <div className=" w-full p-5 rounded-xl z-10">
                        <div className="grid grid-cols-1 space-y-2">
                          <label className="text-sm font-bold text-white/70 tracking-wide">
                            Imagen (URL)
                          </label>
                          <input
                            className="mt-6 text-grey-900 rounded-lg bg-purple"
                            type="text"
                            required
                            name="image"
                            defaultValue={input.image}
                            readOnly={true}
                          />
                        </div>
                        <p className="text-sm text-gray-300"></p>
                      </div>
                    </div>

                    <div className="relative p-6 flex-auto">
                      <div className="w-full">
                        <div className="md:flex md:items-center mb-6">
                          <div className="">
                            <label
                              className="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                              htmlFor="inline-full-name"
                            >
                              Nombre del producto:
                            </label>
                          </div>
                          <div className="w-full mr-4">
                            <input
                              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                              id="inline-full-name"
                              type="text"
                              name="name"
                              defaultValue={input.name}
                              readOnly={true}
                            ></input>
                          </div>
                        </div>

                        <div className="md:flex md:items-center mb-6">
                          <div className="">
                            <label
                              className="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                              htmlFor="inline-full-name"
                            >
                              Precio:
                            </label>
                          </div>
                          <div className="w-full mr-8">
                            <input
                              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                              id="inline-full-name"
                              type="number"
                              name="price"
                              defaultValue={input.price}
                              onChange={handleChange}
                              required
                            ></input>
                          </div>

                          <div className="">
                            <label
                              className="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                              htmlFor="inline-full-name"
                            >
                              Cantidad:
                            </label>
                          </div>
                          <div className="w-full mr-8">
                            <input
                              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                              id="quantity"
                              type="number"
                              name="quantity"
                              defaultValue={input.quantity}
                              onChange={handleChange}
                              required
                            ></input>
                          </div>
                        </div>
                        <label
                          className="block text-white font-bold md:text-left mb-1 md:mb-2 pr-4"
                          htmlFor="inline-full-name"
                        >
                          Descripción
                        </label>
                        <div className="md:flex md:items-center mb-6">
                          <div className=""></div>
                          <div className="w-full ">
                            <textarea
                              className="bg-gray-200 appearance-none h-20 overflow-y-auto border-2 border-gray-200 rounded w-full py- px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                              id="inline-full-name"
                              type="text"
                              name="description"
                              defaultValue={input.description}
                              readOnly={true}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
                        onClick={() => handleEditar(idActual)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                        Guardar
                      </button>
                    </div>
                  </form>

                  {/*footer*/}

                  <div className="flex items-center justify-end p-1 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        setModalEditar(false);
                        setInput({
                          name: "",
                          price: 0,
                          description: "",
                          image: "",
                          quantity: 0,
                        });
                        setIDActual("");
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}

        {modalAgregar ? (
          <>
            <div className="shadow-[0_2px_15px_-3px_rgba(255,255,255.07),0_10px_20px_-2px_rgba(255,255,255,0.04)] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
              <div className=" relative w-7/12 my-6 mx-auto">
                {/*content*/}
                <div className="border-2 rounded-r-lg shadow-lg relative flex flex-col w-full bg-green-900 outline-silver border-black/75">
                  {/*header*/}
                  <div className=" flex text-white items-start justify-between p-5 border-b border-solid border-purple rounded-t">
                    <h3 className="text-2xl font-semibold">Agregar Producto</h3>
                    <button
                      className="p-1 ml-auto text-dark  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => {
                        setModalAgregar(false);
                      }}
                    >
                      <span className=" text-red-500  h-6 w-6 text-2xl block outline-none focus:outline-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 22 22"
                          strokeWidth={1.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                  {/*body*/}

                  <form>
                    <div className="w-full bg-black2 items-center justify-center">
                      <div className=" w-full p-5 rounded-xl z-10">
                        <div className="grid grid-cols-1 space-y-2">
                          <label className="text-sm font-bold text-white/70 tracking-wide">
                            Imagen (URL)
                          </label>
                          <input
                            className="mt-6 text-grey-900 rounded-lg bg-purple"
                            type="text"
                            required
                            name="image"
                            onChange={handleChange}
                            data-test-id="cypress-input-image"
                          />
                        </div>
                        <p className="text-sm text-gray-300"></p>
                      </div>
                    </div>

                    <div className="relative p-6 flex-auto">
                      <div className="w-full">
                        <div className="md:flex md:items-center mb-6">
                          <div className="">
                            <label
                              className="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                              htmlFor="inline-full-name"
                            >
                              Nombre del producto:
                            </label>
                          </div>
                          <div className="w-full mr-4">
                            <input
                              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                              id="inline-full-name"
                              type="text"
                              name="name"
                              onChange={handleChange}
                              data-test-id="cypress-input-name"
                              required
                            ></input>
                          </div>
                        </div>

                        <div className="md:flex md:items-center mb-6">
                          <div className="">
                            <label
                              className="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                              htmlFor="inline-full-name"
                            >
                              Precio:
                            </label>
                          </div>
                          <div className="w-full mr-8">
                            <input
                              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                              id="inline-full-name"
                              type="number"
                              name="price"
                              onChange={handleChange}
                              data-test-id="cypress-input-price"
                              required
                            ></input>
                          </div>

                          <div className="">
                            <label
                              className="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
                              htmlFor="inline-full-name"
                            >
                              Cantidad:
                            </label>
                          </div>
                          <div className="w-full mr-8">
                            <input
                              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                              id="quantity"
                              type="number"
                              name="quantity"
                              onChange={handleChange}
                              data-test-id="cypress-input-quantity"
                              required
                            ></input>
                          </div>
                        </div>
                        <label
                          className="block text-white font-bold md:text-left mb-1 md:mb-2 pr-4"
                          htmlFor="inline-full-name"
                        >
                          Descripción
                        </label>
                        <div className="md:flex md:items-center mb-6">
                          <div className=""></div>
                          <div className="w-full ">
                            <textarea
                              className="bg-gray-200 appearance-none h-20 overflow-y-auto border-2 border-gray-200 rounded w-full py- px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                              id="inline-full-name"
                              type="text"
                              data-test-id="cypress-input-description"
                              name="description"
                              onChange={handleChange}
                              required
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <button
                        data-test-id="cypress-button-addProduct"
                        type="submit"
                        className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
                        onClick={() => handleAdd()}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                        Guardar
                      </button>
                    </div>
                  </form>

                  {/*footer*/}

                  <div className="flex items-center justify-end p-1 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        setModalAgregar(false);
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
    </>
  );
}
