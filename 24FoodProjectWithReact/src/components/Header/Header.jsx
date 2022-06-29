import { useContext } from 'react';
import { ModalContext } from '../../contexts/ModalContext';
import './header.css';
import logo from '../../resources/icons/logo.svg';


const Header = () => {

    // GET CONTEXTS
    const { setShowModal } = useContext(ModalContext);

    return (
        <header className="header">
            <div className="header__left-block">
                <div className="header__logo">
                    <img src={logo} alt="Логотип" />
                </div>
                <nav className="header__links">
                    <a href="#" className="header__link">Доставка питания</a>
                    <a href="#" className="header__link">Второй пункт</a>
                </nav>
            </div>
            <div className="header__right-block">
                <button
                    onClick={() => setShowModal(true)}
                    className="btn btn_white">
                    Связаться с нами
                </button>
            </div>
        </header>
    )
}

export default Header;