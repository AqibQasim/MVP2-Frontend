"use client";
import { useState } from "react";
import AdminCreateAJobForm from "./AdminCreateAJobForm";
import Modal from "./Modal";

function AdminCreateAJobModal({ clientId }) {
  const [modalName, setModalName] = useState("create-a-job");
  const closeModal = () => setModalName("");
  return (
    <Modal>
      <Modal.Open opens="create-a-job">
        <button>Create a job</button>
      </Modal.Open>
      <Modal.Window name={modalName}>
        <AdminCreateAJobForm clientId={clientId} closeModal={closeModal} />
      </Modal.Window>
    </Modal>
  );
}

export default AdminCreateAJobModal;
