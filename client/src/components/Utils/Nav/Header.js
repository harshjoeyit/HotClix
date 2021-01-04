import React, { useState, useRef, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import checkLoggedIn from '../../Auth/checkLoggedIn'
import './headerStyles.css'
import logo from '../../../Images/logo.png'

function Header() {

    const history = useHistory();
    const navbarRef = useRef(null);

    // STATE 
    const [burger, setBurger] = useState(true);
    // FOR HEADER
    const [show, handleShow] = useState(false);

    const handleOpenNav = () => {
        let el = navbarRef.current;
        el.style.width = el.style.width === '80%' ? '0' : '80%';
        setBurger(!burger);
    }

    const handlePageChange = () => {
        if (!burger) {
            handleOpenNav();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                handleShow(true);
            } else handleShow(false);
        });
    }, []);

    return (
        <>
            <div className={show ? `header_black header` : `header`}>
                <img
                    className='logo'
                    src={logo}
                    onClick={() => { history.push('/') }}
                    alt='logo'
                />

                {/* burgur */}
                <span className='openbtn' onClick={handleOpenNav}>
                    {burger ? (
                        <i className='fa fa-bars'></i>
                    ) : (
                            <i className='fa fa-times'></i>
                        )}
                </span>

                <div className='navbar' ref={navbarRef}>
                    <div className='navbarLinkContainer'>

                        {
                            checkLoggedIn() ?
                                (<>
                                    <Link to='/upload'>
                                        <div
                                            className='navbarLink'
                                            onClick={handlePageChange}
                                        >
                                            <span className='navItem'>Upload</span>
                                        </div>
                                    </Link>

                                    <Link to='/upload'>
                                        <div
                                            className='navbarLink'
                                            onClick={handlePageChange}
                                        >
                                            <span className='navItem'>@harshjoeyit</span>
                                        </div>
                                    </Link>

                                    <Link to='/logout'>
                                        <div
                                            className='navbarLink'
                                            onClick={handlePageChange}
                                        >
                                            <span className='navItem'> Logout </span>
                                        </div>
                                    </Link>
                                </>
                                )
                                : (
                                    <>
                                        <Link to='/login'>
                                            <div
                                                className='navbarLink'
                                                onClick={handlePageChange}
                                            >
                                                <span className='navItem'>Login</span>
                                            </div>
                                        </Link>
                                        <Link to='/register'>
                                            <div
                                                className='navbarLink'
                                                onClick={handlePageChange}
                                            >
                                                <span className='navItem'>Register</span>
                                            </div>
                                        </Link>
                                    </>

                                )
                        }
                    </div>
                </div>
            </div>
            <div className="blank"></div>
        </>
    );
}

export default Header
