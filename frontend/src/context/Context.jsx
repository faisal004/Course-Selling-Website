import { createContext,useEffect,useState } from "react";

export const Context = createContext();

export const CourseProvider = ({ children }) => {
    const [courses, setCourses] = useState("");
    const [publishedCourses, setPublishedCourses] = useState([]);
    const [nonPublishedCourses, setNonPublishedCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userCourses, setUserCourses] = useState([]);

  
    useEffect(() => {
      fetchCourses();
      fetchUserCourses();
    }, []);
  

    const fetchUserCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/users/courses", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        const userCourses= data.courses;
  
        console.log(userCourses);
  
        setUserCourses(userCourses);
      } catch (error) {
        console.log("Error:", error);
      }
    };
  
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:3000/admin/courses");
        const data = await res.json();
        const courses = data.courses;
       
        const published = courses.filter((course) => course.published);
        const nonPublished = courses.filter((course) => !course.published);
        setCourses(courses)
        setPublishedCourses(published);
        setNonPublishedCourses(nonPublished);
        setLoading(false);
      } catch (error) {
        console.log("Error:", error);
      }
    };
  
 
 
  return (
    <Context.Provider
      value={{publishedCourses,nonPublishedCourses,loading,courses,userCourses,setUserCourses
     
      }}
    >
      {children}
    </Context.Provider>
  );
};