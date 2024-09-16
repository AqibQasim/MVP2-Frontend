"use client";
import AdminCreateAJobForm from "./AdminCreateAJobForm";
import Modal from "./Modal";

function AdminCreateAJobModal({ clientId }) {
  return (
    <Modal>
      <Modal.Open opens="create-a-job">
        <button>Create a job</button>
      </Modal.Open>
      <Modal.Window name="create-a-job">
        <AdminCreateAJobForm clientId={clientId} />
      </Modal.Window>
    </Modal>
  );
}

export default AdminCreateAJobModal;
