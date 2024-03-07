import "./styles/global.scss";
import "./App.scss";
import "./styles/theme.scss";
// import MainSearchPage from "./pages/MainSearchPage/MainSearchPage";
import SearchResultsPage from "./pages/SearchResultsPage/SearchResultsPage";
import {ThemeContext} from "./context/ThemeContext";
import {useContext} from "react";
function App() {
    const {theme} = useContext(ThemeContext);
    return (
        <div className={theme}>
            <div className='background'>
                <div className='container'>
                    {/* <MainSearchPage /> */}
                    <SearchResultsPage />
                </div>
            </div>
        </div>
    );
}

export default App;