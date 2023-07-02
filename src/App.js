import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AllData from "./components/Projects";

export const SearchContext = React.createContext();

const App = () => {

    return (
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
    );
};

export default App;
