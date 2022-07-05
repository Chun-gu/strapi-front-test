import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient, useMutation } from "react-query";
import { useSession } from "next-auth/react";
import { addInquiry, updateInquiry } from "@api";
import { Buttons } from "@components";
import { IAddInquiryValues } from "@types";
import { useModal } from "@hooks";
import Spinner from "src/components/Spinner";
import ModalContainer from "../ModalContainer";
import CloseIcon from "public/assets/icons/icon-delete.svg";
import { CloseButton, Input, Title, Wrapper } from "../styled";
import { useRouter } from "next/router";

interface Props {
  modalId: string;
}
const AddInquiryModal = ({ modalId }: Props) => {
  const router = useRouter();
  const { productId } = router.query;

  const addInquiryModal = useModal({ modalId });
  const postDoneModal = useModal({ modalId: "postDone" });
  const updateDoneModal = useModal({ modalId: "updateDone" });
  const errorModal = useModal({ modalId: "error" });

  const inquiryId = addInquiryModal.modal.prevData?.id;
  const prevContent = addInquiryModal.modal.prevData?.content;

  const { data: session } = useSession();
  const {
    reset,
    register,
    getValues,
    handleSubmit,
    formState: { isValid },
  } = useForm<IAddInquiryValues>({
    mode: "onChange",
    defaultValues: {
      content: prevContent || "",
    },
  });

  const queryClient = useQueryClient();
  const { mutate: post, isLoading: isPosting } = useMutation(addInquiry, {
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries(["getInquiries"]);
      postDoneModal.open();
    },
    onError: () => {
      errorModal.open();
    },
  });

  const { mutate: update, isLoading: isUpdating } = useMutation(updateInquiry, {
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries(["getInquiries"]);
      updateDoneModal.open();
    },
    onError: () => {
      errorModal.open();
    },
  });

  const onSubmit = async () => {
    const author = session?.user?.id as number;
    const jwt = session?.jwt as string;
    const { content } = getValues();
    if (modalId === "addInquiry") {
      post({ author, jwt, product: productId, content });
    } else {
      update({ jwt, inquiry: inquiryId, content, author });
    }
  };

  const handleClose = () => {
    if (isPosting || isUpdating) return;
    addInquiryModal.closeAll();
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <>
      <ModalContainer closeModal={handleClose}>
        {(isPosting || isUpdating) && <Spinner />}
        <Wrapper>
          <Title>문의 작성</Title>
          <p>답변이 등록되면 문의를 수정할 수 없습니다.</p>
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
              disabled={!isValid || isPosting || isUpdating}
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
    </>
  );
};

export default AddInquiryModal;
