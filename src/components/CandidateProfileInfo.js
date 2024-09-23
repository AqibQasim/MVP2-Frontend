"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import Modal from "./Modal";
import CandidateProfileInfoForm from "./CandidateProfileInfoForm";

function CandidateProfileInfo() {
  const [modalName, setModalName] = useState("create-a-job");
  const closeModal = () => setModalName("");
  const params = useParams();
  const candidateId = params.candidateId;
  return (
    <Modal>
      <Modal.Open opens="create-a-job">
        <button>Add profile info</button>
      </Modal.Open>
      <Modal.Window name={modalName}>
        <CandidateProfileInfoForm
          candidateId={candidateId}
          closeModal={closeModal}
        />
      </Modal.Window>
    </Modal>
  );
}

export default CandidateProfileInfo;
