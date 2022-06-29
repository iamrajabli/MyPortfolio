import './order.css';
import right from '../../resources/icons/right.svg'

const Order = () => {
    return (
        <div className="order">
            <div className="container">
                <div className="title">Заказывай пробный день прямо сейчас!</div>
                <form action="#" className="order__form">
                    <input required placeholder="Ваше имя" name="name" type="text" className="order__input" />
                    <input required placeholder="Ваш номер телефона" name="phone" type="phone" className="order__input" />
                    <img src={right} alt="right" />
                    <button className="btn btn_dark btn_min">Перезвонить мне</button>
                </form>
            </div>
        </div>

    )
}

export default Order;