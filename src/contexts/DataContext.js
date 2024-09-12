"use client"

import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext({
    isOverlayVisible: false,
    setOverlayVisible: () => {},
    overlayType: null,
    setOverlayType: () => {}
});

export const DataProvider = ({ children }) => {
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [overlayType, setOverlayType] = useState(null);

    return (
        <DataContext.Provider value={{ isOverlayVisible, setOverlayVisible, overlayType, setOverlayType }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);