import AlertModal from "../AlertModal";
import ConfirmModal from "../ConfirmModal";
import AddReviewModal from "../AddReviewModal";
import AddInquiryModal from "../AddInquiryModal";
import { useRecoilValue } from "recoil";
import { modalIdListAtom } from "@atoms/modalAtom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MODAL_COMPONENTS: any = {
  error: AlertModal,
  postDone: AlertModal,
  updateDone: AlertModal,
  deleteDone: AlertModal,
  toLogin: ConfirmModal,
  deleteConfirm: ConfirmModal,
  addReview: AddReviewModal,
  updateReview: AddReviewModal,
  addInquiry: AddInquiryModal,
  updateInquiry: AddInquiryModal,
};

const GlobalModal = () => {
  const modalIdList = useRecoilValue(modalIdListAtom);

  const render = (modalId: string) => {
    const ModalComponent = MODAL_COMPONENTS[modalId];

    return <ModalComponent key={modalId} modalId={modalId} />;
  };

  return <>{modalIdList.map((modalId) => render(modalId))}</>;
};

export default GlobalModal;
