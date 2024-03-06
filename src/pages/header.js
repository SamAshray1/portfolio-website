import React, {useRef, useEffect} from 'react';

export default function Header(){
    const nav = useRef(null);

    useEffect(() => {
        const navToggle = document.querySelector(".mobile-nav-toggle");

        const toggleNavVisibility = () => {
            const visibility = nav.current.getAttribute('data-visible');
            console.log('Visibility:', visibility);
            
            if(visibility==="false"){
                nav.current.setAttribute('data-visible', true);
            }else if(visibility==="true"){
                nav.current.setAttribute('data-visible', false);
            }

        };

        // Adding event listeners for both click and touchstart events
        navToggle.addEventListener('click', toggleNavVisibility);
        // navToggle.addEventListener('touchstart', toggleNavVisibility);

        return () => {
            // Removing event listeners when component unmounts
            navToggle.removeEventListener('click', toggleNavVisibility);
            // navToggle.removeEventListener('touchstart', toggleNavVisibility);
        };
    }, []);

    return(
        <header className="flex">
            <h1 className="corner-name">Sam.Ashray_</h1>

            <button className="mobile-nav-toggle" aria-controls="primary-navigation" aria-expanded="false">
                {/* <span className="sr-only">Menu</span> */}
                </button>

            <nav>
                <ul ref={nav} id="primary-navigation" data-visible="false" className="primary-navigation flex">
                    <li className="active"><a href="#"><span aria-hidden="true">//</span>home</a></li>
                    <li><a href="#expertise"><span aria-hidden="true">//</span>expertise</a></li>
                    <li><a href="#experience"><span aria-hidden="true">//</span>work</a></li>
                    <li><a href="#projects"><span aria-hidden="true">//</span>projects</a></li>
                    <li><a href="#contact"><span aria-hidden="true">//</span>contact</a></li>
                </ul>
            </nav>
        </header>
    )
};