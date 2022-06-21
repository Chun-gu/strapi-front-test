import { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";

interface IPortalProps {
  children: ReactNode;
  selector: string;
}

export function Portal({ children, selector }: IPortalProps) {
  const element =
    typeof window !== "undefined" && document.querySelector(selector);

  useEffect(() => {
    document.body.style.cssText = `
        position: fixed; 
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return element && children ? ReactDOM.createPortal(children, element) : null;
}
