import { createContext, useState } from "react";

const ModalContext = createContext();

const ModalContextProvider = (props) => {

    // CREATE STATE
    const [showModal, setShowModal] = useState(false);

        return (
            <ModalContext.Provider value={{ showModal, setShowModal }}>
                {props.children}
            </ModalContext.Provider>
        )
}

export default ModalContextProvider;
export { ModalContext };