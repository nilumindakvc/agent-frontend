import Nav from "./components/Nav"
import "./App.css"
import Home from "./pages/Home/Home"
import ExploreGlobe from "./pages/exploreGlobe/ExploreGlobe"
import GlobalJobs from "./pages/GlobalJobs/GlobalJobs"
import AgencyRegistering from "./pages/AgencyRegistering"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Ratings from "./pages/Ratings/Ratings"
import { useEffect, useState } from "react"
import ScrollToTop from "./ScrollToTop"
import Login from "./pages/Login/Login"
import AgencyPage from "./pages/Agency/AgencyPage"
import axios from "axios";
import { baseurl } from "./config"




function App() {
   const [signInState,setSignInState]=useState(1);
   const [commonSignIn_SignUp_state,set_common_signIn_signUp_state]=useState(1);
   const [userLogedIn,setUserLogedIn]=useState(null);

   const [urgentlyOpenedJobs,setUrgentlyOpenedJobs]=useState(null);
   const [jobList,setJobList]=useState(null);
   const [selectedJobFromJobPage,setSelectedJobFromJobPage]=useState(null);
   const [agencies,setAgencies]=useState(['']);
   const [allCountries,setAllCountries]=useState(null);
   const [agency_CountryPairList,setAgency_CountryPairList]=useState(null);
   const [selectedAgency,setSelectedAgency]=useState(null);
   const [agencyReviews,setAgencyReviews]=useState(null);
   const [isEverythingReady,setIsEverythingReady]=useState(false);

   const [canPublish, setCanPublish] = useState(false);
   

   const pitchMaker=()=>{
    if(jobList&&(agencies!=[''])&&allCountries&&agency_CountryPairList&&agencyReviews){
      setIsEverythingReady(true);
    }
   }

   useEffect(()=>{
    pitchMaker();
   },[jobList,agencies,allCountries,agency_CountryPairList,agencyReviews]);

   const getAllAgencyReviews =async()=>{
    const result = await axios.get(`${baseurl}/api/User/reveiws`);
    setAgencyReviews(result.data);
   }
   const getAllAgency_contryPair =async()=>{
     const response =await axios.get(`${baseurl}/api/Agency/AgencyCountries`);
     setAgency_CountryPairList(response.data);
   }

   const getAllAgencies = async()=>{
        const response = await axios.get(`${baseurl}/api/Agency`);
        const allAgencies = response.data;
        setAgencies(allAgencies);
   }

   const getAllCountries =async()=>{
        const response=await axios.get(`${baseurl}/api/Country`);
        setAllCountries(response.data);
   }

    const getAllJobs=async()=>{
       try{
            const result=await axios.get(`${baseurl}/api/Job`);
            setJobList(result.data);
   
            const urgentlyOpens =result.data.filter(a=>a.openedUrgently==true).slice(0,5);
            setUrgentlyOpenedJobs(urgentlyOpens);
   
          }
        catch(err){
          console.log(err);
        }
       
     }

   

  const [sortedAgenciesbyRating,setSortedAgenciesByRating]=useState(null);
  const [agenciesWithLogos, setAgenciesWithLogos] = useState([]);
     
         useEffect(() => {
           if (agencies.length > 0) {
             const result = [...agencies].sort((a, b) => b.averageRating - a.averageRating);
             setSortedAgenciesByRating(result);
           }
         }, [agencies]);
     
         useEffect(() => {
           const fetchAndUpdateLogos = async () => {
             if (sortedAgenciesbyRating) {
               const logos = await Promise.all(
                 sortedAgenciesbyRating.map(agency =>
                   axios.get(`${baseurl}/api/Agency/Logo/${agency.licenseNumber}`)
                     .then(res => res.data)
                 )
               );
               const updated = sortedAgenciesbyRating.map((agency, index) => ({
                 ...agency,
                 logo: logos[index],
               }));
               setAgenciesWithLogos(updated);
             }
           };
           fetchAndUpdateLogos();
         }, [sortedAgenciesbyRating]);
     
   
     
     useEffect(
       ()=>{
            if(window.location.pathname!='/'){
              set_common_signIn_signUp_state(0);
            }
            const savedUser = localStorage.getItem("user");
            if (savedUser) {
              setUserLogedIn(JSON.parse(savedUser));
            }
            getAllJobs();
            getAllAgencies();
            getAllCountries();
            getAllAgency_contryPair();
            getAllAgencyReviews();
       },[]);
      
    // console.log(userLogedIn);
    // console.log(agencyReviews);
    console.log(agenciesWithLogos);
  return (
    
      <div className="main_container">
        <div className="navigation_container">
          <Nav signInState={signInState} setSignInState={setSignInState} commonSignIn_SignUp_state={commonSignIn_SignUp_state} 
          setSelectedJobFromJobPage={setSelectedJobFromJobPage} set_common_signIn_signUp_state={set_common_signIn_signUp_state}
          userLogedIn={userLogedIn} setSelectedAgency={setSelectedAgency} canPublish={canPublish} setCanPublish={setCanPublish}/>
        </div>

        <div className="page_container">
          <Routes>
            <Route path="/" element={<Login signInState={signInState} setSignInState={setSignInState} setUserLogedIn={setUserLogedIn}
             set_common_signIn_signUp_state={set_common_signIn_signUp_state} commonSignIn_SignUp_state={commonSignIn_SignUp_state}/>}/>
            
            <Route path="/Home" element={<Home isEverythingReady={isEverythingReady} />} />
            
            
            <Route path="/ExploreGlobe" element={<ExploreGlobe allCountries={allCountries} 
            agency_CountryPairList={agency_CountryPairList} agencies={agencies} setSelectedAgency={setSelectedAgency}/>} />
            

            <Route path="/GlobalJobs" element={<GlobalJobs urgentlyOpenedJobs={urgentlyOpenedJobs} jobList={jobList} 
             setSelectedJobFromJobPage={setSelectedJobFromJobPage}/>} />

            <Route path="/AgencyRegistering" element={<AgencyRegistering  setAgencies={setAgencies} jobList={jobList}
             setJobList={setJobList} setUrgentlyOpenedJobs={setUrgentlyOpenedJobs} agencies={agencies} canPublish={canPublish}
             setCanPublish={setCanPublish}/>} />
            
            <Route path="/Ratings" element={<Ratings isEverythingReady={isEverythingReady} 
            sortedAgenciesbyRating={sortedAgenciesbyRating} userLogedIn={userLogedIn}
            agenciesWithLogos={agenciesWithLogos} agencyReviews={agencyReviews} agencies={agencies} setAgencyReviews={setAgencyReviews}/>} />
            
            <Route path="/Agency"   element={<AgencyPage selectedJobFromJobPage={selectedJobFromJobPage}
              agencies={agencies} selectedAgency={selectedAgency}/>}/>
          </Routes>
        </div>
      </div>
    
  )
}

export default App
