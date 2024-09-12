"use client";
import ButtonCapsule from "./ButtonCapsule";
import Modal from "./Modal";

function ScheduleCallModal() {
  return (
    <div>
      <Modal>
        <Modal.Open>
          <div className="client-component-wrapper">
            <ButtonCapsule>Schedule Call</ButtonCapsule>
          </div>
        </Modal.Open>
        <Modal.Window>
          <div className="part-one">
            <h1> Schedule Call </h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos
              aspernatur placeat temporibus esse delectus eligendi dolore
              mollitia, recusandae natus, excepturi consequuntur animi pariatur,
              corporis id quod omnis iste illum iusto!
            </p>
          </div>
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default ScheduleCallModal;
