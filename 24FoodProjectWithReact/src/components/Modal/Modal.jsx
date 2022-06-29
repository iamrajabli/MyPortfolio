import { useEffect, useContext, useState } from 'react';
import { ModalContext } from '../../contexts/ModalContext';
import { Services } from '../../services';
import { Loading } from '../Loading';

import './modal.css';

const Modal = () => {

    // GET CONTEXTS
    const { showModal, setShowModal } = useContext(ModalContext);

    // CREATE STATE
    const [form, setForm] = useState({ name: '', phone: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [thanks, setThanks] = useState('')

    // GET DATA FROM FORM
    const getData = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    // CLOSE MODAL
    const closeModal = e => {
        if (e.target.className == 'modal') {
            setShowModal(!showModal);
            resetStates();
        }
    }

    // ADDING EVENT LISTENER FOR ESCAPE KEY
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        // HIDE SCROLL
        showModal ? document.body.style.overflow = 'hidden' : document.body.style.overflow = '';

        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [showModal])

    // CLOSE MODAL FUNCTION WHEN CLICK TO ESCAPE KEY
    const handleKeyDown = e => {
        if (e.code == 'Escape') {
            setShowModal(false);
            resetStates();
        }
    }

    // RESET ALL STATES AFTER SUBMITING FORM
    const resetStates = () => {
        setLoading(false);
        setSuccess(false);
        setError(false);
        setThanks('');
    }

    // GET SERVICES FOR FETCHING API
    const services = new Services();

    // SEND AND SUBMIT FORM WITHOUT REFRESHING PAGE
    const sendData = e => {
        e.preventDefault();

        setLoading(true);

        services.postMethod('http://localhost:3001/customer', form)
            .then(data => statusMessage(data))
            .catch(() => setError(true))
    }

    // CREATE STATUS MESSAGE
    const statusMessage = (data) => {
        setLoading(false);
        setSuccess(true);
        setForm({ name: '', phone: '' })
        setThanks(`Уважаемый ${data.name}`);
    }

    // DESTRUCTRING FORM
    const { name, phone } = form;

    // CREATE AREA
    const loadingArea = loading ? <Loading /> : null;
    const successArea = success ? thanks : '';

    return (
        <div
            onClick={e => closeModal(e)}
            className={showModal ? 'modal' : 'modal hidden'}>
            <div className="modal__dialog">

                <div className="modal__content">
                    <form
                        onSubmit={e => sendData(e)}
                        action="#">
                        <div
                            onClick={() => {
                                setShowModal(!showModal);
                                resetStates();
                            }}
                            className="modal__close">
                            &times;
                        </div>

                        {error ? <div className="modal__title">Ой что-то пошло не так...</div> :
                            <>
                                <div className="modal__title">{loading ? loadingArea : `${successArea} Мы свяжемся с вами как можно быстрее!`}</div>
                                <input
                                    onChange={e => getData(e)}
                                    required
                                    placeholder="Ваше имя"
                                    name="name"
                                    value={name}
                                    type="text"
                                    maxLength={15}
                                    className="modal__input" />
                                <input
                                    onChange={e => getData(e)}
                                    required
                                    placeholder="Ваш номер телефона"
                                    name="phone"
                                    value={phone}
                                    type="phone"
                                    maxLength={50}
                                    className="modal__input" />
                                <button className="btn btn_dark btn_min">Перезвонить мне</button>
                            </>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Modal;