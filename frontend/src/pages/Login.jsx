// import React, { useState } from 'react';
// import logo from "../images/logo.png";//name wise import kro  to lgane me easy  hoga..
// import sec from "../images/authPageSide.png";
// import "../App.css"; 
// import { Link } from "react-router-dom"; 
// import { api_based_url } from '../helper';
// import { useNavigate } from "react-router-dom";

// export default function Login() {

   
//     const[Email , setEmail] = useState("");
//     const[password , setpassword] = useState("");

//     const navigate = useNavigate(); 
//     const [error , setError]=useState("");
//     const submitForm = (e) =>{
//         e.preventDefault();
//         fetch(api_based_url + "/login",{
//             mode: "cors",
//             method: "POST",
//             headers:{
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 email: Email,
     
//                 password:password
//             })
//         } ).then(res=>res.json()).then(data =>{
//             if(data.success ===true){
//                 localStorage.setItem("token",data.token);
//                 localStorage.setItem("isLoggedIn" , true);
//                 localStorage.setItem("userId",data.userId);
//                 navigate("/");
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
//                         <input required onChange={(e)=>{setEmail(e.target.value)}} value={Email} type="text" placeholder='Email'/>
//                     </div>
//                     <div className="inputBox">
//                         <input required onChange={(e)=>{setpassword(e.target.value)}} value={password} type="password" placeholder='Password'/>
//                     </div>

//                     <p> Don't have an accout <Link to="/signUp" className="text-[#00AEEF]">SignUp</Link> </p>
//                     <p className="text-red-500 text-[14px] mt-2 ">{error}</p>
//                     <button className="btnBlue w-full mt-[20px]">Login</button>

//                 </form>
//             </div>
//             <div className="right w-[55%]">
//                 <img className="h-[100vh] w-[100%] object-cover" src={sec} alt=""/>
//             </div>
//         </div>    

//     </div>
//   )
// }


























// import React, { useState } from 'react';
// import logo from "../images/logo.png";
// import sec from "../images/authPageSide.png";
// import "../App.css"; 
// import { Link, useNavigate } from "react-router-dom"; 
// import { api_based_url } from '../helper';

// export default function Login() {
//     const [Email, setEmail] = useState("");
//     const [password, setpassword] = useState("");
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const submitForm = (e) => {
//         e.preventDefault();
//         fetch(api_based_url + "/login", {
//             mode: "cors",
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email: Email, password: password })
//         }).then(res => res.json()).then(data => {
//             if (data.success === true) {
//                 localStorage.setItem("token", data.token);
//                 localStorage.setItem("isLoggedIn", true);
//                 localStorage.setItem("userId", data.userId);
//                 navigate("/");
//             } else {
//                 setError(data.message);
//             }
//         });
//     };

//     return (
//         <div className="flex w-screen min-h-screen bg-[#050505] text-white">
//             <div className="left w-full md:w-[45%] flex flex-col justify-center px-8 md:px-[100px] py-10 relative overflow-hidden">
//                 {/* Decorative glow */}
//                 <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px]"></div>

//                 <div className="z-10">
//                     <img className="w-[160px] mb-12" src={logo} alt="Codify Logo" />
                    
//                     <h2 className="text-4xl font-bold mb-2 tracking-tight">Welcome Back</h2>
//                     <p className="text-gray-500 mb-10 font-medium">Log in to your workspace to continue.</p>

//                     <form onSubmit={submitForm} className="w-full space-y-6">
//                         <div className="space-y-2">
//                             <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
//                             <input 
//                                 required 
//                                 className="w-full bg-[#111] border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all"
//                                 onChange={(e) => setEmail(e.target.value)} 
//                                 value={Email} 
//                                 type="email" 
//                                 placeholder='name@example.com'
//                             />
//                         </div>
                        
//                         <div className="space-y-2">
//                             <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Password</label>
//                             <input 
//                                 required 
//                                 className="w-full bg-[#111] border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all"
//                                 onChange={(e) => setpassword(e.target.value)} 
//                                 value={password} 
//                                 type="password" 
//                                 placeholder='••••••••'
//                             />
//                         </div>

//                         {error && <p className="text-red-500 text-sm font-medium bg-red-500/10 p-3 rounded-xl border border-red-500/20">{error}</p>}

//                         <button className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]">
//                             Sign In
//                         </button>
//                     </form>

//                     <p className="mt-8 text-gray-400 text-center md:text-left"> 
//                         Don't have an account? <Link to="/signUp" className="text-blue-500 font-bold hover:underline">Sign Up</Link> 
//                     </p>
//                 </div>
//             </div>

//             {/* Right Side Image with Overlay */}
//             <div className="right hidden md:block w-[55%] relative">
//                 <div className="absolute inset-0 bg-gradient-to-r from-[#050505] to-transparent z-10"></div>
//                 <img className="h-full w-full object-cover" src={sec} alt="Code Workspace"/>
//             </div>
//         </div>
//     );
// }































































import React, { useState } from 'react';
import logo from "../images/logo.png";
import sec from "../images/Pasted image.png"; // Using your image as background
import "../App.css"; 
import { Link, useNavigate } from "react-router-dom"; 
import { api_based_url } from '../helper';

export default function Login() {
    const [Email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const submitForm = (e) => {
        e.preventDefault();
        fetch(api_based_url + "/login", {
            mode: "cors",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: Email, password: password })
        }).then(res => res.json()).then(data => {
            if (data.success === true) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("userId", data.userId);
                navigate("/");
            } else {
                setError(data.message);
            }
        });
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
                {/* Dark Overlay to make the glass card pop */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
            </div>

            {/* --- TRANSPARENT GLASS CARD --- */}
            <div className="w-full max-w-[440px] z-10">
                <div className="bg-black/40 backdrop-blur-xl border border-white/20 p-10 rounded-[2.5rem] shadow-2xl">
                    
                    <div className="text-center mb-10">
                        <img src={logo} alt="Codify" className="h-10 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold text-white tracking-tight">Login</h2>
                    </div>

                    <form onSubmit={submitForm} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-gray-300 uppercase tracking-widest ml-1">Email</label>
                            <input 
                                type="email" 
                                required
                                className="w-full bg-white/10 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500/50 focus:bg-white/15 transition-all text-white placeholder:text-gray-500"
                                onChange={(e) => setEmail(e.target.value)}
                                value={Email}
                                placeholder="name@domain.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-gray-300 uppercase tracking-widest ml-1">Password</label>
                            <input 
                                type="password" 
                                required
                                className="w-full bg-white/10 border border-white/10 p-4 rounded-2xl outline-none focus:border-orange-500/50 focus:bg-white/15 transition-all text-white placeholder:text-gray-500"
                                onChange={(e) => setpassword(e.target.value)}
                                value={password}
                                placeholder="••••••••"
                            />
                        </div>

                        {error && <p className="text-red-400 text-sm bg-red-400/20 p-3 rounded-xl border border-red-500/30">{error}</p>}

                        <button className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]">
                            Sign In
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-300 text-sm">
                            Don't have an account? 
                            <Link to="/signUp" className="text-orange-400 font-bold ml-2 hover:underline">Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}