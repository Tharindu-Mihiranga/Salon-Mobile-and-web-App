import Navbar from "../components/navbar"
import HeroSection from "../components/HeroSection"
import ClassCardSection from "../components/ClassCardSection"
import Footer from "../components/Footer"
import Card from "../components/Card"
import  { useState,useEffect } from 'react';
import config from "../config"

export default function Home() {
  const [services, setServices] = useState([]);

  useEffect(() => {
      const branchesUrl = config.apiUrl + '/services';
      fetch(branchesUrl).then(response => response.json()).then(data => {
        setServices(data);
        console.log(services)
          });
      }, []);

  return (
    <>
      <Navbar />
      <HeroSection/>
      <ClassCardSection/>
      <h1 className="text-center text-3xl mt-5 font-bold">Our services</h1>
      <div className="flex content-around justify-around">
      {services.length != 0? services.map(service =>
            <Card title={service.Name} desc = {service.desc} btn="Book now" href={"/appointment/new/" + service.id}/>
           ):<p>loading</p>}  
      </div>
    
      <Footer/>
    </>
    )
}


