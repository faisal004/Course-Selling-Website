import { Context } from "../context/Context";
import { useContext} from "react";
import { useParams } from "react-router-dom";

const BuyCourse = () => {
    const {userCourses} = useContext(Context);
    const{courseId}=useParams()
    const publishedUserCourses=userCourses.find((course)=>course._id===courseId)
    // console.log(publishedUserCourses)
  return (
    <>
  
    {publishedUserCourses?(<div className="flex flex-col md:flex-row mt-36  ">
    <div className="md:w-1/2 p-4 border-2 border-solid border-black mx-10">
      <img
        src={publishedUserCourses.imageLink}
        alt="Product"
        className="w-full"
      />
    </div>

    <div className="md:w-1/2 p-4 mx-10">
      <h1 className="text-2xl font-bold mb-4">{publishedUserCourses.title}</h1>
      <p className="mb-4">{publishedUserCourses.description}</p>
      <p className="text-lg font-bold mb-4">₹{publishedUserCourses.price}</p>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Buy Now
      </button>
    </div>
  </div>):(<div>Loading..</div>)}
  </>
  );
};

export default BuyCourse;
