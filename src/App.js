import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AllData from "./components/Projects";

export const SearchContext = React.createContext();

const App = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <SearchContext.Provider value={searchQuery}>
            <Router>
                <div className="position-relative">
                    <nav className="navbar navbar-expand navbar-dark bg-primary">
                        <Link to="/" className="navbar-brand">
                            Icecapades Script Repository
                        </Link>
                        <div>
                            <ul className="navbar-nav">
                            </ul>
                        </div>
                        <div className="position-absolute end-0">
                            <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search..." style={{ margin: "10px" }} />
                        </div>
                    </nav>
                    <Routes>
                        <Route path="/" element={<AllData />} />
                    </Routes>
                    <footer>
                        <center>
                            <br />
                            <hr />
                            ScriptMetaWebsite, created by Icecapade, is a website to let you browse through Script meta-documentation.
                            <br />
                            You can find <a href="https://github.com/Hydroxycobalamin/ScriptRepositoryWebsite">ScriptRepositoryWebsite on GitHub</a>.
                            <br />
                            <a href="https://bootswatch.com/darkly/">Darkly Bootstrap Theme</a> by Thomas Park, which was released under the{" "}
                            <a href="https://github.com/thomaspark/bootswatch/blob/7fcf822114e71cfb3b89e98afb58055d21f5e240/LICENSE">MIT License</a>
                            <br />
                            This site is powered by ReactJS.
                        </center>
                    </footer>
                </div>
            </Router>
        </SearchContext.Provider>
    );
};

export default App;
