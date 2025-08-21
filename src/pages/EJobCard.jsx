import axios from "axios"
import { useEffect, useState } from "react";
import { baseurl } from "../config";

export default function EJobCard(props){

    const [showJob,setShowJob] =useState(true);

    const handleDelete=async()=>{
        try{
            const response =await axios.delete(`${baseurl}/api/Job/${props.jobId}`);
            setShowJob(false);
            getAllJobs();
            
        }catch(err){
            console.log(err);
        }   
    }
    const getAllJobs=async()=>{
       try{
            const result=await axios.get(`${baseurl}/api/Job`);
            props.setJobList(result.data);
   
            const urgentlyOpens =result.data.filter(a=>a.openedUrgently==true).slice(0,5);
            props.setUrgentlyOpenedJobs(urgentlyOpens);
           
          }
        catch(err){
          console.log(err);
        }
       
     }

     useEffect(()=>{
         const publishingAgency =props.agencies?.find(a=>a.licenseNumber==props.licenseToPublish);
         props.setPublishingAgencyJobList(props.jobList?.filter(a=>a.agencyId==publishingAgency?.agencyId))
     },[props.jobList])

    return(
        <div class={`card mb-3 w-100 ${showJob==false?"visually-hidden":""}`} idx={props.index} ref={props.ref} >
            <div class="row g-0">
                <div class="col-md-4 d-flex flex-column align-items-center justify-content-center ">
                <img src={`src/assets/ct${props.category}.png`} className="img-fluid rounded" style={{ maxWidth: '60px', height: 'auto' }} alt="..." />

                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{props.jobTitle}</h5>
                    <p class="card-text">{props.description}</p>
                    <p class="card-text"><small class="text-body-secondary">{props.country}</small></p>
                    <p class="card-text"><small class="text-body-secondary">{props.salary}</small></p>
                    <p class="card-text"><small class="text-body-secondary">{props.requirements}</small></p>
                    <p class="card-text"><small class="text-body-secondary">{props.deadline}</small></p>
                    {props.deletebutton==true?<button className="btn btn-danger " onClick={()=>{handleDelete()}}>delete post</button>:""}
                    
                </div>
                </div>
            </div>
       </div>
    )
}