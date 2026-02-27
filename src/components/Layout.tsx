import { useEffect, useRef, type ReactNode } from 'react';
import { Footer } from './Footer';
import { useStretchEffect } from '../hooks/useStretchEffect';

function usePageSetup(title: string, bodyClass: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    document.body.className = bodyClass;
  }, [bodyClass]);
}

type LayoutProps = {
  title: string;
  bodyClass: string;
  header: ReactNode;
  children: ReactNode;
  useMain?: boolean;
  showFooter?: boolean;
  showSkipLink?: boolean;
};

export function Layout({
  title,
  bodyClass,
  header,
  children,
  useMain = true,
  showFooter = true,
  showSkipLink,
}: LayoutProps) {
  const appRef = useRef<HTMLDivElement>(null);
  const isHome = bodyClass.split(/\s+/).includes('home');

  usePageSetup(title, bodyClass);
  useStretchEffect(appRef, isHome);

  const shouldShowSkipLink = showSkipLink ?? !isHome;

  return (
    <>
      {shouldShowSkipLink ? (
        <a className="skip-link" href="#nav">
          Jump to navigation
        </a>
      ) : null}
      <div ref={appRef} className="app">
        <header className={`header-main ${bodyClass}`}>{header}</header>
        {useMain ? <main id="content">{children}</main> : children}
        {showFooter ? <Footer bodyClass={bodyClass} /> : null}
      </div>
    </>
  );
}
