// pages/setup-complete.js
import React from 'react';

const SetupComplete = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="text-center">
                <h1 className="text-3xl font-bold">Setup Complete</h1>
                <p className="mt-4">Your payment method setup is complete. You can now use it for future payments.</p>
                <a href="/" className="mt-6 inline-block bg-primary text-white py-2 px-4 rounded-full">
                    Go to Home
                </a>
            </div>
        </div>
    );
};

export default SetupComplete;
