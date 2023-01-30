import Navbar from "../../components/navbar";
import { useState,useEffect } from "react";
import { useRouter } from 'next/router'
import config from "../../config";
import Footer from "../../components/Footer";
import Card from "../../components/Card";

export default function Home() {
    const [branch, setBranch] = useState([]);
    const [services, serServices] = useState([]);
    const router = useRouter()
    const { branchId } = router.query

    useEffect(() => {
            if(!branchId) return;

          const brancheUrl = config.apiUrl + '/branch/' + branchId;
            fetch(brancheUrl).then(response => response.json()).then(data => {
            setBranch(data);
          });
          const branchesUrl = config.apiUrl + '/services';
      fetch(branchesUrl).then(response => response.json()).then(data => {
        serServices(data);
        console.log(services)
          });
    }, [branchId,router.isReady]);

  return (
    <>
      <Navbar />
        <div className="w-full bg-cover bg-center" style={{height:'32rem',backgroundImage: `url(${branch.image})`}}>
            <div className="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50">
                <div className="text-center">
                    <h1 className="text-white text-2xl font-semibold uppercase md:text-3xl">Welcome to Clean Cut <span className="underline text-blue-400">{branch.name}</span></h1>
                </div>
            </div>
        </div>
        {services.length > 0? <h1 className="text-center text-3xl mt-5 font-bold">Our services</h1>: <h1 className="text-center text-3xl mt-5 font-bold">No services found for this branch</h1> }
        <div className=" flex items-center justify-center h-auto bg-white">
      <div className="flex content-around justify-around">
      {services.length > 0? services.map(service =>
            <Card title={service.Name} desc = {service.desc} btn="Book now" href={"/appointment/new/"+service.id}/>
           ):<p></p>}  
      </div>
        </div>
      <Footer/>
    </>
    )
}


