import React from 'react'
import { useState, useEffect } from 'react';
import Register from "../components/Registration/Register";
import Header from '../components/Header';
import { baseUrl } from "../apiConfig";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getEvents } from "../api/events";
import {useModal} from "../components/Registration/modal";
import VerifyRunner from '../components/Registration/VerifyRunner';
const BookingPage = () => {
  const { openModal,closeModal } = useModal();
  const [verificationData, setVerificationData] = useState(null);
  const [emailVerifyState,setEmailVerifyState] = useState(false);
  const [smsVerifyState,setSmsVerifyState] = useState(false);

  const handleVerificationData = (data) => {
    setVerificationData(data);
    
  };

  
  const {randomString} = useParams();
  const [regsitrationUrl, setRegistrationUrl] = useState("")
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventsError, setEventsError] = useState("");
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setEventsError("");
        setEventsLoading(true);
        let allEvents = [];
        let currentPage = 1;
        const perPage = 10;
        let totalEvents = 0;
        const response = await getEvents({ page: currentPage, perPage });
        const totalCountHeader = response.headers.get('x-total-count');
        console.log('Total Count Header:', totalCountHeader);
    
        totalEvents = parseInt(totalCountHeader, 10);
        const totalPages = Math.ceil(totalEvents / perPage);
        console.log(`Total Pages to fetch: ${totalPages}`);
  
        allEvents = response.data;
        while (currentPage < totalPages) {
          currentPage++;
          const pageResponse = await getEvents({ page: currentPage, perPage });
          allEvents = allEvents.concat(pageResponse.data);
        }
        setEvents(allEvents);
      } catch (error) {
        console.log("Error during fetching events", error);
        setEventsError(error.message);
      }
      finally {
        setEventsLoading(false);
      }
    }
    fetchData();
  }, []);
  const [runnerClubData, setRunnerClubData] = useState([]);
  const fetchRunnerClub = async () => {
    const response = await axios.get(`${baseUrl}users/getAllRunnerClub`);
    setRunnerClubData(response.data)
  }
  useEffect(()=> {
  fetchRunnerClub();
  }, []);
  useEffect(()=> {
    const fetchData = async()=>{
    const res = await axios.get(`${baseUrl}users/get-specialurl?randomString=${randomString}`)
    setRegistrationUrl(res.data);
    }
    fetchData();
    },[randomString])
    console.log(events, ":events")
    const event = events?.find(event=>event.id === regsitrationUrl?.eventId)
    const runnerClub = runnerClubData?.find(item=>item.id === regsitrationUrl?.runnerClubId);

    
    const [loading, setloading] = useState(false);
    
    useEffect(() => {
      const initializeVerification = async () => {
       
          setEmailVerifyState(event?.isEmailVerificationEnabled);
          setSmsVerifyState(event?.isSmsVerificationEnabled);
   
          if (event?.isEmailVerificationEnabled || event?.isSmsVerificationEnabled) {
            await openModal(
              <VerifyRunner
                closeModal={closeModal}
                onVerify={handleVerificationData}
                isEmailVerificationEnabled={event?.isEmailVerificationEnabled}
                isSmsVerificationEnabled={event?.isSmsVerificationEnabled}
              />
            );
          }
        }
    
      initializeVerification();
    }, [event]);

    const renderSpinner = () => {
        return (
          <div
            className="loading-overlay text-center d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <div className="spinner"></div>
          </div>
        );
      };

  return (
    <>
      <div className="header-margin"></div>

      <Header event={event} runnerClub={runnerClub}/>
      {loading && <> {renderSpinner()}</>}
      <section className="pt-10 layout-pb-md">
        <div className="container">
        <Register event={event} runnerClub={runnerClub} verificationData={verificationData}
         isEmailVerificationEnabled={emailVerifyState} 
        isSmsVerificationEnabled={smsVerifyState}/>
</div>
</section>
</>
  )
}

export default BookingPage