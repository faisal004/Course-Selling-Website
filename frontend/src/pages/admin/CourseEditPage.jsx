import { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Context } from "../../context/Context";
import MediaCard from "../../../utils/Cards";

const CourseEditPage = () => {
  const navigate = useNavigate();
  const { courses } = useContext(Context);
 
  const { courseId } = useParams();
  const course = courses.find((course) => course._id === courseId);


  const [title, settitle] = useState(course?.title || "");
  const [description, setdescription] = useState(course?.description || "");
  const [price, setPrice] = useState(course?.price || "");
  const [imageLink, setImageLink] = useState(course?.imageLink || "");
  const [published, setIsPublished] = useState(course?.published || false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const course = {
      title,
      description,
      price,
      imageLink,
      published,
    };
    try {
      const token = localStorage.getItem("token");
      let res = await fetch("http://localhost:3000/admin/courses/" + courseId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(course),
      });
      let response = await res.json();
      console.log(response);
      if (response.message === "Course updated successfully") {
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
        settitle("");
        setdescription("");
        setImageLink("");
        setPrice("");
        setIsPublished(false);
        setTimeout(() => {
          navigate("/HomeForAdmin");
          window.location.reload();
        }, 1000);
      } else {
        toast.warn("Something went wrong", {
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

  //   console.log("Form submitted!");
  //   console.log("Course Title:", title);
  //   console.log("Course Description:", description);
  //   console.log("Price:", price);
  //   console.log("Image Link:", imageLink);
  //   console.log("Published:", published);

  return (
    <>
      {course?(<div className="container mt-16 mx-auto p-4">
        <div className="grid grid-cols-1 gap-1 mb-3 ">
          <MediaCard
            title={course.title}
            description={course.description}
            image={course.imageLink}
            price={course.price}
          />
        </div>

        <h2 className="text-lg font-bold mb-4">Create Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Course Title
            </label>
            <input
              type="text"
              id="title"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              value={course.title}
              onChange={(e) => settitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Course Description
            </label>
            <textarea
              id="description"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              value={course.description}
              onChange={(e) => setdescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              value={course.price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="imageLink"
            >
              Image Link
            </label>
            <input
              type="text"
              id="imageLink"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              value={course.imageLink}
              onChange={(e) => setImageLink(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={course.published}
                onChange={() => setIsPublished(!published)}
              />
              <span className="ml-2 text-gray-700">Published</span>
            </label>
          </div>
          <div className="space-x-3">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Update
            </button>
            <button
              onClick={() => {
                navigate("/HomeForAdmin");
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>):"Loading"}
    </>
  );
};

export default CourseEditPage;
