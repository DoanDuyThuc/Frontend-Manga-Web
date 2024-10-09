import React, { useEffect, useState } from 'react'
import './HeaderComponent.scss'
import { HeaderTop } from './HeaderTop'
import { HeaderBottom } from './HeaderBottom'
import { FaChevronUp, FaRegLightbulb } from "react-icons/fa";


export const HeaderComponent = () => {

    const [isVisible, setIsVisible] = useState(true);
    const path = window.location.pathname;

    const handleClickTop = () => {
        const headerElement = document.querySelector('.HeaderComponent__Top');

        if (headerElement) {
            headerElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const header = document.querySelector('.HeaderComponent__Bottom');

        //Theo dõi sự xuất hiện và biến mất của thẻ header trong viewport.
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 } // 10%
        );

        if (header) {
            //quan sát thẻ header
            observer.observe(header);
        }

        return () => {
            if (header) {
                //ngưng quan sát thẻ header
                observer.unobserve(header);
            }
        };
    }, []);

    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === 'true';
    });

    useEffect(() => {
        // Thay đổi lớp cho body khi chế độ tối được kích hoạt
        document.body.classList.toggle('dark-mode', isDarkMode);
        document.querySelector('.HeaderComponent__Bottom')?.classList?.toggle('dark-mode', isDarkMode);
        document.querySelector('.HeaderComponent__Top')?.classList?.toggle('dark-mode', isDarkMode);
        document.querySelector('.HeaderComponent__Bottom__nav__container')?.classList?.toggle('dark-mode', isDarkMode);
        document.querySelector('.FooterComponent')?.classList?.toggle('dark-mode', isDarkMode);
        document.querySelector('.DetailMangaPage')?.classList?.toggle('dark-mode', isDarkMode);
        document.querySelector('.HeaderComponent__Bottom__nav__container__List')?.classList?.toggle('dark-mode', isDarkMode);


        localStorage.setItem('darkMode', isDarkMode);

        return () => {
            document.body.classList?.remove('dark-mode');
            document.querySelector('.HeaderComponent__Bottom')?.classList?.remove('dark-mode');
            document.querySelector('.HeaderComponent__Top')?.classList?.remove('dark-mode');
            document.querySelector('.HeaderComponent__Bottom__nav__container')?.classList?.remove('dark-mode');
            document.querySelector('.FooterComponent')?.classList?.remove('dark-mode');
            document.querySelector('.DetailMangaPage')?.classList?.remove('dark-mode');
            document.querySelector('.HeaderComponent__Bottom__nav__container__List')?.classList?.remove('dark-mode');
        };

    }, [isDarkMode, path]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className='HeaderComponent'>
            <HeaderTop />
            <HeaderBottom isDarkMode={isDarkMode} />
            {isVisible &&
                <button onClick={toggleDarkMode} className='darkMode'>
                    <FaRegLightbulb />
                </button>
            }

            {!isVisible &&
                <button onClick={handleClickTop} className='backToTop'>
                    <FaChevronUp />
                </button>
            }


        </div>
    )
}
