"use client";
import { useState } from "react";
import AdminCreateAJobForm from "./AdminCreateAJobForm";
import Modal from "./Modal";
import ButtonCapsule from "./ButtonCapsule";

function AdminCreateAJobModal({ clientId }) {
  const [modalName, setModalName] = useState("create-a-job");
  const closeModal = () => setModalName("");
  return (
    <Modal>
      <Modal.Open opens="create-a-job">
        {/* <ButtonCapsule>Create a job</ButtonCapsule> */}
        <button className="px-4 py-2 font-bold !text-primary-tint-10">
          Create a job
        </button>
      </Modal.Open>
      <Modal.Window name={modalName}>
        <AdminCreateAJobForm clientId={clientId} closeModal={closeModal} />
      </Modal.Window>
    </Modal>
  );
}

export default AdminCreateAJobModal;
