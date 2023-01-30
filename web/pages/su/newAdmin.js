import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useState,useEffect } from "react";
import config from "../../config";

export default function newAdmin() {
    const [user, setUser] = useState({});

    const [name,setName] =useState('')
	const [phone,setphone] =useState('')
	const [email,setEmail] =useState('')
	const [password,setPassword] =useState('')

    useEffect(() => {
       setUser(JSON.parse(localStorage.getItem('user')))
       
    },{})
    useEffect(() => {
        if(user.role == undefined)return;
        if(user.role != 10){
            console.log(user.role);
            window.location.href = "/login";
        }
     },[user])
    return(
        <>
        <Navbar/>
        
        <div className="flex justify-center h-full content-center m-20" >
        <form class="bg-white w-1/2 ">
			<h1 class="text-gray-800 font-bold text-2xl mb-1">Register a new admin</h1>
			<div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
					fill="currentColor">
					<path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
						clip-rule="evenodd" />
				</svg>
				<input onChange={(e)=>setName(e.target.value)} class="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Full name" />
      </div>
				<div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none"
						viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
							d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
					</svg>
					<input onChange={(e)=>setphone(e.target.value)} class="pl-2 outline-none border-none" type="text" name="" id="" placeholder="phone" />
      </div>
					<div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none"
							viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
								d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
						</svg>
						<input onChange={(e)=>setEmail(e.target.value)} class="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Email Address" />
      </div>
						<div class="flex items-center border-2 py-2 px-3 rounded-2xl">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
								fill="currentColor">
								<path fill-rule="evenodd"
									d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
									clip-rule="evenodd" />
							</svg>
							<input onChange={(e)=>{setPassword(e.target.value)}} class="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Password" />
      </div>
							<button onClick={()=>registerReq(phone,name,email,password)} type="submit" class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Register</button>
                            <p className="text-sm font-semibold mt-2 pt-1 mb-0">
              
            </p>
		</form>
        </div>
        </>
    )
}

function registerNewAdmin (name,phone,email,pw){
    fetch(config.apiUrl+'/user/addAdmin',
        
    )
}