import axios from "axios";
import { baseurl } from "../../config";


export default function ReviewAccording({agencyReviews,agenciesWithLogos,userLogedIn,setAgencyReviews}) {

  const handleDeleteReview=async(userId,serviceNumber)=>{
    try{
       const response =await axios.delete(`${baseurl}/api/User/review/${userId}/${serviceNumber}`);
       await getAllAgencyReviews();
    }catch(err){
      console.log(err);
    }
   
    
  }

  const getAllAgencyReviews =async()=>{
    const result = await axios.get(`${baseurl}/api/User/reveiws`);
    setAgencyReviews(result.data);
   }

  return (
    <div class="accordion accordion-flush w-100 " id="accordionFlushExample">
        
       {agenciesWithLogos?agenciesWithLogos.map((agency,index)=> {
        const reviews =agencyReviews?agencyReviews.filter(a=>a.agencyId==agency.agencyId):null;
        return(
        <div class="accordion-item "  key={index}>
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed d-flex"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#flush-collapse-${index}`}
              aria-expanded="false"
              aria-controls={`flush-collapse-${index}`}
            >
              <p>{agency.agencyName}</p>
              <p className="ms-2">{"⭐".repeat(agency.averageRating)}</p>
            </button>
          </h2>
          <div
            id={`flush-collapse-${index}`}
            class="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body ">
              {
               reviews?reviews.map((review,idx) => {
                return(
                    
                    
                    <div class="alert alert-success " role="alert" key={idx}>
                    <div className="position-relative">
                      <p >{review.reviewText}</p>
                      
                      {review.userId==userLogedIn.userId?
                      <button className="btn btn-outline-primary-subtle position-absolute top-0 end-0 " 
                      onClick={()=>handleDeleteReview(review.userId,review.serviceNumber)}
                      >x</button>:""
                      }
                      
                    </div>
                     <hr/>
                     <p>Service No:{review.serviceNumber}</p>
                    </div>
                    
               
                )
            }):<p>loading...</p>}
              
            </div>
          </div>
        </div>
        )
      }):<p>loading...</p>}
    </div>
  );
}
