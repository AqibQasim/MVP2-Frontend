import React from 'react';
import '../styles/overlay.css';
import { useData } from '@/contexts/DataContext';


const Overlay = ({ isVisible, children }) => {



  const { isOverlayVisible } = useData();

  if (isOverlayVisible === false) {
    return null;  
  }

  return (
    <div className="w-full h-full fixed inset-0 flex items-center justify-center bg-white bg-opacity-10 backdrop-blur-md z-50 overflow-hidden">
        {children}
    </div>
  );
};

export default Overlay;
