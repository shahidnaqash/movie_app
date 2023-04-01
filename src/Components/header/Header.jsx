import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./header.scss";

import { Wrapcontent } from "../HelperComponent";
import logo from "../../assets/movix-logo.png";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();


    const closeMobileMenu = () => {
        setMobileMenu(false)
    }
    const openmobileMenu = () => {
        setMobileMenu(true)
        setShowSearch(false)
    }

    const handleMenuClicks = (query) => {
        if (query == 'movie') {
            navigate('explore/movies')
        }
        else {
            navigate('explore/tv')
        }
        setMobileMenu(false)
    }

    const openSearch = () => {
        setMobileMenu(false)
        setShowSearch(true)
    }
    const closeSearch = () => {
        setShowSearch(false)
    }


    const handleSearch = (e) => {
        if (e.key == 'Enter' && query.length > 0) {
            navigate(`/search/${query}`)
        }
        setTimeout(() => {
            setShowSearch(false)
        }, 1000)
    }

    function handleScrollMove(e) {
        if (window.scrollY >= 300) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow('hide')

            }
            else {
                setShow('show')
            }

        }
        else {
            setShow('top')
        }
        setLastScrollY(window.scrollY)

    }
    useEffect(() => {
        window.addEventListener('scroll', handleScrollMove)

        return () => {
            window.removeEventListener('scroll', handleScrollMove)
        }
    }, [lastScrollY])


    return (
        <header className={`header ${mobileMenu ? 'mobileView' : ''} ${show}`}>
            <Wrapcontent>
                <div className="logo" onClick={() => navigate('/')}>
                    <img src={logo} alt='movie' />
                </div>
                <ul className="menuItems">
                    <li className="menuItem" onClick={() => handleMenuClicks('movie')}>Movies</li>
                    <li className="menuItem" onClick={() => handleMenuClicks('tv')}>TV Shows</li>
                    <li className="menuItem">
                        <HiOutlineSearch onClick={openSearch} />
                    </li>
                </ul>
                <div className="mobileMenuItems">
                    <HiOutlineSearch onClick={openSearch} />
                    {
                        !mobileMenu ? <SlMenu onClick={openmobileMenu} /> : <VscChromeClose onClick={closeMobileMenu} />
                    }


                </div>
            </Wrapcontent>
            {
                showSearch && (
                    <div className="searchBar">
                        <Wrapcontent>
                            <div className='searchInput'>
                                <input type={'text'}
                                    placeholder='search movies,tv show...'
                                    value={query}
                                    onChange={e => setQuery(e.target.value)}
                                    onKeyUp={handleSearch}
                                />
                                <VscChromeClose onClick={closeSearch} />
                            </div>
                        </Wrapcontent>
                    </div>
                )
            }
        </header>
    );
};

export default Header 