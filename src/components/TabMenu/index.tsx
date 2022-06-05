import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import * as Buttons from '../Buttons';
import * as Styled from './styled';

interface ITabMenuProps {
  sectionRefs: {
    current: HTMLElement[];
  };
}

export function TabMenu({ sectionRefs: { current } }: ITabMenuProps) {
  const TabMenuDatas = ['제품 상세 정보', '리뷰', 'Q&A', '교환/반품 정보'];
  const [activeTab, setActiveTab] = useState<HTMLElement | Element>();
  const tabMenu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveTab(current[0]);

    const changeSelectedTab = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target);
        }
      });
    };

    const observerOption = { threshold: 0.6 };
    const observer = new IntersectionObserver(
      changeSelectedTab,
      observerOption
    );

    current.forEach((tab) => observer.observe(tab));

    return () => observer.disconnect();
  }, [current]);

  const handleClick = (index: number) => {
    const navHeight = document.getElementsByTagName('nav')[0].offsetHeight;
    const tabMenuHeight = tabMenu!.current!.offsetHeight;

    window.scrollTo({
      top: current[index].offsetTop - navHeight - tabMenuHeight,
      left: 0,
      behavior: 'smooth'
    });
    setActiveTab(current[index]);
  };

  return (
    <Styled.TabMenu ref={tabMenu}>
      {TabMenuDatas.map((data, index) => (
        <Buttons.Tab
          key={nanoid()}
          isActive={activeTab === current[index]}
          onClick={() => handleClick(index)}
        >
          {data}
        </Buttons.Tab>
      ))}
    </Styled.TabMenu>
  );
}
