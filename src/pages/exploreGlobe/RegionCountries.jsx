import { useNavigate } from "react-router-dom";
import "./ExploreGlobe.css";

export default function RegionCountries({ accordian_object,agency_CountryPairList,agencies,setSelectedAgency }) {

  const navigate =useNavigate();
  const handleAgencyClick=(agency)=>{
     navigate('/Agency');
     setSelectedAgency(agency);
  }
 
  return (
    <div class="accordion accordion-flush w-100 " id="accordionFlushExample">
      {accordian_object?accordian_object.map((countryItem ,index)=> {
       
       const agencyList =agency_CountryPairList?agency_CountryPairList.filter(ac=>ac.countryId==countryItem.countryId):null;

        return(
        <div class="accordion-item "  key={index}>
          <h2 class="accordion-header ">
            <button
              class="accordion-button collapsed "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#flush-collapse-${index}`}
              aria-expanded="false"
              aria-controls={`flush-collapse-${index}`}
            >
              {countryItem.countryName}
            </button>
          </h2>
          <div
            id={`flush-collapse-${index}`}
            class="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body ">
              { agencyList?agencyList.map((agency,idx) => {
                return(
                  <p key={idx} >{agencies.find(a=>a.agencyId==agency.agencyId).agencyName}<span className="float-end">
                    <button type="button" class="btn btn-outline-info ps-4 pe-4 z-1" onClick={()=>handleAgencyClick(agency)}>visit</button></span></p>
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
