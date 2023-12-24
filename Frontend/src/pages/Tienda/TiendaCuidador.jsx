import { useState } from "react";
import SidebarCuidador from "../../components/Sidebar/SidebarCuidador";
export default function TiendaCuidador() {
  const products = [
    {
      id: 1,
      name: "Alimento",
      description:
        "Alimento para perro super nutritivo Alimento para perro super nutritivo Alimento para perro super nutritivo Alimento para perro super nutritivo Alimento para perro super nutritivo",
      price: 10000,
      quantity: 10,
      pathImage:
        "data:image/jpeg;base64,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",
    },
  ];

  //const [product, setProduct] = useState([]);

  const [modalEditar, setModalEditar] = useState(false);
  const [modalAgregar, setModalAgregar] = useState(false);

  const [input, setInput] = useState({
    name: "",
    price: 0,
    description: "",
    pathImage: "",
    quantity: 0,
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  /*const handleOpenEditar = () => {
    setModalEditar(true);
  };*/

  return (
    <>
      <div className="flex h-screen flex bg-verde4/90 ">
        <SidebarCuidador />
        <div className="flex flex-col  border-l-2 border-white w-full">
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
              <button className="hover:bg-[#1F6564] transition duration-300 ease-in-out rounded-md bg-[#257F75] shadow-xl border-2 border-[#1F6564]/90 py-3 px-8 text-center text-base font-semibold text-white  outline-none"
              onClick={() => {setModalAgregar(true);}}
              >
                Agregar un nuevo producto
              </button>
            </div>
            <div className="w-full height-100 flex flex-wrap overflow-y-auto scrollbar-hide  justify-center ">
              {products.map((product, index) => (
                <div key={index} className="h-auto w-1/3 max-w-xs bg-white shadow-lg rounded-lg overflow-hidden transition-all ease-out duration-300 hover:scale-105 p-2 m-3">
                  <div className="flex items-center justify-center">
                    <img
                      src={product.pathImage}
                      alt="Imagen de Perfil"
                      className="w-48 h-48 rounded-lg"
                    />
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="p-4">
                      <h1 className="text-xl font-semibold text-gray-800">
                        {product.name}
                      </h1>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="p-2">
                      <h1 className="text-md text-gray-800">
                        Precio: Q {product.price}
                      </h1>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className=" flex w-20 justify-center items-center text-white font-bold py-2 px-4 rounded-full mx-1">
                      <button
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          setModalEditar(true);
                          setInput(product);
                        }}
                      >
                        Editar
                      </button>
                      <button className="m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Eliminar
                      </button>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Detalle
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {modalEditar ? (
          <>
            <div className="shadow-[0_2px_15px_-3px_rgba(255,255,255.07),0_10px_20px_-2px_rgba(255,255,255,0.04)] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
              <div className=" relative w-7/12 my-6 mx-auto">
                {/*content*/}
                <div className="border-2 rounded-r-lg shadow-lg relative flex flex-col w-full bg-zinc-800 outline-silver border-black/75">
                  {/*header*/}
                  <div className=" flex text-white items-start justify-between p-5 border-b border-solid border-purple rounded-t">
                    <h3 className="text-2xl font-semibold">Editar Producto</h3>
                    <button
                      className="p-1 ml-auto text-dark  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => {
                        setModalEditar(false);
                        setInput({});
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
                            name="pathImage"
                            defaultValue={input.pathImage}
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
                        setInput({});
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
                <div className="border-2 rounded-r-lg shadow-lg relative flex flex-col w-full bg-zinc-800 outline-silver border-black/75">
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
                            name="pathImage"
                            onChange={handleChange}

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
                              onChange = {handleChange}
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
                              onChange = {handleChange}
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
                              onChange = {handleChange}
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
                              onChange = {handleChange}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
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
