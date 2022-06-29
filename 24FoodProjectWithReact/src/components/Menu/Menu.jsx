import { useEffect, useState } from 'react';
import { Services } from '../../services';
import './menu.css';

const Menu = () => {

    // CREATE STATE
    const [menu, setMenu] = useState([]);

    // GET SERVICES FOR FETCHING API
    const services = new Services();

    // FETCHING
    useEffect(() => {
        services.getMethod('http://localhost:3001/menu')
            .then(menu => setMenu(menu))
    }, [])

    return (
        <div className="menu">
            <h2 className="title">Наше меню на день</h2>

            <div className="menu__field">
                <div className="container">
                    {menu.map(item => (
                        <div
                            key={item.id}
                            className="menu__item">

                            <img src={item.img} alt={item.altimg} />
                            <h3 className="menu__item-subtitle">{item.title}</h3>
                            <div className="menu__item-descr">{item.descr}</div>
                            <div className="menu__item-divider"></div>
                            <div className="menu__item-price">
                                <div className="menu__item-cost">Цена:</div>
                                <div className="menu__item-total"><span>{item.price}</span> грн/день</div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default Menu;