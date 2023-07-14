import { Context } from "../context/Context";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BuyCourse = () => {
  const navigate = useNavigate();
  const { userCourses } = useContext(Context);
  const { courseId } = useParams();
  const publishedUserCourses = userCourses.find(
    (course) => course._id === courseId
  );

  const handleBuyNow = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      let res = await fetch("http://localhost:3000/users/courses/" + courseId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let response = await res.json();
      console.log(response.message);
      if (response.message === "Course purchased successfully") {
        toast.success("Success", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        setTimeout(() => {
          navigate("/Home");
        }, 1000);
      } else if(response.message === "Course already purchased") {
        toast.warn("Course already purchased", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      else{
        toast.warn("Some Error", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      {publishedUserCourses ? (
        <div className="flex flex-col md:flex-row mt-36  ">
          <div className="md:w-1/2 p-4 border-2 border-solid border-black mx-10">
            <img
              src={publishedUserCourses.imageLink}
              alt="Product"
              className="w-full"
            />
          </div>

          <div className="md:w-1/2 p-4 mx-10">
            <h1 className="text-2xl font-bold mb-4">
              {publishedUserCourses.title}
            </h1>
            <p className="mb-4">{publishedUserCourses.description}</p>
            <p className="text-lg font-bold mb-4">
              ₹{publishedUserCourses.price}
            </p>
            <button
              type="submit"
              onClick={handleBuyNow}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Buy Now
            </button>
          </div>
        </div>
      ) : (
        <div>Loading..</div>
      )}
      <ToastContainer />
    </>
  );
};

export default BuyCourse;
