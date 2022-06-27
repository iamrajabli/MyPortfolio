import { Component } from "react"
import { ThemeContext } from "../../contexts/ThemeContext";
import './Book.css';

export default class Book extends Component {
    render() {
        const { author, imageURL, pageNum, title, topic } = this.props.books;
        return (
            <ThemeContext.Consumer>
                {themeContextValue => {
                      const { isDarkTheme, dark, light } = themeContextValue;
                      const theme = isDarkTheme ? dark : light;
                    return(
                        <div className="col-lg-4 col-sm-6 mb-4">
                        <div className="portfolio-item">
                            <a className="portfolio-link" data-toggle="modal" href="#portfolioModal1">
                                <div className="portfolio-hover" style={{background: theme.hover}}>
                                    <div className="portfolio-hover-content"><span className="plus">+</span></div>
                                </div>
                                <img className="img-fluid" src={imageURL} alt="" />
                            </a>
                            <div className="portfolio-caption">
                                <div className="portfolio-caption-heading">{title}</div>
                                <div className="portfolio-caption-subheading text-muted">{author}</div>
                            </div>
                        </div>
                    </div>
                    )
                }}
            </ThemeContext.Consumer>

        )
    }
}