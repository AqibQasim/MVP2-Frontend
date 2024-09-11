import React from 'react'
import '../styles/overlay-bg-image.css';

function OnboardingBgImage({children}) {
  return (
    <div className="bg-image-overlay rounded-[36px] inset-0 w-screen h-screen fixed flex items-center justify-center bg-white bg-opacity-10 ">
        {children}
    </div>
  )
}

export default OnboardingBgImage