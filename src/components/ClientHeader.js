"use client";
import { useState, useRef, useEffect } from "react";
import SvgIconNotification from "@/svgs/SvgIconNotification";
import SvgIconSettings from "@/svgs/SvgIconSettings";
import { formatDate } from "@/utils/utility";
import ButtonCapsule from "./ButtonCapsule";
import ButtonRounded from "./ButtonRounded";
import EntityCard from "./EntityCard";
import { PopupModal } from "react-calendly";

function ClientHeader() {
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex" id='scheduleCallBtn' >
      <EntityCard
        lg
        entity={{
          image: "/avatars/avatar-2.png",
          name: "Richard Feynman",
          profession: "Richardfeynman@gmail.com",
        }}
      />
      <div className="info ml-auto space-y-4 "  >
        <div className="buttons flex items-start justify-end gap-2">
          <EntityCard
            sm
            entity={{
              image: "/avatars/avatar-3.svg",
              name: "Esther Howard",
              profession: "Account Executive - AE",
            }}
          />
          <ButtonRounded>
            <SvgIconNotification />
          </ButtonRounded>
          <ButtonRounded>
            <SvgIconSettings />
          </ButtonRounded>
          
          {isClient && (
            <div>
              <ButtonCapsule
                ref={buttonRef}
                handleOpenOverlay={() => setIsOpen(true)}
                // id="scheduleCallBtn"
                
              >
                Schedule a Call
              </ButtonCapsule>
              <PopupModal
                url='https://calendly.com/sanjaybaghtwani/30min?hide_landing_page_details=1&hide_gdpr_banner=1&primary_color=4624e0'
                rootElement={document.getElementById('scheduleCallBtn')}
                text="Schedule Call"
                textColor="#fff"
                color="#000"
                onModalClose={() => setIsOpen(false)}
                open={isOpen}
                styles={{
                  html: {
                    overflow: 'hidden',
                  },
                  
                }}
                

              />
            </div>
          )}
        </div>
        <div className="join-date float-right">
          <p className="capitalize text-grey-primary-shade-10">
            Joined date:{" "}
            <span className="font-semibold">
              {formatDate(new Date("2024-04-27"))}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ClientHeader;
