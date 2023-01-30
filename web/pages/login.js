import config from "../config";
import { useState } from "react";

export default function login() {
  const [email,setEmail] = useState("");
  const [pw,setPw] = useState("");
    return (
      <section className="h-screen">
  <div className="px-6 h-full text-gray-800">
    <div
      className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
    >
      <div
        className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
      >
        <img
          src="https://images.all-free-download.com/images/graphiclarge/free_makeup_vector_59270.jpg"
          className="w-full"
          alt="Sample image"
        />
      </div>
      <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
        <form>

          <div className="mb-6">
            <input
              onChange={(e)=>setEmail(e.target.value)}
              type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="email"
              placeholder="Email address"
            />
          </div>

          <div className="mb-6">
            <input
              onChange={(e)=>setPw(e.target.value)}
              type="password"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="pw"
              placeholder="Password"
            />
          </div>



          <div className="text-center lg:text-left">
            <button
            onClick={()=>loginReq(email,pw)}
              type="button"
              className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Login
            </button>
            <p className="text-sm font-semibold mt-2 pt-1 mb-0">
              Don't have an account?
              <a
                href="/register"
                className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                >Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
    )
}

async function loginReq(email,pw){
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "email" : email,
        "password" : pw
      })
    };
  fetch(config.apiUrl+"/user/login",requestOptions).then(res=>{
    if(res.status== 200){
      res.json().then(data=>{
        console.log(data);
        localStorage.setItem("token",data.token);
        localStorage.setItem("user",JSON.stringify(data));
        if(data.role== 10){
          window.location.href="/su/dashboard";
        }else if(data.role == 0){
          window.location.href = "/admin/dashboard";
        }else{
          window.location.href = "/";
        }
      })}
    else if(res.status == 401){
      alert("Invalid email or password");
    }
  });
  } catch (error) {
    console.log(error);
  }
    
}