import React, { useEffect } from 'react'
import auth0 from 'auth0-js';


const CallbackPopup = () => {
  let callbackUrl = window.location.protocol + "//" + window.location.host
  useEffect(() => {
    let auth = new auth0.WebAuth({
      domain: 'https://dev-xbhwhdj3wrltd7bv.us.auth0.com',
      clientID: 'VRNrC8mxH3DP7v16nT41siK7zIqS8Whl',
      redirectUri: callbackUrl,
      popupOrigin: callbackUrl
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

