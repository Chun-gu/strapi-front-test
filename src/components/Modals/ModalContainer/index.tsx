import { ReactNode, useEffect } from "react";
import { Portal } from "src/components/Portal";
import * as Styled from "./styled";

interface ModalContainerProps {
  children: ReactNode;
  closeModal: () => void;
}

const ModalContainer = ({ children, closeModal }: ModalContainerProps) => {

  return (
    <Portal selector="#portal">
      <Styled.Container>
        <Styled.Overlay onClick={closeModal} />
        <Styled.Inner>{children}</Styled.Inner>
      </Styled.Container>
    </Portal>
  );
};

export default ModalContainer;
