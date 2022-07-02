import { Buttons, Spinner } from "@components";
import { useModal } from "@hooks";
import ModalContainer from "../ModalContainer";
import AlertModal from "../AlertModal";
import { Content, Wrapper as wrapper } from "../styled";
import styled from "styled-components";

const Wrapper = styled(wrapper)`
  text-align: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

type confirmModalProps = {
  modalId: string;
  onClose?: () => void;
  isLoading: boolean;
};

const ConfirmModal = ({ modalId, onClose, isLoading }: confirmModalProps) => {
  const confirmModal = useModal(modalId);
  const deletionComplete = useModal("deletionComplete");

  const sentence =
    modalId === "toLogin"
      ? "로그인 페이지로 이동하시겠습니까?"
      : "정말 삭제하시겠습니까?";

  const action = modalId === "toLogin" ? "이동" : "삭제";

  const handleAction = () => {
    if (onClose) onClose();
  };

  return (
    <>
      <ModalContainer closeModal={confirmModal.close}>
        {isLoading && <Spinner />}
        <Wrapper>
          <Content>{sentence}</Content>
          <ButtonsWrapper>
            <Buttons.Custom
              type="button"
              width={10}
              height={3}
              fontSize={1.6}
              color="green"
              onClick={confirmModal.close}
              disabled={false}
            >
              취소
            </Buttons.Custom>
            <Buttons.Custom
              type="button"
              width={10}
              height={3}
              fontSize={1.6}
              color={modalId === "toLogin" ? "green" : "red"}
              onClick={handleAction}
              disabled={false}
            >
              {action}
            </Buttons.Custom>
          </ButtonsWrapper>
          {deletionComplete.modal.isOpen && <AlertModal modalId="deleteDone" />}
        </Wrapper>
      </ModalContainer>
      <AlertModal modalId="error" />
    </>
  );
};

export default ConfirmModal;
