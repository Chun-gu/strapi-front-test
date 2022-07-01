import { RefObject, useEffect, useState } from "react";

const useIntersectionObserver = (
  targetRef: RefObject<Element>,
  { root = null, rootMargin = "0%", threshold = 0 }: IntersectionObserverInit,
): IntersectionObserverEntry | undefined => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  console.log(entry);
  const onIntersect = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
    const target = targetRef?.current;

    if (!target) return;

    const options = { root, rootMargin, threshold };
    const observer = new IntersectionObserver(onIntersect, options);

    observer.observe(target);

    return () => observer.disconnect();
  }, [root, rootMargin, targetRef, threshold]);

  return entry;
};

export default useIntersectionObserver;
