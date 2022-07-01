import { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import { useRecoilValue } from "recoil";
import { modalIdListAtom } from "@atoms/modalAtom";

interface IPortalProps {
  children: ReactNode;
  selector: string;
}

const Portal = ({ children, selector }: IPortalProps) => {
  const modalIdList = useRecoilValue(modalIdListAtom);
  const element =
    typeof window !== "undefined" && document.querySelector(selector);

  useEffect(() => {
    if (modalIdList.length === 1) {
      document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      width: 100%;
      overflow-y: scroll;`;
    }

    return () => {
      if (modalIdList.length === 1) {
        const scrollY = document.body.style.top;
        document.body.style.cssText = "";
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return element && children ? ReactDOM.createPortal(children, element) : null;
};

export default Portal;
