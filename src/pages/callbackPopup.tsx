import React, { useEffect } from 'react'
import auth0 from 'auth0-js';


const CallbackPopup = () => {
  useEffect(() => {
    let auth = new auth0.WebAuth({
      domain: 'https://dev-xbhwhdj3wrltd7bv.us.auth0.com',
      clientID: 'VRNrC8mxH3DP7v16nT41siK7zIqS8Whl',
      redirectUri: 'http://localhost:3000',
      popupOrigin: 'http://localhost:3000'
    });

    auth.popup.callback({hash: window.location.hash});
  }, [])

  return (
    <div>
      Successful log in ! 
    </div>
  )
}

export default CallbackPopup

