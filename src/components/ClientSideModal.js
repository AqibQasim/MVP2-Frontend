import PropTypes from "prop-types";
import ButtonCapsule from "./ButtonCapsule";
import Modal from "./Modal";

function ClientSideModal({ opens, button, window }) {
  return (
    <Modal>
      <Modal.Open opens={opens}>
        {/* Wrapper used to avoid making ButtonCapsule a client component elsewhere */}
        <div className="client-component-wrapper">{button}</div>
      </Modal.Open>
      <Modal.Window name={opens}>{window}</Modal.Window>
    </Modal>
  );
}

ClientSideModal.propTypes = {
  opens: PropTypes.string.isRequired,
  button: PropTypes.node.isRequired,
  window: PropTypes.node.isRequired,
};

export default ClientSideModal;
