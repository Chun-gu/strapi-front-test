import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient, useMutation } from "react-query";
import { useSession } from "next-auth/react";
import { addInquiry } from "@api";
import { Buttons } from "@components";
import { IAddInquiryValues } from "@types";
import { useModal } from "src/atoms/modalAtom";
import Spinner from "src/components/Spinner";
import AlertModal from "../AlertModal";
import ModalContainer from "../ModalContainer";
import CloseIcon from "public/images/icon-delete.svg";
import * as Styled from "./styled";
import { CloseButton, Input, Title, Wrapper } from "../styled";

type AddInquiryModalProps = { productId: string | string[] | undefined };

const AddInquiryModal = ({ productId }: AddInquiryModalProps) => {
  const addInquiryModal = useModal("addInquiryModal");
  const alertModal = useModal("alertModal");

  const { data: session } = useSession();
  const {
    reset,
    register,
    getValues,
    handleSubmit,
    formState: { isValid },
  } = useForm<IAddInquiryValues>({ mode: "onChange" });

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(addInquiry, {
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries(["getInquiries"]);
      alertModal.addText("작성을 완료했습니다.");
      alertModal.openModal();
    },
    onError: (error) => {
      alertModal.addText(
        "작성에 실패했습니다. 잠시 후 다시 시도해주시기 바랍니다.",
      );
      alertModal.openModal();
    },
  });

  const onSubmit = async () => {
    const author = session?.user?.id as number;
    const jwt = session?.jwt as string;
    const { content } = getValues();
    mutate({ author, jwt, product: productId, content });
  };

  const handleClose = () => {
    if (isLoading) return;
    addInquiryModal.closeModal();
  };

  useEffect(() => {
    console.log("AddInquiryModal 마운트");
    return () => {
      console.log("AddInquiryModal 언마운트");
      reset();
    };
  }, []);

  return (
    <>
      <ModalContainer closeModal={handleClose}>
        {isLoading && <Spinner />}
        <Wrapper>
          <Title>문의 작성</Title>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="content" className="sr-only">
                문의 내용
              </label>
              <Input
                id="content"
                placeholder="문의를 작성하세요. (10자 ~ 200자)"
                {...register("content", {
                  required: true,
                  minLength: 10,
                  maxLength: 200,
                })}
              />
            </div>
            <Buttons.Custom
              type="submit"
              width={10}
              height={3}
              fontSize={1.6}
              color="green"
              disabled={!isValid || isLoading}
            >
              작성
            </Buttons.Custom>
          </form>
          <CloseButton onClick={handleClose}>
            <CloseIcon width={18} height={18} />
            <span className="sr-only">문의 작성창 닫기</span>
          </CloseButton>
        </Wrapper>
      </ModalContainer>
      {alertModal.modal.isOpen && (
        <AlertModal modalId="alertModal" onClose={handleClose} />
      )}
    </>
  );
};

export default AddInquiryModal;
