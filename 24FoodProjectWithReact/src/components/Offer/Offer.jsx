import { useContext, useEffect, useRef, useState } from 'react';
import { ModalContext } from '../../contexts/ModalContext';
import { Services } from '../../services';
import './offer.css';
import left from '../../resources/icons/left.svg'
import right from '../../resources/icons/right.svg'

const Offer = () => {

    // GET CONTEXTS
    const { setShowModal } = useContext(ModalContext);

    // CREATE STATE
    const [sliders, setSliders] = useState([]);
    const [width, setWidth] = useState('');
    const [innerWidth, setInnerWidth] = useState(0);
    const [translate, setTranslate] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(1)

    // GET SERVICES FOR FETCHING API
    const services = new Services();

    // CREATE REF FOR GETTING COMPUTED STYLE WIDTH
    const wrapper = useRef();

    // GET SLIDERS FROM DB
    useEffect(() => {
        services.getMethod('http://localhost:3001/slider')
            .then(data => setSliders(data))

    }, [])

    // FOR SETTING INNER WIDTH
    useEffect(() => {
        const widthReset = window.getComputedStyle(wrapper.current).width
        setWidth(~~widthReset.slice(0, widthReset.length - 2));

        setInnerWidth(width * (sliders.length - 1));
    }, [sliders])

    // NEXT ARROW
    const next = () => {
        let nextWidth = translate;
        let nextCurrentSlide = currentSlide;

        if (nextWidth == innerWidth) {
            setTranslate(0);
            setCurrentSlide(1);
        } else {
            setTranslate(nextWidth += width)
            setCurrentSlide(nextCurrentSlide += 1)
        }
    }

    // PREV ARROW
    const prev = () => {
        let prevWidth = translate;
        let nextCurrentSlide = currentSlide;

        if (prevWidth == 0) {
            setTranslate(innerWidth);
            setCurrentSlide(sliders.length);
        } else {
            setTranslate(prevWidth -= width);
            setCurrentSlide(nextCurrentSlide -= 1);

        }
    }
    return (
        <div className="offer">
            <div className="bgc_y"></div>
            <div className="container">
                <div className="offer__text">
                    <h2 className="title">Что мы можем вам предложить?</h2>
                    <div className="offer__descr">
                        Наша основная идея - это правильное питание. Оно может быть простым и вкусным. Мы не просто доставка, мы сервис! Мы взяли на себя все расчеты БЖУ, калорийности, объемов порций и прочие важные, но скучные аспекты. Вам остается только полезная, сытная и правильная еда, которую мы привозим прямо под дверь.
                    </div>
                </div>
                <div className="offer__action">
                    <button
                        onClick={() => setShowModal(true)}
                        className="btn btn_dark">
                        Связаться с нами
                    </button>
                </div>
            </div>
            <div className="container">
                <div className="offer__advantages">
                    <h2>Быстро и полезно</h2>
                    <div className="offer__advantages-text">
                        Готовка дома занимает много сил, времени и нервов. Мы привозим еду сразу на целый день, и ты можешь действовать так, как тебе удобно, не подстраиваясь ни под кого и будучи уверенным в качестве продукта!
                    </div>
                    <h2>Правильный рацион</h2>
                    <div className="offer__advantages-text">
                        Мы разработали специальное меню, где учтены все нюансы правильного питания, от баланса БЖУ до их приготовления и дробления рациона.
                    </div>
                </div>

                <div className="offer__slider " style={{ overflow: 'hidden' }}>
                    <div className="offer__slider-counter">
                        <div
                            onClick={() => prev()}
                            className="offer__slider-prev">
                            <img src={left} alt="prev" />
                        </div>
                        <span id="current">0{currentSlide}</span>
                        /
                        <span id="total">0{sliders.length}</span>
                        <div
                            onClick={() => next()}
                            className="offer__slider-next">
                            <img src={right} alt="next" />
                        </div>
                    </div>
                    <div
                        ref={wrapper}
                        className="offer__slider-wrapper">

                        <div
                            className="offer__slider-inner flex"
                            style={{
                                width: innerWidth + 'px',
                                transform: `translateX(-${translate}px)`,
                                transition: 'all 200ms linear'
                            }} >
                            {sliders.map(slider => (
                                <div key={slider.id} className="offer__slide">
                                    <img
                                        style={{ width: width + 'px' }}
                                        src={slider.img}
                                        alt={slider.alt} />
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Offer;