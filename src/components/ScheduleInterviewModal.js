"use client";
import ButtonCapsule from "./ButtonCapsule";
import Modal from "./Modal";

function ScheduleInterviewModal() {
  return (
    <Modal>
      <Modal.Open opens="schedule-interview">
        {/* Wrapper used to avoid making ButtonCapsule a client component elsewhere */}
        <div className="client-component-wrapper">
          <ButtonCapsule>Schedule Interview</ButtonCapsule>
        </div>
      </Modal.Open>
      <Modal.Window name="schedule-interview">
        <div className="part-one">
          <h1>this one is the first part</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos
            aspernatur placeat temporibus esse delectus eligendi dolore
            mollitia, recusandae natus, excepturi consequuntur animi pariatur,
            corporis id quod omnis iste illum iusto!
          </p>
          <Modal.Open opens="schedule-interview-second-part">
            <button className="text-xl uppercase">
              {" "}
              change to second part{" "}
            </button>
          </Modal.Open>
        </div>
      </Modal.Window>
      <Modal.Window name="schedule-interview-second-part">
        <div className="part-two">
          <p>this is the second part in modal</p>
        </div>
      </Modal.Window>
    </Modal>
  );
}

export default ScheduleInterviewModal;
