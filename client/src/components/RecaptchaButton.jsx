import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import axios from 'axios';
import { useRef } from 'react';

export const RecaptchaButton = () => {
  const recaptcha = useRef(null);

  async function submitCaptcha(event) {
    const captchaValue = recaptcha.current.getValue();

    if (!captchaValue) {
      alert("Please verify the reCAPTCHA!");
    } else {
      const apiUrl = process.env.REACT_APP_API_URL;
      const res = await axios.post(`${apiUrl}/verify`, {
        method: "POST",
        body: JSON.stringify({ captchaValue }),
        headers: {
          "content-type": "application/json",
        },
      });

      const data = await res.json();
      if (data.success) {
        // make form submission
        alert("Form submission successful!");
      } else {
        alert("reCAPTCHA validation failed!");
      }
    }
  }

  return (
  
  <ReCAPTCHA 
  sitekey={process.env.REACT_APP_SITE_KEY}
   ref={recaptcha}
  onChange={submitCaptcha}
     />

  )
}
