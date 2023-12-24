import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaUserLarge } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Service from "../../Service/Service";
import SidebarCliente from "../../components/Sidebar/SidebarCliente";

export default function Resenia() {
  const [reviews, setReviews] = useState([]);
  const usuario = JSON.parse(localStorage.getItem("data_user"));
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState("");
  const navigate = useNavigate();

  const [reviewData, setReviewData] = useState({
    idUser: "",
    comment: "",
    qualification: 0,
  });

  useEffect(() => {
    if (!usuario) {
      navigate("/");
    }

    if (usuario.rol !== 1) {
      navigate("/");
    }
    obtenerReviews();
    
  }, [response]);

  const obtenerReviews = async () => {
    try {
      const res = await Service.getReviews();
      if (res.status === 200) {
        const updatedReviews = await Promise.all(res.data.data.map(
          async (review) => {
          try {
            const resUser = await Service.getUser(review.idUser._id);
            const users = resUser.data.data;

            const mine =
              JSON.parse(localStorage.getItem("data_user")).id === users._id;
            return {
              ...review,
              mine,
            };
          } catch (error) {
            toast.error("Error al obtener los datos del usuario", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });

            console.log(error);
          }
        }));

        setReviews(updatedReviews);
        if (reviews.length > 0) {
          setLoading(false);
        }
      }
    } catch (error) {
      toast.error("Error al obtener las reseñas", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      console.log(error);
    }

    setResponse("reviews");

  };

  const handleInputChange = (event) => {
    setReviewData({
      ...reviewData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(reviewData);
    try {
      reviewData.idUser = JSON.parse(localStorage.getItem("data_user")).id;

      const res = await Service.createReview(reviewData);
      if (res.status === 200) {
        toast.success("Reseña creada exitosamente", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setResponse("review");
      }
    } catch (error) {
      toast.error("Error al crear la reseña", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      console.log(error);
    }

    setReviewData({
      idUser: "",
      comment: "",
      qualification: 0,
    });

  };

  const handleEliminar = async (id) => {

    try {
      const res = await Service.deleteReview(id);
      if (res.status === 200) {
        toast.success("Reseña eliminada exitosamente", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setResponse("DeleteReview");
      }
    }
    catch (error) {
      toast.error("Error al eliminar la reseña", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      console.log(error);
    }

  };


  return (
    <div>
      <div className="flex h-screen">
        <SidebarCliente />
        <Toaster />
        <div className="rows-2 w-full border-l-2 border-white">
          <div className="h-2/3 p-2 bg-gradient-to-tr from-azul4/90 to-azul3 border-b-2 border-white">
            <div className="h-1/6">
              <h1 className="text-white text-3xl text-bold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="inline-block w-8 h-8 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
                Reseñas
              </h1>
            </div>

            <div className="h-full w-full">
              <div className="h-5/6 p-6 bg-black/25 w-full overflow-y-auto scrollbar-hide">
                {/*Reseñas*/}

                {loading ? null : (
                  <div>
                    {reviews.map((review, index) => (
                      <div key={index} className="bg-white h-[170px] w-full mb-6 rounded-md border-black border-2 shadow-md">
                        <div className="h-2/6 w-full flex flex-row justify-between items-center px-4 border-b-2 border-black">
                          <div className="h-full w-1/2 flex flex-row justify-start items-center">
                            <FaUserLarge className="w-12 h-12 mr-4" />
                            <div className="h-full w-1/2 flex flex-col justify-center items-start">
                              <h1 className="text-xl font-bold">
                                {review.idUser.name +
                                  " " +
                                  review.idUser.lastName}
                              </h1>
                              <h1 className="text-sm">{review.idUser.email}</h1>
                            </div>
                          </div>
                          <div className="h-full w-1/2 flex flex-row justify-end items-center">
                            <h1 className="text-xl font-bold">
                              <Rating
                                style={{ maxWidth: 180 }}
                                value={review.qualification}
                                isDisabled
                              />
                            </h1>

                            {review.mine ? (
                              <button className="h-8 w-8 ml-4 text-red-400 hover:text-red-900 rounded-full flex justify-center items-center"
                              onClick={() => handleEliminar(review._id)}
                              data-test-id={`cypress-delete-${index}`}
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
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                  />
                                </svg>
                              </button>
                            ) : null}
                          </div>
                        </div>
                        <div className="h-4/6 w-full px-4 overflow-y-auto scrollbar-hide">
                          <h1 className="text-xl">{review.comment}</h1>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/*Terminan reseñas*/}
              </div>
            </div>
          </div>

          <div className="h-1/3 p-6 bg-gradient-to-tr from-cyan-500 to-blue-500">
            <div className="h-full">
              <form className="bg-white h-full px-8 py-6 overflow-y-auto scrollbar-hide rounded-md border-black border-2 shadow-md flex flex-col">
                <div className="md:flex md:items-center mb-4">
                  <div className="mr-4">
                    <label
                      className="block text-black font-bold md:text-left md:mb-0"
                      htmlFor="inline-full-name"
                    >
                      Calificación:
                    </label>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <div className="mr-4">
                      <Rating
                        style={{ maxWidth: 180 }}
                        value={reviewData.qualification}
                        id="data-test-id"
                        onChange={(value) => {
                          setReviewData({
                            ...reviewData,
                            qualification: value,
                          });
                        }}
                      />
                    </div>
                    <button
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                      onClick={(e) => handleSubmit(e)}
                      data-test-id="cypress-review-submit"
                    >
                      Enviar
                    </button>
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="mr-8">
                    <label
                      className="block text-black font-bold md:text-left mb-1 md:mb-2 pr-4"
                      htmlFor="inline-full-name"
                    >
                      Reseña:
                    </label>
                  </div>
                  <div className="md:w-full">
                    <textarea
                      className="bg-white appearance-none h-20 overflow-y-auto border-2 border-gray-300 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-full-name"
                      type="text"
                      name="comment"
                      data-test-id="cypress-review-comment"
                      placeholder="Reseña"
                      value={reviewData.comment}
                      onChange={(e) => handleInputChange(e)}
                    ></textarea>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
