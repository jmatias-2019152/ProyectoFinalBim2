import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoCutest from '../../assets/img/The_Cutest__1_-removebg-preview.png';
import { useLogout } from '../../shared/hooks/useLogout.jsx';
import { Dropdown } from 'react-bootstrap';
import './Navbar.css';

export const Navbar = () => {
    const navigate = useNavigate()
    const [showNavbar, setShowNavbar] = useState(true)
    let lastScrollY = window.scrollY

    const handleScroll = () => {
        if (window.scrollY > lastScrollY) {
            setShowNavbar(false);
        } else {
            setShowNavbar(true);
        }
        lastScrollY = window.scrollY;
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [lastScrollY])

    const handleNavigateToRooms = () => {
        navigate('/rooms')
    }

    const handleNavigateToHotels = () => {
        navigate('/hotels/hotelView')
    }

    const handleNavigateToEvents = () => {
        navigate('/events/eventView')
    }

    const handleNavigateToPerfil = () => {
        navigate('/Profile/profileView')
    }

    return (
        <nav className={`navbar navbar-expand-lg navbar-light custom-navbar ${showNavbar ? 'show' : 'hide'}`}>
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <a className="navbar-brand" href="/">
                    <img src={LogoCutest} alt="The Cutest" className="navbar-logo" />
                </a>
                <div className="navbar-nav d-flex flex-row">
                    <a className="nav-link fw-bold fs-5 me-3 custom-link" onClick={handleNavigateToRooms}>Rooms</a>
                    <a className="nav-link fw-bold fs-5 me-3 custom-link" onClick={handleNavigateToHotels}>Hotels</a>
                    <a className="nav-link fw-bold fs-5 me-3 custom-link" onClick={handleNavigateToEvents}>Events</a>
                    <Dropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-basic" className="nav-link fw-bold fs-5 me-3 custom-dropdown">
                            Usuario
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item className="nav-link fw-bold fs-6 custom-dropdown-item" onClick={handleNavigateToPerfil}>Perfil</Dropdown.Item>
                            <Dropdown.Item className="nav-link fw-bold fs-6 custom-dropdown-item custom-logout" onClick={() => useLogout()}>LogOut</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </nav>
    )
}