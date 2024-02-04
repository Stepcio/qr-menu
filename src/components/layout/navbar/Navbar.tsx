'use client';
import { useEffect, useState, useCallback } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import styles from './styles.module.css';

export default function Navbar({ fixed }: { fixed?: boolean }) {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback((e: Event) => {
      setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <nav className={
      `${styles.navbar} ${fixed ? 'fixed' : 'sticky'} top-0 inset-x-0 h-[40px] flex justify-between items-center z-50 px-4` +
      (scrollY === 0 ? '' : ' bg-dark-teal/[.9]')
    }>
      <div>QR Menu</div>
      <div>
        <RxHamburgerMenu className='h-[30px] w-[30px]'/>
      </div>
    </nav>
  );
}