import { useNavigate } from "react-router-dom";

import MediaCard from "../../utils/Cards";
import Skeleton from "@mui/material/Skeleton";
import { useContext } from "react";
import { Context } from "../context/Context";

const HomeForAdmin = () => {
  const {publishedCourses,nonPublishedCourses,loading}=useContext(Context)
 
  const navigate = useNavigate();


  return (
    <div className="container mx-auto p-4">
      <div className="flex mt-16 justify-end">
        <button
          onClick={() => {
            navigate("/HomeForAdmin/CreateCourse");
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Create Course
        </button>
      </div>
      <div className="mt-8  ">
        <h2 className="text-3xl font-bold mb-4">Published Courses</h2>
        <div className="grid md:grid-cols-3  grid-cols-1 gap-4 ">
          
        {    publishedCourses.map((course) => (
                <MediaCard
                  key={course._id}
                  image={course.imageLink}
                  title={course.title}
                  description={course.description}
                  price={course.price}
                  _id={course._id}
                  
                />
              ))}
       
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-3xl font-bold mb-4">Non-published Courses</h2>
        <div className="grid md:grid-cols-3 grid-cols-1   gap-4 ">
          {nonPublishedCourses.map((course) => (
            <MediaCard
              key={course._id}
              image={course.imageLink}
              title={course.title}
              description={course.description}
              price={course.price}
              _id={course._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeForAdmin;
