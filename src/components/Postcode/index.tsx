import { Dispatch, SetStateAction } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import Close from 'public/images/icon-delete.svg';
import { Portal } from '../Portal';
import * as Styled from './styled';

interface IPostcodeProps {
  setIsPostcodeOpen: Dispatch<SetStateAction<boolean>>;
  setValue: UseFormSetValue<FieldValues>;
}

export function Postcode({ setIsPostcodeOpen, setValue }: IPostcodeProps) {
  const handleComplete = (data: {
    address: any;
    addressType: string;
    bname: string;
    buildingName: string;
    zonecode: string;
  }) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setIsPostcodeOpen(false);
    setValue('zipcode', data.zonecode, { shouldValidate: true });
    setValue('address', fullAddress, { shouldValidate: true });
  };

  const postcodeStyle = {
    width: '100%',
    height: '100%'
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
            <Close />
            <span className="sr-only">우편번호 검색창 닫기</span>
          </button>
        </Styled.Inner>
      </Styled.Container>
    </Portal>
  );
}
