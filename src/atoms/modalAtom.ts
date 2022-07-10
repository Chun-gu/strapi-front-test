import { atom, atomFamily, DefaultValue, selectorFamily } from "recoil";
import { IReview, IInquiry } from "@types";

interface ModalState {
  id: string;
  isOpen: boolean;
  onSubmit?: () => void;
  onClose?: () => void;
  prevData?: Partial<IReview & IInquiry>;
}

export const modalAtomFamily = atomFamily<ModalState, string>({
  key: "modalAtomFamily",
  default: (id) => ({
    id,
    isOpen: false,
    onSubmit: undefined,
    onClose: undefined,
    prevData: undefined,
  }),
});

export const modalIdListAtom = atom<string[]>({
  key: "modalIdListAtom",
  default: [],
});

export const modalSelectorFamily = selectorFamily<ModalState, string>({
  key: "modalSelectorFamily",
  get:
    (modalId) =>
    ({ get }) =>
      get(modalAtomFamily(modalId)),

  set:
    (modalId) =>
    ({ get, set, reset }, newModalState) => {
      if (newModalState instanceof DefaultValue) {
        // 모든 모달 닫기
        const modalIdList = get(modalIdListAtom);
        modalIdList.forEach((modalId) => reset(modalAtomFamily(modalId)));
        reset(modalIdListAtom);
      } else if (newModalState.isOpen === false) {
        // 특정 모달 닫기
        reset(modalAtomFamily(modalId));
        set(modalIdListAtom, (prev) => prev.filter((item) => item !== modalId));
      } else {
        // 모달 열기
        set(modalAtomFamily(modalId), newModalState);
        set(modalIdListAtom, (prev) =>
          Array.from(new Set([...prev, newModalState.id])),
        );
      }
    },
});
