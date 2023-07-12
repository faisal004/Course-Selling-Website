import { useNavigate } from "react-router-dom";

const Welcome = () => {
    const navigate = useNavigate();
  return (
    <div className="bg-gray-100">
    {/* Hero Section */}
    <section className="text-center py-20">
      <div className="container mx-auto space-x-1">
        <h1 className="text-4xl lg:text-6xl font-bold mb-4">
          Welcome to CourseVista
        </h1>
        <p className="text-lg text-gray-500 mb-8">
          The Best Platform to Sell Your Courses
        </p>
       
        <button   onClick={() => {
                  navigate("/AdminSignup");
                }} className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-all duration-300">
        Sign Up as a Teacher
        </button>
        <button   onClick={() => {
                  navigate("/Signup");
                }} className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-all duration-300">
        Sign Up as a User
        </button>

       
        
       
      </div>
    </section>

    {/* Features Section */}
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8">
          Why Choose CourseVista?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <img
              src="/feature-1.svg"
              alt="Feature 1"
              className="w-24 h-24 mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Wide Audience Reach</h3>
            <p className="text-gray-500 text-center">
              Get access to a large community of learners looking for courses
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="/feature-2.svg"
              alt="Feature 2"
              className="w-24 h-24 mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Easy Course Creation</h3>
            <p className="text-gray-500 text-center">
              Effortlessly create and manage your courses with our user-friendly interface
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="/feature-3.svg"
              alt="Feature 3"
              className="w-24 h-24 mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Secure Payment System</h3>
            <p className="text-gray-500 text-center">
              Rest easy knowing that your earnings are secure with our trusted payment system
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-16 bg-blue-500">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-white mb-8">
          Sign up as a teacher today and start sharing your knowledge!
        </p>
        <a
          href="/SignupTeacher"
          className="px-8 py-4 bg-white text-blue-500 hover:bg-blue-600  font-bold rounded-lg transition-all duration-300"
        >
          Sign Up as a Teacher
        </a>
      </div>
    </section>
  </div>
  )
}

export default Welcome