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
        overflow: hidden;`;

    return () => {
      document.body.style.cssText = "";
    };
  }, []);

  return element && children ? ReactDOM.createPortal(children, element) : null;
}
