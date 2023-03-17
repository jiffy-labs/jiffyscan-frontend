import React, {useEffect, useState} from "react";

function useNavbarEffect(initial: string, effect: string) {
  const [navbar, setNavbar] = useState<string>(initial);
  useEffect(() => {
    const scrollEffect = () => {
      if (window.scrollY >= 100) {
        setNavbar(effect);
      } else if (window.scrollY <= 20) {
        setNavbar(initial);
      }
    };

    scrollEffect();
    window.addEventListener("scroll", scrollEffect);
  }, []);

  return navbar;
}

export default useNavbarEffect;
