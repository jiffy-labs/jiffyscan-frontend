import React from "react";

function BacktoTop() {
  function handleButtonClick() {
    window.scrollTo({top: 0, behavior: "smooth"});
  }

  return (
    <div
      onClick={handleButtonClick}
      className="flex items-center gap-2"
      role="button"
    >
      <img src="/images/icon-container (24).svg" alt="" />
      <span className="font-bold text-white">Back to Top</span>
    </div>
  );
}

export default BacktoTop;
