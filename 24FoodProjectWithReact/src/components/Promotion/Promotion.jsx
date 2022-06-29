import { useEffect, useState } from 'react';
import { Services } from '../../services';
import './promotion.css';

const Promotion = () => {

    const [deadline, setDeadline] = useState('');
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const time = new Date(deadline) - new Date();

    const timer = () => {
        setDays(Math.floor(time / (60 * 60 * 24 * 1000)));
        setHours(Math.floor(time / (60 * 60 * 1000) % 24));
        setMinutes(Math.floor(time / (60 * 1000) % 60))
        setSeconds(Math.floor((time / 1000) % 60));
    }

    // GET SERVICES FOR FETCHING API
    const services = new Services();

    useEffect(() => {
        services.getMethod('http://localhost:3001/timer')
            .then(data => setDeadline(data[0].deadline))

    },[deadline]);

    // FOR INTERVAL
    useEffect(() => {

        const interval = setInterval(() => timer(), 1000);

        return () => clearInterval(interval);
    }, [deadline, seconds]);
    
    const getZero = (num) => {

        if (num < 10) {
            return `0${num}`;
        }
        else {
            return num;
        }
    }
    return (

        <div className="promotion">
            <div className="bgc_y"></div>
            <div className="container">
                <div className="promotion__text">
                    <div className="title">Акция для новых клиентов!</div>
                    <div className="promotion__descr">
                        Мы ценим каждого клиента и предлагаем вам стать одним из них на очень выгодных условиях.
                        Каждому, кто закажет доставку питание на неделю, будет предоставлена скидка в размере <span>20%!</span>
                        <br /><br />
                        Акция закончится 20 мая в 00:00
                    </div>
                </div>
                <div className="promotion__timer">
                    <div className="title">Осталось до конца акции:</div>
                    <div className="timer">
                        <div className="timer__block">
                            <span id="days">{getZero(days)}</span>
                            дней
                        </div>
                        <div className="timer__block">
                            <span id="hours">{getZero(hours)}</span>
                            часов
                        </div>
                        <div className="timer__block">
                            <span id="minutes">{getZero(minutes)}</span>
                            минут
                        </div>
                        <div className="timer__block">
                            <span id="seconds">{getZero(seconds)}</span>
                            секунд
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Promotion;