import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MediaCard from "../../utils/Cards";
import Skeleton from "@mui/material/Skeleton";

const HomeForAdmin = () => {
  const navigate = useNavigate();
  const [publishedCourses, setPublishedCourses] = useState([]);
  const [nonPublishedCourses, setNonPublishedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch("http://localhost:3000/admin/courses");
      const data = await res.json();
      const courses = data.courses;
      const length = courses.length;
      console.log(length);
      const published = courses.filter((course) => course.published);
      const nonPublished = courses.filter((course) => !course.published);

      setPublishedCourses(published);
      setNonPublishedCourses(nonPublished);
      setLoading(false);
    } catch (error) {
      console.log("Error:", error);
    }
  };

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
      <div className="mt-8 ">
        <h2 className="text-3xl font-bold mb-4">Published Courses</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {!loading
            ? publishedCourses.map((course) => (
                <MediaCard
                  key={course._id}
                  image={course.imageLink}
                  title={course.title}
                  description={course.description}
                  price={course.price}
                  _id={course._id}
                  
                />
              ))
            : publishedCourses.map((length) => (
                <Skeleton
                  key={Math.random()}
                  variant="rounded"
                  width={350}
                  height={200}
                />
              ))}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-3xl font-bold mb-4">Non-published Courses</h2>
        <div className="grid md:grid-cols-3 gap-4">
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
