import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useState, useEffect } from 'react'
import config from '../../config'
import ClassCardSection from '../../components/ClassCardSection'
import Card from '../../components/Card'

export default function SuAdmin() {
  const [user, setUser] = useState([])

  const [bName, setbName] = useState([])
  const [image, setbimage] = useState([])
  const [lat, setlat] = useState([])
  const [lon, setlon] = useState([])
  const [adminName, setadminName] = useState([])
  const [adminPhone, setadminPhone] = useState([])
  const [adminEmail, setadminEmail] = useState([])
  const [adminPw, setadminPw] = useState([])

  const [sName,setSname] = useState([])
  const [sPrice,setSPrice] = useState([])
  const [sDesc,setSDesc] = useState([])

  const [services,setServices] = useState([])


  useEffect(() => {
    fetch(config.apiUrl + '/user/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }).then((res) => {
      if (res.status == 200) {
        res.json().then((data) => {
          setUser(data)
        })
      } else {
        if (typeof window !== 'undefined') {
          setUser(JSON.parse(localStorage.getItem('user')))
          if (user.role != 10) {
            window.location.href = '/login'
          }
        }
      }
    })
  }, [])

  useEffect(() => {
    const branchesUrl = config.apiUrl + '/services';
    fetch(branchesUrl).then(response => response.json()).then(data => {
      setServices(data);
      console.log(services)
        });
    }, []);

  return (
    <>
      <Navbar role={10} />
      <div>
        <h1 className="text-xl font-bold text-center bg-slate-100 p-10">
          Super Admin Dashboard
        </h1>
        <div className="flex items-center justify-center mt-10 flex-col">
          <div class="bg-white w-1/2 ">
            <h1 class="text-gray-800 font-bold text-2xl mb-1">
              Register a new branch
            </h1>
            <div>
              <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <input
                  onChange={(e) => setbName(e.target.value)}
                  class="pl-2 outline-none border-none"
                  type="text"
                  name=""
                  id=""
                  placeholder="Branch name"
                />
              </div>
              <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <input
                  onChange={(e) => setbimage(e.target.value)}
                  class="pl-2 outline-none border-none"
                  type="text"
                  name=""
                  id=""
                  placeholder="Image link"
                />
              </div>
              <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <input
                  onChange={(e) => setlat(e.target.value)}
                  class="pl-2 outline-none border-none"
                  type="text"
                  name=""
                  id=""
                  placeholder="location latitude"
                />
              </div>
              <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <input
                  onChange={(e) => setlon(e.target.value)}
                  class="pl-2 outline-none border-none"
                  type="text"
                  name=""
                  id=""
                  placeholder="location longitude"
                />
              </div>
            </div>
          </div>
          <div class="bg-white w-1/2 ">
            <h1 class="text-gray-800 font-bold text-2xl mb-1">
              Register a new admin for the new branch
            </h1>
            <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <input
                onChange={(e) => setadminName(e.target.value)}
                class="pl-2 outline-none border-none"
                type="text"
                name=""
                id=""
                placeholder="Full name"
              />
            </div>
            <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <input
                onChange={(e) => setadminPhone(e.target.value)}
                class="pl-2 outline-none border-none"
                type="text"
                name=""
                id=""
                placeholder="phone"
              />
            </div>
            <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <input
                onChange={(e) => setadminEmail(e.target.value)}
                class="pl-2 outline-none border-none"
                type="text"
                name=""
                id=""
                placeholder="Email Address"
              />
            </div>
            <div class="flex items-center border-2 py-2 px-3 rounded-2xl">
              <input
                onChange={(e) => {
                  setadminPw(e.target.value)
                }}
                class="pl-2 outline-none border-none"
                type="text"
                name=""
                id=""
                placeholder="Password"
              />
            </div>
            <button
              onClick={() =>
                registerReq(
                  bName,
                  image,
                  lat,
                  lon,
                  adminName,
                  adminPhone,
                  adminEmail,
                  adminPw,
                )
              }
              type="submit"
              class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            >
              Register
            </button>
            <p className="text-sm font-semibold mt-2 pt-1 mb-0"></p>
          </div>
        </div>
      </div>
      <ClassCardSection role={10} />
      <h1 className="text-xl font-bold text-center bg-slate-100 p-10">
        Create new service
      </h1>
      <div className="flex items-center justify-center mt-10 flex-col">
      <div>
              <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <input
                  onChange={(e) => setSname(e.target.value)}
                  class="pl-2 outline-none border-none"
                  type="text"
                  name=""
                  id=""
                  placeholder="Service name"
                />
              </div>
              <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <input
                  onChange={(e) => setSPrice(e.target.value)}
                  class="pl-2 outline-none border-none"
                  type="text"
                  name=""
                  id=""
                  placeholder="Price"
                />
              </div>
              <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <input
                  onChange={(e) => setSDesc(e.target.value)}
                  class="pl-2 outline-none border-none"
                  type="text"
                  name=""
                  id=""
                  placeholder="Description"
                />
              </div>
              <button
              onClick={() =>
                createService(
                    sName,sPrice,sDesc
                )
              }
              type="submit"
              class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            >
              Create
            </button>
            </div>
            
      </div>
      <h1 className="text-xl font-bold text-center bg-slate-100 p-10">
          Services
        </h1>
      <div className="flex content-around justify-around">
      {services.length != 0? services.map(service =>
            <Card title={service.Name} desc = {service.desc} delete={true} id = {service.id}/>
           ):<p>loading</p>}  
      </div>

    </>
  )
}

function registerReq(
  bName,
  image,
  lat,
  lon,
  adminName,
  adminPhone,
  adminEmail,
  adminPw,
) {
  console.log(
    bName,
    image,
    lat,
    lon,
    adminName,
    adminPhone,
    adminEmail,
    adminPw,
  )
  fetch(config.apiUrl + '/user/addAdmin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: JSON.stringify({
      name: adminName,
      email: adminEmail,
      phone: adminPhone,
      password: adminPw,
    }),
  }).then((res) => {
    if (res.status == 200) {
      res = res.json().then((res) => {
        var adminId = res.id

        fetch(config.apiUrl + '/branch/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          body: JSON.stringify({
            name: bName,
            image: image,
            location_lat: lat,
            location_long: lon,
            branchAdmin: adminId,
          }),
        }).then((res) => {
          console.log(res)
          if (res.status == 200) {
            alert('Branch created successfully')
            window.location.href = '/'
          }
        })
      })
    }
  })
}

function createService(name,price,desc){
    fetch(config.apiUrl + '/services/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({
            Name: name,
            price: price,
            desc: desc,
        }),
    }).then((res) => {
        console.log(res)
        if (res.status == 200) {
            alert('Service created successfully')
            window.location.reload()
        }else{
            alert('Something went wrong')
        }
    })
}
