import { Buttons } from "@components";
import { useModal } from "src/atoms/modalAtom";
import ModalContainer from "../ModalContainer";

type AlertModalProps = { onClose?: () => void };

const AlertModal = ({ onClose }: AlertModalProps) => {
  const alertModal = useModal("alertModal");

  const handleClose = () => {
    if (onClose) onClose();
    alertModal.closeModal();
  };

  return (
    <>
      {alertModal.modal.isOpen && (
        <ModalContainer closeModal={alertModal.closeModal}>
          <p>{alertModal.modal.text}</p>
          <Buttons.Custom
            type="submit"
            width={10}
            height={3}
            fontSize={1.6}
            color="green"
            onClick={handleClose}
            disabled={false}
            autofocus={true}
          >
            확인
          </Buttons.Custom>
        </ModalContainer>
      )}
    </>
  );
};

export default AlertModal;
