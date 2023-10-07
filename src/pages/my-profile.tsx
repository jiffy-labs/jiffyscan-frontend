import React, {useEffect} from 'react'
import Profile from '@/views/Profile/profile'
import ReactGA from "react-ga4";
import SEO from "@/components/common/SEO";

const MyProfile = () => {
  useEffect(() => {
    ReactGA.send({ hitType: 'My Profile', page: window.location.pathname });
  }, []);
  return (
      <div>
        <SEO/>
        <Profile />
      </div>
  )
}

export default MyProfile