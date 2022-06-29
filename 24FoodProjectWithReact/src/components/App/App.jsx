import { useState } from 'react';
import { Header } from '../Header';
import { SidePanel } from '../SidePanel';
import { Preview } from '../Preview/';
import { Offer } from '../Offer/';
import { Calculating } from '../Calculating/';
import { Menu } from '../Menu/';
import { Promotion } from '../Promotion/';
import { Footer } from '../Footer/';
import { Modal } from '../Modal/';
import ModalContextProvider from '../../contexts/ModalContext';
import './app.css';

const App = () => {
    return (
        <>
            <ModalContextProvider>
                <Header />
                <SidePanel />
                <Preview />
                <Offer />
                <Calculating />
                <Menu />
                <Promotion />
                <Footer />
                <Modal />
            </ModalContextProvider>
        </>
    )
}

export default App;