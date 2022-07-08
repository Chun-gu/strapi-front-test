import UpIcon from "public/assets/icons/icon-caret-up.svg";
import { COLOR } from "@styles/color";
import styled from "styled-components";

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button onClick={scrollToTop}>
      <UpIcon width={40} height={40} />
    </Button>
  );
};

export default ScrollToTopButton;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: ${COLOR.accentColor};
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 100;
  & > svg {
    path {
      stroke: ${COLOR.white};
    }
  }
`;
