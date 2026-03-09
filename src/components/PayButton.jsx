import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getLanguage } from '../utils/getLanguage';

function PayButton({text}) {
  const { tempToken } = useContext(AppContext);

  const generateStripePay = async (e) =>{
    try{
 
      const language = getLanguage();

      e.preventDefault();

      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/enableMembership`,
       { headers : {
        'Authorization': `Bearer ${tempToken}`,
          'Content-Type': 'application/json'
        }, params: {
          language
        }} 
      );

      if(response?.data?.status == "success"){
        // FIXED: window.location.href is 100% safe for iOS/Safari
        window.location.href = response.data.session;

        localStorage.removeItem("waitlist_completed");
      }
      else{
        toast.error(response?.response?.data?.message)
      }
    }
    catch(e){
       toast.error(e?.response?.data?.message || "Something Went Wrong, Please Try Again Later");
      console.log(e)
    }
  }

  return (
    <>
        <button 
            className="px-10 py-3 rounded-full text-white cursor-pointer text-md transition-all hover:scale-105 active:scale-95 touch-manipulation relative z-50"
            style={{
              background: 'linear-gradient(90deg, #94BD1C 0%, #29C28C 100%)'
            }}
            onClick={generateStripePay}
          >
            {text}
          </button>
    </>
  ) 
}

export default PayButton