import { useEffect, useState } from 'react';
import { Services } from '../../services';
import './preview.css';

const Preview = () => {

    // GET SERVICES FOR FETCHING API
    const services = new Services();

    // CREATE STATE
    const [tabItem, setTabItem] = useState([]);
    const [tabHeader, setTabHeader] = useState([]);
    const [tabs, setTabs] = useState(1);

    // FETCHING
    useEffect(() => {
        services.getMethod('http://localhost:3001/tab-items')
            .then(data => setTabItem(data))
            .catch(() => console.log('error'));

        services.getMethod('http://localhost:3001/tab-headers')
            .then(data => setTabHeader(data))
            .catch(() => console.log('error'));
    }, [])



    return (
        <div className="preview">
            <div className="bgc_blue"></div>
            <div className="container">
                <div className="tabcontainer">

                    {tabItem.map(tab =>
                    (<div key={tab.id} className={tab.id === tabs ? 'tabcontent' : 'tabcontent hidden'}>
                        <img src={tab.img} alt={tab.alt} />
                        <div className="tabcontent__descr">
                            {tab.desc}
                        </div>
                    </div>))}

                    <div className="tabheader">
                        <h3>Выберите стиль питания</h3>
                        <div className="tabheader__items">

                            {tabHeader.map(tab =>
                            (<div
                                key={tab.id}
                                onClick={() => setTabs(tab.id)}
                                className={tab.id === tabs ? 'tabheader__item tabheader__item_active' : 'tabheader__item'}>
                                {tab.header}
                            </div>))}

                        </div>
                    </div>
                </div>
                <div className="preview__life">Живи полной жизнью!</div>
            </div>
        </div>
    )
}

export default Preview;