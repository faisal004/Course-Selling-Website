import { useEffect, useState } from "react";


const UserDashboard = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchUserPurchasedCourses();
  }, []);

  const fetchUserPurchasedCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/users/purchasedCourses", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
     
      const userData = data.purchasedCourses;
    

      setUserData(userData);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-12">
     
      <h3 className="text-lg font-semibold mb-4">My Courses</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {userData &&
          userData.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-lg shadow p-4 flex items-center"
            >
              <div className="flex-shrink-0">
                <img
                  className="w-12 h-12 rounded-full"
                  src={course.imageLink}
                  alt="Course"
                />
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-semibold">{course.title}</h4>
                <p className="text-gray-600">{course.description}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserDashboard;
