import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GoPerson, GoSignOut } from "react-icons/go";

import { BsGithub } from "react-icons/bs";

import Home from "./pages/Home";
import Search from "./pages/Search";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import Terms from "./pages/terms";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/dialog";
import { Separator } from "./components/Separator";

function App() {
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("accessToken")
  );

  useEffect(() => {
    const fetchGithubUserData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        await fetch(
          `https://shrouded-thicket-64208-c185a4c1d6b4.herokuapp.com/getGithubUserData?accessToken=${accessToken}`,
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .then((data) => {
            setUserData(data);
          });
      }
    };
    fetchGithubUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUserData(null);
    window.location.reload();
  };

  const deleteAccount = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      await fetch(
        "https://shrouded-thicket-64208-c185a4c1d6b4.herokuapp.com/deleteAccount",
        {
          method: "DELETE",
          headers: {
            Authorization: accessToken,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "Account deleted") {
            localStorage.removeItem("accessToken");
            setIsAuthenticated(false);
          } else {
            console.error("Failed to delete the account.");
          }
        });
    }
  };

  return (
    <Router>
      {/*
      {showBanner && (
        <div className="bg-[#DA552F] h-14 flex items-center justify-center select-none relative ">
          {" "}
          <a href="https://www.producthunt.com/posts/Geogit" target="_blank" rel="noopener noreferrer" className="hidden md:block">
            <h1 className="text-white  tracking-wide">
              😺 Geogit is featured on <span className="font-bold text-white">Product Hunt</span> today - Check it out :)
            </h1>
          </a>
          <a href="https://www.producthunt.com/posts/Geogit?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-Geogit" target="_blank">
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=426015&theme=light"
              alt="Geogit - Rank the top software developers by location 🌎 | Product Hunt"
              style={{ width: "275px", height: "39px" }}
              width="250"
              height="54"
            />
          </a>
          <button className="absolute right-6 top-2 text-white text-2xl font-bold" onClick={() => setShowBanner(false)}>
            ×
          </button>
        </div>
      )}
      */}

      <header className="bg-transparent py-1">
        <div className="container mx-auto pt-4 px-4 sm:px-12 flex flex-col sm:flex-row justify-between items-center z-50">
          <Link
            to="/"
            className="flex items-center space-x-3 mb-4 sm:mb-0 select-none"
          >
            <span className="hidden sm:inline text-white font-bold text-2xl select-none">
              LocationGit
            </span>
          </Link>
          <nav className="flex items-center font-Hublot">
            <ul className="flex space-x-2 sm:space-x-4 text-gray-300 font-bold select-none">
              <li>
                <Link
                  to="/"
                  className="px-2 sm:px-4 py-2 block font-bold text-white transition duration-150 ease-in-out hover:text-gray-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/Search"
                  className="px-2 sm:px-4 py-2 block font-bold text-white transition duration-150 ease-in-out hover:text-gray-300"
                >
                  Search
                </Link>
              </li>
              <li>
                <Link
                  to="/About"
                  className="px-2 sm:px-4 py-2 block font-bold text-white transition duration-150 ease-in-out hover:text-gray-300"
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/Search"
          element={<Search isAuthenticated={isAuthenticated} />}
        />
        <Route path="/About" element={<About />} />
        <Route
          path="/SignIn"
          element={<SignIn setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/Terms" element={<Terms />} />
      </Routes>
    </Router>
  );
}

export default App;
