import { Link } from "react-router-dom";

function Home()
{
    return(
        <div className="bg-gray-200 flex flex-col items-center  justify-center gap-10">
           <h2 className="text-[70px] font-serif">Welcome to Authentication System</h2>

           <div className="links flex gap-5 ">
            <Link to="/login" className="w-[180px] h-[40px] rounded-[6px] bg-black text-white text-[20px] flex items-center justify-center ">Login</Link>
            <Link to="/register" className="w-[180px] h-[40px] border-2 border-black rounded-[6px] hover:bg-black hover:text-white text-[20px] flex items-center justify-center ">Register</Link>
           </div>
        </div>
    );
}
export default Home;