import * as Styled from "./styled";

interface Props {
  size?: number;
}

const Spinner = ({ size }: Props) => {
  return (
    <Styled.BackGround>
      <Styled.Spinner size={size}></Styled.Spinner>
    </Styled.BackGround>
  );
};

export default Spinner;
