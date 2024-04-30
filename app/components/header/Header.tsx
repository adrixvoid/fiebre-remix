import { Link, NavLink } from "@remix-run/react";

import Logo from "~/components/svg/Logo";
import styles from "./Header.module.css";
import { SITE_NAME } from "~/constants";

function Header() {
    return (
        <header className={styles.header}>
            <div className={`${styles.headerContainer} container`}>
                <Link to="/" className={styles.logo}>
                    <span className="sr-only">{SITE_NAME}</span>
                    <Logo aria-hidden />
                </Link>
                <nav className={styles.headerNavigation}>
                    <NavLink to="/about">Sobre mi</NavLink>
                    <NavLink to="/products">Tienda</NavLink>
                    <NavLink to="/posts">Portafolio</NavLink>
                    <NavLink to="/blog">Blog</NavLink>
                </nav>
            </div>
        </header>
    )
}

export default Header