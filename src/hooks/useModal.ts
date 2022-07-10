import { IInquiry, IReview } from "@types";
import { useRecoilState, useResetRecoilState } from "recoil";
import { modalSelectorFamily } from "src/atoms/modalAtom";

interface UseModalProps {
  modalId: string;
  onSubmit?: (() => void) | ((jwt?: string, id?: number) => void);
  onClose?: () => void;
  prevData?: Partial<IReview & IInquiry>;
}

const useModal = ({ modalId, onSubmit, onClose, prevData }: UseModalProps) => {
  const [modal, setModal] = useRecoilState(modalSelectorFamily(modalId));
  const resetModals = useResetRecoilState(modalSelectorFamily(modalId));

  const open = () => {
    setModal((prev) => ({
      ...prev,
      isOpen: true,
      onSubmit,
      onClose,
      prevData,
    }));
  };

  const submit = () => {
    if (modal.onSubmit) modal.onSubmit();
  };

  const close = () => {
    if (modal.onClose) modal.onClose();
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  const closeAll = () => {
    if (modal.onClose) modal.onClose();
    resetModals();
  };

  return { modal, open, submit, close, closeAll };
};

export default useModal;
