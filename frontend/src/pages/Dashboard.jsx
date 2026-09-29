import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard(){

   let navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUser(){
            try{
                let response = await fetch("http://localhost/learn/backend/api/dashboard.php", {
                    method: "POST",
                    credentials: "include"
                });

                if(!response.ok){
                    throw new Error("Unable to Fetch User");
                }

                let data = await response.json();
                setUser(data.name);
                if(!data.success){
                    navigate('/login')
                }
                
            }catch(error){
                console.log(error);
            }
        }

        fetchUser();
    },[]);

    async function logout(e){
        e.preventDefault();

        try{
            let response = await fetch("http://localhost/learn/backend/api/logout.php", {
                method: "POST",
                credentials: "include"
            });

            if(!response.ok){
                throw new Error("Unable to Logout");
            }

            let data = await response.json();

            if(data.success){
                navigate("/login");
            }

            

        }catch(error){
            console.log(error);
        }

    }
    return(
        <div className=" flex flex-col items-center justify-center">
           <h2 className="font-serif text-[70px]">Hi, {user == null ? "User" : user}</h2>
           <form action="" onSubmit={logout}>
            <button type="submit" className="w-[150px] h-[40px] rounded-[6px] bg-black text-white">Logout</button>
           </form>
        </div>
    );
}
export default Dashboard;