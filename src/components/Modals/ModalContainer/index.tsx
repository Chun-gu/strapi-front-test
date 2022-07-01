import { ReactNode, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { modalIdListAtom } from "@atoms/modalAtom";
import { Portal } from "@components";
import * as Styled from "./styled";

interface ModalContainerProps {
  children: ReactNode;
  closeModal: () => void;
}

const ModalContainer = ({ children, closeModal }: ModalContainerProps) => {
  const modalIdList = useRecoilValue(modalIdListAtom);
  const [isMultiple, setIsMultiple] = useState(false);

  useEffect(() => {
    if (modalIdList.length > 1) {
      setIsMultiple(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Portal selector="#portal">
      <Styled.Container>
        <Styled.Overlay isMultiple={isMultiple} onClick={closeModal} />
        <Styled.Inner isMultiple={isMultiple}>{children}</Styled.Inner>
      </Styled.Container>
    </Portal>
  );
};

export default ModalContainer;
