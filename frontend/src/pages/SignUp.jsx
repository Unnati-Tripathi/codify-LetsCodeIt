// import React, { useState } from 'react';
// import logo from "../images/logo.png";//name wise import kro  to lgane me easy  hoga..
// import sec from "../images/authPageSide.png";
// import "../App.css"; 
// import { Link, useNavigate } from "react-router-dom"; 
// import { api_based_url } from '../helper';
// export default function SignUp() {

//     const[UserName , setuserName] = useState(""); 
//     const[Name , setName] = useState("");
//     const[Email , setEmail] = useState("");
//     const[password , setpassword] = useState("");

//     const Navigate = useNavigate();
//     const [Error , setError]=useState("");
//     const submitForm = async (e) =>{
//         e.preventDefault();
//         const response = await 
//         fetch(api_based_url + "/signUp",{
//             mode: "cors",
//             method: "POST",
//             headers: {
//                 "Content-Type" :"application/json" 
//             },
//             body: JSON.stringify({
//                 username: UserName,
//                 name: Name,
//                 email: Email,
//                 password: password,
//             })

//         }).then((res)=>res.json()).then((data)=>{
//             if(data.success=== true){
//                 alert("Account created successfully");
//                 Navigate("/login");
//             }
//             else{
//                 setError(data.message);
//             }
//         })
//     }


//   return (
//     <div>
//         <div className="container  w-screen min-h-screen flex items-center justify-between pl-[100px]">
//             <div className="left w-[40%]"> 
//                 {/* pure div ki  yahi widht rhegi.. ander bs hr baar w-full krte jaana.. change krna ho to yahi se he hoga */}
//                 <img className="w-[200px]" src={logo} alt="Company Logo"/>
//                 <form onSubmit={submitForm} className="w-full mt-[70px]" action="" >
//                     <div className="inputBox">
//                         <input required onChange={(e)=>{setuserName(e.target.value)}} value={UserName} type="text" placeholder='UserName'/>
//                     </div>
//                     <div className="inputBox">
//                         <input required onChange={(e)=>{setName(e.target.value)}} value={Name} type="text" placeholder='Name'/>
//                     </div>
//                     <div className="inputBox">
//                         <input required onChange={(e)=>{setEmail(e.target.value)}} value={Email} type="text" placeholder='Email'/>
//                     </div>
//                     <div className="inputBox">
//                         <input required onChange={(e)=>{setpassword(e.target.value)}} value={password} type="password" placeholder='Password'/>
//                     </div>

//                     <p> Already have an accout <Link to="/login" className="text-[#00AEEF]">login</Link> </p>
//                     <p className="text-red-500 text-[14px] mt-2 ">{Error}</p>

//                     <button className="btnBlue w-full mt-[20px]">SignUp</button>

//                 </form>
//             </div>
//             <div className="right w-[55%]">
//                 <img className="h-[100vh] w-[100%] object-cover" src={sec} alt=""/>
//             </div>
//         </div>    

//     </div>
//   )
// }











































import React, { useState } from 'react';
import logo from "../images/logo.png";
import sec from "../images/Pasted image.png"; 
import "../App.css"; 
import { Link, useNavigate } from "react-router-dom"; 
import { api_based_url } from '../helper';

export default function SignUp() {
    const [UserName, setuserName] = useState(""); 
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [Error, setError] = useState("");
    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(api_based_url + "/signUp", {
                mode: "cors",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: UserName,
                    name: Name,
                    email: Email,
                    password: password,
                })
            });
            const data = await res.json();
            if (data.success === true) {
                alert("Account created successfully");
                navigate("/login");
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError("Connection error. Please try again.");
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-6 overflow-hidden">
            {/* --- FULL BACKGROUND IMAGE --- */}
            <div 
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${sec})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Dark Overlay with Blur */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px]"></div>
            </div>

            {/* --- TRANSPARENT GLASS CARD --- */}
            <div className="w-full max-w-[500px] z-10">
                <div className="bg-black/40 backdrop-blur-2xl border border-white/20 p-8 md:p-10 rounded-[2.5rem] shadow-2xl">
                    
                    <div className="text-center mb-8">
                        <img src={logo} alt="Codify" className="h-10 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-white tracking-tight">Create Account</h2>
                    </div>

                    <form onSubmit={submitForm} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest ml-1">Username</label>
                                <input 
                                    required 
                                    className="w-full bg-white/10 border border-white/10 p-4 rounded-2xl outline-none focus:border-orange-500 focus:bg-white/15 transition-all text-white placeholder:text-gray-500" 
                                    onChange={(e)=>setuserName(e.target.value)} 
                                    value={UserName} 
                                    type="text" 
                                    placeholder='coder123'
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest ml-1">Full Name</label>
                                <input 
                                    required 
                                    className="w-full bg-white/10 border border-white/10 p-4 rounded-2xl outline-none focus:border-orange-500 focus:bg-white/15 transition-all text-white placeholder:text-gray-500" 
                                    onChange={(e)=>setName(e.target.value)} 
                                    value={Name} 
                                    type="text" 
                                    placeholder='tourist'
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest ml-1">Email</label>
                            <input 
                                required 
                                className="w-full bg-white/10 border border-white/10 p-4 rounded-2xl outline-none focus:border-orange-500 focus:bg-white/15 transition-all text-white placeholder:text-gray-500" 
                                onChange={(e)=>setEmail(e.target.value)} 
                                value={Email} 
                                type="email" 
                                placeholder='name@example.com'
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest ml-1">Password</label>
                            <input 
                                required 
                                className="w-full bg-white/10 border border-white/10 p-4 rounded-2xl outline-none focus:border-orange-500 focus:bg-white/15 transition-all text-white placeholder:text-gray-500" 
                                onChange={(e)=>setpassword(e.target.value)} 
                                value={password} 
                                type="password" 
                                placeholder='••••••••'
                            />
                        </div>

                        {Error && (
                            <p className="text-red-400 text-sm font-medium bg-red-400/20 p-3 rounded-xl border border-red-500/30">
                                {Error}
                            </p>
                        )}

                        <button className="w-full bg-orange-600 hover:bg-orange-500 py-4 rounded-2xl font-bold text-lg text-white transition-all shadow-lg shadow-orange-600/20 active:scale-[0.98] mt-2">
                            Join Codify
                        </button>
                    </form>

                    <p className="mt-8 text-center text-gray-300 text-sm"> 
                        Already a member? <Link to="/login" className="text-orange-400 font-bold hover:underline">Login</Link> 
                    </p>
                </div>
            </div>
        </div>
    );
}

