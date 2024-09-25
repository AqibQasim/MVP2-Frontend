"use client";
import Image from "next/image";
import React from "react";
import '../../../../../styles/overlay-bg-image.css';
import Modal from "@/components/AdminJobsFormModal";

function page() {
  return (
    <html lang="en">
      <body className="bg-image-overlay rounded-[36px] inset-0 w-screen h-screen fixed flex items-center justify-center bg-white bg-opacity-10 ">
        <Modal>
            <div>
                You have successfully
            </div>
        </Modal>
      </body>
    </html>
  );
}

export default page;
