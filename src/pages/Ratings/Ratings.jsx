import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import "./Ratings.css";
import TopListCard from "./TopListCard";
import TopThreeCard from "./TopThreeCard";
import UserReviewCard from "./UserReviewCard";
import axios from "axios";
import ReviewAccording from "./ReviewAccording";
import Toast from "../Toast";
import { baseurl } from "../../config";

export default function Ratings({
  agenciesWithLogos,
  agencyReviews,
  agencies,
  userLogedIn,
  setAgencyReviews,
  isEverythingReady
}) {


  const getAllAgencyReviews =async()=>{
    const result = await axios.get(`${baseurl}/api/User/reveiws`);
    setAgencyReviews(result.data);
   }

  const [reviewObject,setReviewObject]=useState({
    agencyId:"",
    serviceNumber:"",
    reviewText:"",
    userId:userLogedIn?.userId
  })

  const [reviewTost,setReviewToast]=useState(false);

  const handleReviewSubmit=async()=>{
    try{
       const result = await axios.post(`${baseurl}/api/User/review`,reviewObject);
       console.log(result.data);
       setReviewToast(true)
       setReviewObject({
        agencyId:"",
        serviceNumber:"",
        reviewText:"",
        userId:userLogedIn?.userId
       });
       getAllAgencyReviews();
    }catch(err){
      console.log(err);
    }
    

  }

  // console.log(agencyReviews);
  return (
    <div>
    {isEverythingReady==true?
    <>
      <div className="maincontainer_Ratings">
        <div className="main_title_R ">
          <h1 className="display-3" id="ratingPage_main_title">“Reviews That Build Trust”</h1>
        </div>
        <div className="sub_title_R">
          <h1 className="display-6 fw-lighter fs-4">Top Agencies of the month</h1>
        </div>

        <div className="one_two_three_container">
          <div className="two bg-secondary common_all">
            <TopThreeCard
              name={
                agenciesWithLogos[1]
                  ? agenciesWithLogos[1].agencyName
                  : "loading..."
              }
              logoPic={agenciesWithLogos[1] ? agenciesWithLogos[1].logo : ""}
            />
            <div className="number common_all fs-1 text-light">#2</div>
          </div>
          <div className="one bg-dark common_all">
            <TopThreeCard
              name={
                agenciesWithLogos[0]
                  ? agenciesWithLogos[0].agencyName
                  : "loading..."
              }
              logoPic={agenciesWithLogos[0] ? agenciesWithLogos[0].logo : ""}
            />
            <div className="number common_all fs-1 text-light">#1</div>
          </div>
          <div className="three bg-warning common_all">
            <TopThreeCard
              name={
                agenciesWithLogos[2]
                  ? agenciesWithLogos[2].agencyName
                  : "loading..."
              }
              logoPic={agenciesWithLogos[2] ? agenciesWithLogos[2].logo : ""}
            />
            <div className="number common_all fs-1 text-light">#3</div>
          </div>
        </div>

        <div className="sub_title_R">
          <h1 class="display-6 fw-lighter fs-4 ">User Reviews</h1>
        </div>

        <div className="toplist ">
          <ReviewAccording
            agenciesWithLogos={agenciesWithLogos}
            agencyReviews={agencyReviews}
            userLogedIn={userLogedIn}
            setAgencyReviews={setAgencyReviews}
          />
        </div>

        <div className="sub_title_R">
          <h1 className="display-3 fw-lighter ">Write a Review</h1>
          <h1 className="display-3 fw-lighter fs-4">
            Have you worked with an agency recently?
          </h1>
          <h1 class="display-3 fw-lighter fs-4">
            Help others stay safe and informed
          </h1>
        </div>

        <div className="writing_review_section">
          <div className="mb-3 ">
            <div className="d-flex align-items-center mb-2">
              <label for="exampleFormControlTextarea1" class="form-label">
                review
              </label>
              <label for="exampleFormControlTextarea1" class="form-label ms-5">
                regarding:
              </label>
              <select
                id="agency_to_give_review"
                className="form-select w-25 ms-1"
                aria-label="Default select example"
                value={reviewObject.agencyId}
                onChange={(e)=>setReviewObject({...reviewObject,agencyId:e.target.value})}
              >
                <option selected>Open this select menu</option>
                {agencies ? (
                  agencies?.map((agency, index) => {
                    return (
                      <option value={agency.agencyId} key={index}>
                        {agency.agencyName}
                      </option>
                    );
                  })
                ) : (
                  <p>" "</p>
                )}
              </select>

              <label className="form-label ms-3">Service No:</label>
              <div className="w-20">
                <input type="text" class="form-control ms-1 " value={reviewObject.serviceNumber}
                onChange={(e)=>setReviewObject({...reviewObject,serviceNumber:e.target.value})}
                id="review_text_box"/>
              </div>
            </div>

            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              value={reviewObject.reviewText}
              onChange={(e)=>setReviewObject({...reviewObject,reviewText:e.target.value})}
            ></textarea>
          </div>
          <div className="d-grid gap-2 d-md-block">
            <button type="button" class="btn btn-outline-primary me-2">
              clear
            </button>
            <button className="btn btn-primary" type="button" onClick={()=>handleReviewSubmit()} id="submit_your_comment">
              submit
            </button>
          </div>
        </div>
      </div>
      <Toast showToast={reviewTost} setShowToast={setReviewToast} message={"✅ your review is added!"} id="review_ok_toast"/>
      <Footer />
    </>
:<>
      <div className="starter_agent bg-light d-flex flex-column justify-content-center align-items-center">
       <p className="text-warning fw-lighter text-primary-emphasis fs-4"> 
            Agent is on the way
       </p>
       <div className="d-flex justify-content-center gap-1">
          <div class="spinner-grow spinner-grow-sm text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-grow spinner-grow-sm text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-grow spinner-grow-sm text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
       </div>
      
      </div>
</>}
</div>          
  );
}
