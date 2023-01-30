import { useState, useEffect } from "react"
import config from "../config"

const Navbar = (props)=>{
  
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(()=>{
    var token = null
      if (typeof window !== 'undefined') {
        token = localStorage.getItem('token')
      }
      
      if(token){
        setLoggedIn(true)
      }else{
        setLoggedIn(false)
      }
  }, [])
      
  
    return(
        
        <header>
          {props.role == 10 || props.role == 0?
          <nav
          className="
            flex flex-wrap
            items-center
            justify-between
            w-full
            py-4
            md:py-0
            px-4
            text-lg text-gray-700
            bg-white
          "
        >
        <div>
            <a href="/">
                <h1>Clean Cut</h1>
            </a>
  
          </div>
        
        <div className="hidden w-full md:flex md:items-center md:w-auto" id="menu">
            <ul
              className="
                pt-4
                text-base text-gray-700
                md:flex
                md:justify-between 
                md:pt-0"
            >
              <li>
                
              </li>
              
              <li>
                {loggedIn? 
                <a
                  className="md:p-4 py-2 cursor-pointer block hover:text-purple-400 text-purple-500"
                  onClick={()=>logout()}
                  >Sign Out</a
                >:
                <a
                  className="md:p-4 py-2 cursor-pointer block hover:text-purple-400 text-purple-500"
                  href="/login"
                  >Sign In</a
                >
                }
                
              </li>
            </ul>
          </div>
      </nav>:
            <nav
                className="
                  flex flex-wrap
                  items-center
                  justify-between
                  w-full
                  py-4
                  md:py-0
                  px-4
                  text-lg text-gray-700
                  bg-white
                "
              >
              <div>
                  <a href="/">
                      <h1>Clean Cut</h1>
                  </a>
        
                </div>
              
              <div className="hidden w-full md:flex md:items-center md:w-auto" id="menu">
                  <ul
                    className="
                      pt-4
                      text-base text-gray-700
                      md:flex
                      md:justify-between 
                      md:pt-0"
                  >
                    <li>
                      {loggedIn?
                        <a className="md:p-4 py-2 block hover:text-purple-400" href="/appointment/my">
                        My Appointments</a>:
                        null
                      }
                      
                    </li>
                    
                    {!loggedIn? 
                    <li>
                      <a
                        className="md:p-4 py-2 block hover:text-purple-400 text-purple-500"
                        href="/register"
                        >Sign Up</a
                      >
                    </li>: null}
                    <li>
                      {loggedIn? 
                      <a
                        className="md:p-4 py-2 cursor-pointer block hover:text-purple-400 text-purple-500"
                        onClick={()=>logout()}
                        >Sign Out</a
                      >:
                      <a
                        className="md:p-4 py-2 cursor-pointer block hover:text-purple-400 text-purple-500"
                        href="/login"
                        >Sign In</a
                      >
                      }
                      
                    </li>
                  </ul>
                </div>
            </nav>
          }
        </header> 
    )
}

async function logout(){
  fetch(config.apiUrl+'/user/logout',{
    method:"POST",
    headers:{
      'Authorization': 'Bearrer '+ localStorage.getItem('token'),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token')
  }
  window.location.href = "/"
}

export default Navbar;