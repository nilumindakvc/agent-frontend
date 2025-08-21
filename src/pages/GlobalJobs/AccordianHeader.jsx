import { useNavigate } from "react-router-dom";

export default function AccordianHeader({jobList,categoryName,setSelectedJobFromJobPage}){

     const collapseId = `flush-collapse-${categoryName}`;
     const headingId = `flush-heading-${categoryName}`;

    const navigate =useNavigate();

    const handleJobClick=(job)=>{
       setSelectedJobFromJobPage(job);
       navigate("/Agency");
    }

    return(
        <div class="accordion-item  "  >
          <h2 class="accordion-header" id={headingId}>
            <button
              class="accordion-button collapsed "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#${collapseId}`}
              aria-expanded="false"
              aria-controls={collapseId}
            >
              {categoryName}
              
            </button>
          </h2>
          <div
            id={collapseId}
            className="accordion-collapse collapse "
            aria-labelledby={headingId}
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body ">
              {jobList?jobList.map((job,idx) => {
                return(
                  <p key={idx} >{`${job.jobTitle} (${job.countryName})`}<span className="float-end">
                    <button type="button" class='btn btn-secondary bg-dark rounded-start-pill' onClick={()=>handleJobClick(job)}>
                      {job.agencyName}</button></span></p>
                )
                
              }):
              <>
              <div class="spinner-grow spinner-grow-sm me-2" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <div class="spinner-grow spinner-grow-sm me-2" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <div class="spinner-grow spinner-grow-sm me-2" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              </>
              
              }
             
             
            </div>
          </div>
        </div>
    )
}