import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { useRouter } from 'next/router'
import { useEffect,useState } from 'react';
import config from '../../../config';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const NewAppointment = ()=>{
    const router = useRouter()
    const { service } = router.query
    const [branches,setBranches] = useState([])
    const [services,setServices] = useState([])
    const [startDate, setStartDate] = useState(new Date());


    useEffect(()=>{
        fetch(config.apiUrl+'/branch')
        .then(res=>res.json())
        .then(data=>{
            setBranches(data)
        })
        fetch(config.apiUrl+'/services')
        .then(res=>res.json())
        .then(data=>{
            setServices(data)
        })
    },[])

    return(
        <>
            <Navbar/>
            <h1 className='text-center font-bold text-xl p-3 bg-slate-50'>Make an appointment</h1>
            <div className='flex justify-center content-center p-10 '>
                <div className="w-full max-w-lg">
                    <div className='flex flex-col'>
                    <div className="inline-block relative  m-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Branch
                    </label>
                        <select id='selectedBranch' className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                            {branches? branches.map(branch=>(<option value={branch.id}>{branch.name}</option>)) : <option>No branches found</option>}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                    <div className="inline-block relative  m-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        service
                    </label>
                        <select id='selectedService' className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                            {services? services.map(service=>(<option value={service.id} >{service.Name}</option>)) : <option>No services found</option>}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                    <div className='ml-3 border-2'>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect />
                    </div>
                    <button onClick={()=>createAppointment(startDate)} className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Submit
                    </button>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

function createAppointment(startDate){
    let branch = document.getElementById('selectedBranch').value
    let service = document.getElementById('selectedService').value
    
    fetch(config.apiUrl+'/appointment/create',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+localStorage.getItem('token')
        },
        body:JSON.stringify({
            branchId : branch,
            serviceId : service,
            date : startDate
        })
    })
    .then(res=>
        {
            if(res.status===200){
                alert('Appointment created successfully')
                window.location.href = '/appointment/my'
            }
        }
        )
   
    

}

export default NewAppointment;