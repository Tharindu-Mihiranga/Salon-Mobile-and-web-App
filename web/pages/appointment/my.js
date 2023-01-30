import Navbar from "../../components/Navbar"
import { useState, useEffect } from "react"
import config from "../../config";

import AppointmentReq from "../../components/AppointmentReq";

export default function MyAppointments() {
    const [myAppointmentsList,setMyAppointmentsList] = useState([]);
    useEffect(()=>{
        fetch(config.apiUrl+ "/appointment/my",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("token")
            }
        }).then(res=>{
            res.json().then(data=>{
                setMyAppointmentsList(data)
            })
            if(res.status===401){
                window.location.href = "/login"
            }
        })
    },[])
    return(
        <>
            <Navbar/>
            <h2 className="text-xl font-bold text-center p-10 bg-slate-200">My Appointments</h2>
            <div className="flex justify-around m-10">
                {myAppointmentsList.map((appointment) => (
                    <AppointmentReq  service={appointment.service.Name} time = {appointment.date} id={appointment.id}  feedback ={appointment.feedback} branchId ={appointment.branchId} complete = {true}/>
                ))}
            </div>
        </>
    )
}