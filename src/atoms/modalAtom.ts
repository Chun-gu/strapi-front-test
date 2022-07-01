import { atom, atomFamily, DefaultValue, selectorFamily } from "recoil";

interface ModalState {
  id: string;
  text: string;
  isOpen: boolean;
}

export const modalAtomFamily = atomFamily<ModalState, string>({
  key: "modalAtomFamily",
  default: (id) => ({
    id,
    isOpen: false,
    text: "",
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
    ({ set, reset }, newModalState) => {
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
