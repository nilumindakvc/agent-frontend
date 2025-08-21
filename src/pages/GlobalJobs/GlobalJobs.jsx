import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Carsoul from "./Carsoul";
import "./GlobalJobs.css";
import JobCategory from "./JobCategory";
import UrgentOpenCard from "./UrgentOpenCard";
import SearchAleart from "./SearchAleart";
import axios from "axios";


export default function GlobalJobs({urgentlyOpenedJobs,jobList,setSelectedJobFromJobPage}) {
  const imageArray = [
    { img: "src/assets/cleaning.jpg" },
    { img: "src/assets/waiter.jpg" },
    { img: "src/assets/construction.jpg" },
    { img: "src/assets/logistics.jpg" },
  ];
 
  const [searchedCountry,setSearchedCountry]=useState('');
  const [matchingJobs,setMatchingJobs]=useState(null);

  const filterJobsByCountry =()=>{
     const matchedJobs=jobList.filter(job=>job.countryName==(searchedCountry.charAt(0).toUpperCase() + searchedCountry.slice(1)));
     setMatchingJobs(matchedJobs);
  }

  
  return (
    <>
      <div className="maincontainer_global_jobs">
        <div className="region_caption_global_jobs_1 mt-4 mb-3">
          <h1 className="display-3 mt-5 mb-4">"Discover Global Carreers"</h1>
        </div>
        {/* <div className="region_caption_global_jobs_1">
          <h1 class="display-5">Search latest</h1>
        </div> */}

        <div className="carsoul_container">
          <Carsoul imageArray={imageArray} />
        </div>

        <div className="region_caption_global_jobs_2">Carrer Categories</div>

        <div className="carrer_category_section ">
          <JobCategory jobList={jobList} setSelectedJobFromJobPage={setSelectedJobFromJobPage}/>
        </div>

        <div className="region_caption_global_jobs_1  me-2 mt-5 mb-5 p-3 ">
          <h1 className="display-5 ">Urgent Openings</h1>
        </div>

        <div className="urgent_open mt-3 mb-5">
          {
            urgentlyOpenedJobs?urgentlyOpenedJobs.map((ujob,index)=>
               <UrgentOpenCard  jobTitle={ujob.jobTitle}  description={ujob.jobDescription}  agency={ujob.agencyName} 
                country={ujob.countryName} salary={ujob.salaryRange} image={`src/assets/ct${ujob.categoryId}.png`} index={index}
                setSelectedJobFromJobPage={setSelectedJobFromJobPage} ujob={ujob}/>
          
            ):<>
                <div className="text-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
            </>
          }
         
          
        </div>

        <div className="region_caption_global_jobs_1">
          <h1 className="display-5 text-secondary">search by country</h1>
        </div>

        <div className="search_container bg-secondary-subtle">
          <div className="d-flex w-25 " >
            <input
              className="form-control me-2 rounded-pill"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchedCountry}
              onChange={(e)=>setSearchedCountry(e.target.value)}
            />
            <button className="btn btn-outline-success"  onClick={filterJobsByCountry}>
              Search
            </button>
          </div>
        </div>

        <div className="search_result mt-4">
          {
            matchingJobs&&matchingJobs.length>0?matchingJobs.map((job,index)=><SearchAleart 
            setSelectedJobFromJobPage={setSelectedJobFromJobPage} des={job.jobTitle} job={job} key={index}/>):
            <p>no matching result <span className="ms-4">(O_O)</span></p>
          }
          
          
        </div>
        <Footer />
      </div>
    </>
  );
}
