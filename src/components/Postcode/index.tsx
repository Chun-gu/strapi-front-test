import { Dispatch, SetStateAction } from "react";
import DaumPostcode from "react-daum-postcode";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import { Portal } from "@components";
import CloseIcon from "public/assets/icons/icon-delete.svg";
import * as Styled from "./styled";

interface IPostcodeProps {
  setIsPostcodeOpen: Dispatch<SetStateAction<boolean>>;
  setValue: UseFormSetValue<FieldValues>;
}

const Postcode = ({ setIsPostcodeOpen, setValue }: IPostcodeProps) => {
  const handleComplete = (data: {
    address: string;
    addressType: string;
    bname: string;
    buildingName: string;
    zonecode: string;
  }) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setIsPostcodeOpen(false);
    setValue("zipcode", data.zonecode, { shouldValidate: true });
    setValue("address", fullAddress, { shouldValidate: true });
  };

  const postcodeStyle = {
    width: "100%",
    height: "100%",
  };

  const closePostcode = () => {
    setIsPostcodeOpen(false);
  };

  return (
    <Portal selector="#portal">
      <Styled.Container>
        <Styled.Overlay onClick={closePostcode} />
        <Styled.Inner>
          <header>우편번호 검색</header>
          <DaumPostcode onComplete={handleComplete} style={postcodeStyle} />
          <button type="button" onClick={closePostcode}>
            <CloseIcon width={25} height={25} />
            <span className="sr-only">우편번호 검색창 닫기</span>
          </button>
        </Styled.Inner>
      </Styled.Container>
    </Portal>
  );
};

export default Postcode;
