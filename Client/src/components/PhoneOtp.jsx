// import { signInWithPhoneNumber } from 'firebase/auth'
import React, { useState } from 'react'
import { auth, RecaptchaVerifier,signInWithPhoneNumber} from "../firebase.js";



const PhoneOtp = () => {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [sent, setSent] = useState("false");

    const setupRecaptcha=()=>{
        if(!window.RecaptchaVerifier){
            window.RecaptchaVerifier=new RecaptchaVerifier(auth, "recaptcha-container",{
                size:"invisible",
            });
            return window.RecaptchaVerifier;
        }
    };

    const sendOtp=async ()=>{
        const appVerifier=setupRecaptcha();
        const confirmationResult=await signInWithPhoneNumber(auth,phone,appVerifier);
    window.confirmationResult=confirmationResult;
    setSent(true);
};

const verifyOtp=async ()=>{
    const result=await window.confirmationResult.confirm(otp);
    const firebaseUser=result.user;
    const idToken=await firebaseUser.getIdToken();

    const res=await fetch(`${import.meta.env.VITE_API_URL}/api/auth/phone/verify`,{
        method:"POST",
        headers:{
            "content-Type":"application/json",
        },
        body:JSON.stringify({idToken}),
        credentials:"include",
    });
    const data=await res.json();
    alert(data.message || "phone verified");
    
};
  return (
    <div>
        {!sent ?(
            <>
            <input value={phone} onChange={e=>setPhone(e.target.value)}placeholder="+91.."/>
            <button onClick={sendOtp}>Send OTP</button>
            <div id="recaptcha-container"/>
            </>
        ):(
            <>
            <input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="Enter Otp"/>
            <button onClick={verifyOtp}>Verify</button>
            </>

        )

        }
    </div>
  )
}

export default PhoneOtp