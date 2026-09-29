import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {

    let navigate = useNavigate();
    // Change the state comes from the server
    const [success, setSuccess] = useState(null)
    const [message, setMessage] = useState(null);

    // State for Inputs
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Change State for Password Type
    const [isChecked, setIsChecked] = useState(false);


    // Function to handle Inputs
    function handleName(e) {
        setName(e.target.value);
    }

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handleConfirmPassword(e) {
        setConfirmPassword(e.target.value);
    }

    // Funtion to handle password type
    function handleType() {
        setIsChecked(!isChecked);
    }

    // Function to Register

    async function register(e) {
        e.preventDefault();

        try {
            let response = await fetch("http://localhost/learn/backend/api/register.php", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword

                })
            });

            if (!response.ok) {
                throw new Error("Unable to Register User");
            }

            let data = await response.json();

            setSuccess(data.success);
            setMessage(data.message);

            setTimeout(() => {
                setSuccess(null);
                setMessage(null);
            }, 3000);

            if(data.success){
                setTimeout(() => {
                    navigate("/login")
                },1000);
            }


        } catch (error) {
            console.log(error);
        }
        // if (name.length == 0 || email.length == 0 || password.length == 0 || confirmPassword.length == 0) {
        //     setSuccess(false);
        //     setMessage("All the fields are Required");

        //     setTimeout(() => {
        //         setSuccess(null);
        //         setMessage(null);
        //     }, 3000);
        // }
        // elseif(name.length < 10){

        // }
    }

    return (
        <div className="bg-gray-300 flex flex-col items-center justify-start p-10 gap-10">
            <h2 className="font-serif text-[35px]">Create an Account</h2>

            <form action="" onSubmit={register} className="bg-white w-[400px] h-auto  rounded-[6px] p-2 flex flex-col">
                <input value={name} className="outline-none border border-black w-full h-[40px] rounded-[6px] px-2" type="text" onChange={handleName} placeholder="Name" /> <br />
                <input value={email} className="outline-none border border-black w-full h-[40px] rounded-[6px] px-2" type="email" onChange={handleEmail} placeholder="Email" /> <br />
                <input value={password} className="outline-none border border-black w-full h-[40px] rounded-[6px] px-2" type={isChecked ? "text" : "password"} onChange={handlePassword} placeholder="Password" /> <br />
                <input value={confirmPassword} className="outline-none border border-black w-full h-[40px] rounded-[6px] px-2" type={isChecked ? "text" : "password"} onChange={handleConfirmPassword} placeholder="Confirm Password" /> <br />

                <div className="flex gap-2">
                    <input type="checkbox" onClick={handleType} />
                    <p>Show Password</p>
                </div>

                <button type="submit" className="w-full h-[40px] mt-[10px] rounded-[6px] bg-black text-white">Create an Account</button>

                <div className={`message border border-black w-full min-h-[40px] rounded-[6px] mt-[10px] ${success ? "bg-green-600" : "bg-red-600"} text-white ${message == null ? "hidden" : "flex"} items-center justify-center`}>
                    {message}
                </div>

                <p className="w-full mt-[10px] text-center">Already have an account? &nbsp; <Link to="/login" className="text-purple-800 underline">Login</Link></p>
            </form>
        </div>
    )
}
export default Register;