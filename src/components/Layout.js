import React from "react";
import { Outlet, Link } from "react-router-dom"; // Renders the matched child route
import logo from "../assets/nutriCart logo.png"
import { ReactComponent as HomeIcon} from "../assets/icons/house-solid.svg"
import { ReactComponent as HeartIcon} from "../assets/icons/heart-solid.svg"
import { ReactComponent as CartIcon} from "../assets/icons/cart-shopping-solid.svg"
import { ReactComponent as UserIcon} from "../assets/icons/user-solid.svg"

function Layout() {
  return (
    <div>
      <header>
        <img src={logo} alt="Logo" className="logo" />
        <nav className="main-nav">
          <ul >
            <li>
              <Link to="/dashboard"><HomeIcon height={30} /></Link>
            </li>
            <li>
              <Link to="/favorites"><HeartIcon height={30} /></Link>
            </li>
            <li>
              <Link to="/checkout"><CartIcon height={30} /></Link>
            </li>
            <li>
              <Link to="/profile"><UserIcon height={30} /></Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        {/* Footer content */}
      </footer>
    </div>
  );
}

export default Layout;
