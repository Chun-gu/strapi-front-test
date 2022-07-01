import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { modalIdListAtom, modalSelectorFamily } from "src/atoms/modalAtom";

const useModal = (modalId: string) => {
  const [modal, setModal] = useRecoilState(modalSelectorFamily(modalId));
  const resetModal = useResetRecoilState(modalSelectorFamily(modalId));
  const modalIdList = useRecoilValue(modalIdListAtom);
  console.log(modalIdList);

  const addText = (text: string) => {
    setModal((prev) => ({ ...prev, text }));
  };

  const open = () => {
    setModal((prev) => ({ ...prev, isOpen: true }));
  };

  // const hideModal = () => {
  //   if (onClose) onClose();
  //   setModal((prev) => ({ ...prev, isOpen: false }));
  // };

  const close = () => {
    resetModal();
  };

  const closeAll = () => {
    return null;
  };

  return { modal, addText, open, close, closeAll };
};

export default useModal;
