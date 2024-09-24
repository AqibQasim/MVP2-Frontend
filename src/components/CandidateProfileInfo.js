"use client";
import { useState } from "react";
import CandidateProfileInfoForm from "./CandidateProfileInfoForm";
import Modal from "./Modal";

function CandidateProfileInfo() {
  const [modalName, setModalName] = useState("update-candidate-profile");
  const closeModal = () => setModalName("");
  return (
    <Modal>
      <Modal.Open opens="update-candidate-profile">
        <button>Add profile info</button>
      </Modal.Open>
      <Modal.Window name={modalName}>
        <CandidateProfileInfoForm closeModal={closeModal} />
      </Modal.Window>
    </Modal>
  );
}

export default CandidateProfileInfo;
