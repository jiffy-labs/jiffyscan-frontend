import React, {useEffect, useState} from "react";

function useWidth(initial?: number) {
  const [width, setWidth] = useState<number>(initial || 0);

  function widthSetter() {
    const getWidth = document.body.clientWidth;
    setWidth(getWidth);
  }

  useEffect(() => {
    widthSetter();
    window.addEventListener("resize", widthSetter);
  }, [width]);

  return width;
}

export default useWidth;
