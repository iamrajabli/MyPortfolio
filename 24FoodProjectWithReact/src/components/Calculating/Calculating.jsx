import { useEffect, useState } from 'react';
import './calculating.css';

const Calculating = () => {

    // CREATE STATE
    const [gender, setGender] = useState(0);
    const [activity, setActivity] = useState(1);
    const [ratio, setRatio] = useState(1.375);
    const [bmr, setBmr] = useState(0);
    const [data, setData] = useState({ height: '', weight: '', age: '' });

    // ACTIVITY TABS FOR MAPPING
    const activityTabs = [
        { id: 1, desc: 'Низкая активность', ratio: 1.375 },
        { id: 2, desc: 'Невысокая активность', ratio: 1.55 },
        { id: 3, desc: 'Умеренная активность', ratio: 1.725 },
        { id: 4, desc: 'Высокая активность', ratio: 1.9 }
    ]

    // DESTRUCTRING DATA
    const { height, weight, age } = data;

    // ACTIVITY TABS FOR MAPPING
    const inputs = [
        { id: 1, value: height, name: 'height', placeholder: 'Введите рост', class: 'calculating__choose-item' },
        { id: 2, value: weight, name: 'weight', placeholder: 'Введите вес', class: 'calculating__choose-item' },
        { id: 3, value: age, name: 'age', placeholder: 'Введите возраст', class: 'calculating__choose-item' },
    ]

    // GETTING VALUES FROM INPUTS
    const getData = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    // CALCULATE BMR WHEN CHANGE DATA, GENDER, ACTIVITY
    useEffect(() => {
        if (gender) {
            setBmr((88.36 + (13.4 * ~~weight) + (4.8 * ~~height) - (5.7 * ~~age)) * ratio);
        } else {
            setBmr((447.6 + (9.2 * ~~weight) + (3.1 * ~~height) - (4.3 * ~~age)) * ratio);
        }
    }, [data, gender, activity])

    return (
        <div className="calculating">
            <div className="container">
                <h2 className="title">Рассчитаем вашу потребность в калориях?
                </h2>
                <div className="calculating__field">
                    <div className="calculating__subtitle">
                        Ваш пол
                    </div>
                    <div className="calculating__choose" id="gender">
                        <div
                            onClick={() => setGender(0)}
                            className={!gender ? 'calculating__choose-item calculating__choose-item_active' : 'calculating__choose-item'}>
                            Женщина
                        </div>
                        <div
                            onClick={() => setGender(1)}
                            className={gender ? 'calculating__choose-item calculating__choose-item_active' : 'calculating__choose-item'}>
                            Мужчина
                        </div>
                    </div>

                    <div className="calculating__subtitle">
                        Ваша конституция
                    </div>
                    <div className="calculating__choose calculating__choose_medium">
                        {inputs.map(input => (
                            <input
                                key={input.id}
                                onChange={e => getData(e)}
                                value={input.value}
                                type="text"
                                name={input.name}
                                placeholder={input.placeholder}
                                className={input.class} />
                        ))}

                    </div>

                    <div className="calculating__subtitle">
                        Выберите вашу физическая активность
                    </div>
                    <div className="calculating__choose calculating__choose_big">
                        {activityTabs.map(tab => (
                            <div
                                key={tab.id}
                                onClick={() => {
                                    setActivity(tab.id);
                                    setRatio(tab.ratio);
                                }}
                                className={activity === tab.id ? 'calculating__choose-item calculating__choose-item_active' : 'calculating__choose-item'}>
                                {tab.desc}
                            </div>
                        ))}

                    </div>

                    <div className="calculating__divider"></div>

                    <div className="calculating__total">
                        <div className="calculating__subtitle">
                            Ваша суточная норма калорий:
                        </div>
                        <div className="calculating__result">
                            <span>{bmr.toFixed(0)}</span> ккал
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calculating;