import BookList from '../BookList/BookList';
import BookContextProvider from '../../contexts/BookContext';
import ThemeContextProvider from '../../contexts/ThemeContext';

const App = () => {

    return (
        <ThemeContextProvider>
            <BookContextProvider>
                <BookList />
            </BookContextProvider>
        </ThemeContextProvider>
    )
}

export default App;


