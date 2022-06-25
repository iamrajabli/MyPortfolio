import React from 'react';
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";


export default class App extends React.Component {

    state = {
        currentId: null
    }

    getCurrentId = (currentId) => {
        this.setState(({currentId}))
        
    }

    render() {
        return (
            <div className="app">
                <AppHeader />
                <main>
                    <RandomChar />
                    <div className="char__content">
                        <CharList currentId={this.getCurrentId}/>
                        <CharInfo currentId={this.state.currentId}/>
                    </div>
                </main>
            </div>
        )
    }
};