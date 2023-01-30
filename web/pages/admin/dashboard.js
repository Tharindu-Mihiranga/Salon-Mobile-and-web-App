import Navbar from "../../components/Navbar";
import AppointmentReq from "../../components/AppointmentReq";
import Card from "../../components/Card";

import { useState,useEffect } from "react";
import config from "../../config";

export default function dashboard() {
  const [user, setUser] = useState([])
  const [myBrach,setMyBrach] = useState([])
  const [pendingApp, setPendingApp] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [services, serServices] = useState([]);

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
    }).then(()=>{
      fetch(config.apiUrl + '/branch/my', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }).then((res) => {
        if (res.status == 200) {
          res.json().then((data) => {
            setMyBrach(data)
          })
        }
      })
    })
    
  }, [])

  useEffect(() => {
    if(myBrach.id != undefined){
      fetch(config.apiUrl + '/appointment/pending/'+myBrach.id+"/0", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }).then((res) => {
        if (res.status == 200) {
          res.json().then((data) => {
            setPendingApp(data)
          })
        }})
      const servicesUrl = config.apiUrl +"/services/branchId/" + myBrach.id;
      fetch(servicesUrl).then(response => response.json()).then(data => {
          serServices(data.services);
      });
    }
  }, [myBrach])

  useEffect(() => {
    if(myBrach.id != undefined){
      fetch(config.apiUrl + '/appointment/pending/'+myBrach.id+"/1", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }).then((res) => {
        if (res.status == 200) {
          res.json().then((data) => {
            setUpcoming(data)
          })
        }})}
  }, [myBrach])
  
  return (
    
    <>
      <Navbar role={0}/>
      <h1 className="text-xl text-center font-bold bg-slate-50 p-10">Appointment requests</h1>
      <div className="flex justify-around m-10">
        {pendingApp.map((appointment) => (
          <AppointmentReq  service={appointment.service.Name} time = {appointment.date} id={appointment.id} status ={appointment.approved} feedback ={appointment.feedback}/>
        ))}
      </div>

      <h1 className="text-xl text-center font-bold bg-yellow-50 p-10">Upcoming Appointments</h1>
      <div className="flex justify-around m-10">
        {upcoming.map((appointment) => (
          <AppointmentReq  service={appointment.service.Name} time = {appointment.date} id={appointment.id} status ={appointment.approved} feedback ={appointment.feedback}/>
        ))}
      </div>
      <h1 className="text-xl text-center font-bold bg-yellow-50 p-10">Services in the branch</h1>
      <div className="flex content-around justify-around">
      {services.length > 0? services.map(service =>
            <Card title={service.Name} desc = {service.desc}/>
           ):<p></p>}  
      </div>
    </>
  );
}