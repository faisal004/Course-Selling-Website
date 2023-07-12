import { useEffect, useState } from "react";
import MediaCard from "../../utils/Cards";

const Home = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/users/courses", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      const courses = data.courses;

      console.log(courses);

      setCourses(courses);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="bg-gray-100">
      <header className="bg-blue-600 py-6 mt-14">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl text-white font-bold">
            Welcome to CourseVista
          </h1>
          <p className="text-white mt-2">
            Expand your knowledge with our wide range of courses
          </p>
        </div>
      </header>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl text-gray-800 font-bold mb-6">
            Popular Courses
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {courses.map((course) => (
              <MediaCard
                key={course._id}
                image={course.imageLink}
                title={course.title}
                description={course.description}
                price={course.price}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-200 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl text-gray-800 font-bold mb-6">
            Why Choose CourseVista?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <svg
                className="text-blue-600 w-8 h-8 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <h3 className="text-xl text-gray-800 font-semibold">
                Flexible Learning
              </h3>
              <p className="text-gray-600 mt-2">
                Learn at your own pace from anywhere, anytime.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <svg
                className="text-blue-600 w-8 h-8 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <h3 className="text-xl text-gray-800 font-semibold">
                Expert Instructors
              </h3>
              <p className="text-gray-600 mt-2">
                Learn from industry experts with years of experience.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <svg
                className="text-blue-600 w-8 h-8 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <h3 className="text-xl text-gray-800 font-semibold">
                Interactive Courses
              </h3>
              <p className="text-gray-600 mt-2">
                Engage in interactive learning materials and quizzes.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <svg
                className="text-blue-600 w-8 h-8 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <h3 className="text-xl text-gray-800 font-semibold">
                Affordable Pricing
              </h3>
              <p className="text-gray-600 mt-2">
                Access high-quality courses at reasonable prices.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-blue-600 py-6">
        <div className="container mx-auto px-4">
          <p className="text-white text-center">
            &copy; 2023 CourseVista. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
