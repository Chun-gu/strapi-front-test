import {
  atom,
  atomFamily,
  DefaultValue,
  selectorFamily,
  useRecoilState,
  useResetRecoilState,
} from "recoil";

interface ModalState {
  id: string;
  text: string;
  isOpen: boolean;
}

type modalId = string;

export const modalAtomFamily = atomFamily<ModalState, modalId>({
  key: "modalAtomFamily",
  default: (id) => ({
    id,
    isOpen: false,
    text: "",
  }),
});

export const modalIdListAtom = atom<modalId[]>({
  key: "modalIdListAtom",
  default: [],
});

export const modalSelectorFamily = selectorFamily<ModalState, modalId>({
  key: "modalSelectorFamily",
  get:
    (modalId) =>
    ({ get }) =>
      get(modalAtomFamily(modalId)),

  set:
    (modalId) =>
    ({ get, set, reset }, newModalState) => {
      if (newModalState instanceof DefaultValue) {
        reset(modalAtomFamily(modalId));
        set(modalIdListAtom, (prev) => prev.filter((item) => item !== modalId));

        return;
      }

      set(modalAtomFamily(modalId), newModalState);
      set(modalIdListAtom, (prev) =>
        Array.from(new Set([...prev, newModalState.id])),
      );
    },
});

export const useModal = (modalId: modalId, onClose?: () => void) => {
  const [modal, setModal] = useRecoilState(modalSelectorFamily(modalId));
  const resetModal = useResetRecoilState(modalSelectorFamily(modalId));

  const addText = (text: string) => {
    setModal((prev) => ({ ...prev, text }));
  };

  const openModal = () => {
    setModal((prev) => ({ ...prev, isOpen: true }));
  };

  // const hideModal = () => {
  //   if (onClose) onClose();
  //   setModal((prev) => ({ ...prev, isOpen: false }));
  // };

  const closeModal = () => {
    resetModal();
  };

  const closeAllModal = () => {};

  return { modal, addText, openModal, closeModal, closeAllModal };
};
