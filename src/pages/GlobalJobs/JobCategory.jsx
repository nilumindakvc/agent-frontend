import { useEffect, useState } from "react";
import AccordianHeader from "./AccordianHeader";
import "./GlobalJobs.css";

export default function JobCategory({ jobList,setSelectedJobFromJobPage }) {

  const [healthcare,setHealthcare] =useState(null);
  const [Construction,setConstruction]=useState(null);
  const [Hospitality,setHospitality]=useState(null);
  const [Logistic,setLogistic]=useState(null);
  const [CleanAndDomestic,setCleanAndDomestics]=useState(null);

 const filteringFunc =(jobList)=>{
  if(jobList!=null){
    setHealthcare(jobList.filter(item=>item.categoryName=='Healthcare'));
    setConstruction(jobList.filter(item=>item.categoryName=='Construction'));
    setHospitality(jobList.filter(item=>item.categoryName=='Hospitality'));
    setLogistic(jobList.filter(item=>item.categoryName=='Logistics'));
    setCleanAndDomestics(jobList.filter(item=>item.categoryName=='Clean and Domestic'));
  }
 } 

 useEffect(()=>filteringFunc(jobList),[jobList]);

 console.log(healthcare);
 console.log(CleanAndDomestic);
  
  return (
    <div class="accordion accordion-flush w-100  " id="accordionFlushExample" >
      <AccordianHeader jobList={healthcare} categoryName={"Healthcare"}   setSelectedJobFromJobPage={setSelectedJobFromJobPage}/>
      <AccordianHeader jobList={Construction} categoryName={"Construction"} setSelectedJobFromJobPage={setSelectedJobFromJobPage}/>
      <AccordianHeader jobList={Hospitality} categoryName={"Hospitality"} setSelectedJobFromJobPage={setSelectedJobFromJobPage}/>
      <AccordianHeader jobList={Logistic} categoryName={"Logistic"} setSelectedJobFromJobPage={setSelectedJobFromJobPage}/>
      <AccordianHeader jobList={CleanAndDomestic} categoryName={"CleanAndDomestic"} setSelectedJobFromJobPage={setSelectedJobFromJobPage}/>
    </div>
  );
}
