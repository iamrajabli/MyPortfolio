import './sidePanel.css';
import instagram from '../../resources/icons/instagram.svg'
import facebook from '../../resources/icons/facebook.svg'

const SidePanel = () => {
    return (
        <div className="sidepanel">
            <div className="sidepanel__text"><span>Социальные сети</span></div>
            <div className="sidepanel__divider"></div>
            <a href="#" className="sidepanel__icon">
                <img src={instagram} alt="instagram" />
            </a>
            <a href="#" className="sidepanel__icon">
                <img src={facebook} alt="facebook" />
            </a>
        </div>

    )
}

export default SidePanel;