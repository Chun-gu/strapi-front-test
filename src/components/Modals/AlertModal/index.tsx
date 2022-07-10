import { Buttons } from "@components";
import { useModal } from "@hooks";
import ModalContainer from "../ModalContainer";
import { Content, Wrapper as wrapper } from "../styled";
import styled from "styled-components";

const Wrapper = styled(wrapper)`
  text-align: center;
`;

type AlertModalProps = {
  modalId: string;
  onClose?: () => void;
};

const AlertModal = ({ modalId, onClose }: AlertModalProps) => {
  const alertModal = useModal({ modalId });

  let sentence;
  switch (modalId) {
    case "postDone":
      sentence = "작성이 완료되었습니다.";
      break;
    case "updateDone":
      sentence = "수정이 완료되었습니다.";
      break;
    case "deleteDone":
      sentence = "삭제가 완료되었습니다.";
      break;
    case "error":
      sentence = "오류가 발생했습니다. 다시 시도해주시기 바랍니다.";
      break;
  }

  const handleClose = async () => {
    if (onClose) onClose();
    alertModal.closeAll();
  };

  return (
    <>
      {alertModal.modal.isOpen && (
        <ModalContainer closeModal={alertModal.closeAll}>
          <Wrapper>
            <Content>{sentence}</Content>
            <Buttons.Custom
              type="button"
              width={10}
              height={3}
              fontSize={1.6}
              color="green"
              disabled={false}
              autofocus={true}
              onClick={handleClose}
            >
              확인
            </Buttons.Custom>
          </Wrapper>
        </ModalContainer>
      )}
    </>
  );
};

export default AlertModal;
