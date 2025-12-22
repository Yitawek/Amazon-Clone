import React, { useContext, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { BiCart, BiMenu, BiX } from "react-icons/bi";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../dataProvider/DataProvider";
import { auth } from "../../Utility/firebase.js";

function Header() {
  const [{ user, basket }] = useContext(DataContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const totalItem = basket?.reduce((amount, item) => amount + item.amount, 0);

  return (
    <header className={styles.header}>
      {/* LEFT SECTION */}
      <div className={styles.header_left}>
        <Link to="/" className={styles.header_logo}>
          <img src="/amazonlog.png" alt="amazon logo" />
        </Link>

        <div className={styles.header_location}>
          <span className={styles.small_text}>Delivered to</span>
          <span className={styles.bold_text}>Ethiopia</span>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className={styles.header_search_wrapper}>
        <div className={styles.header_search}>
          <select className={styles.header_select}>
            <option value="">All</option>
          </select>

          <input
            type="text"
            placeholder="Search Amazon"
            className={styles.header_input}
          />

          <button className={styles.header_searchIcon}>
            <BsSearch size={20} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU TOGGLE */}
      <button
        className={styles.menu_toggle}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <BiX size={28} /> : <BiMenu size={28} />}
      </button>

      {/* RIGHT SECTION */}
      <nav
        className={`${styles.header_right} ${
          menuOpen ? styles.mobile_open : ""
        }`}
      >
        {/* Language */}
        <div className={styles.header_lang}>
          <img src="/flag.jpg" alt="flag" />
          <span>EN</span>
        </div>

        {/* Account */}
        <Link to={!user ? "/Auth" : "#"} className={styles.header_option}>
          {user ? (
            <>
              <span className={styles.small_text}>
                Hello, {user?.email?.split("@")[0]}
              </span>
              <span className={styles.bold_text} onClick={() => auth.signOut()}>
                Sign Out
              </span>
            </>
          ) : (
            <>
              <span className={styles.small_text}>Hello, sign in</span>
              <span className={styles.bold_text}>Account & Lists</span>
            </>
          )}
        </Link>

        {/* Orders */}
        <Link to="/orders" className={styles.header_option}>
          <span className={styles.small_text}>Returns</span>
          <span className={styles.bold_text}>& Orders</span>
        </Link>

        {/* Cart */}
        <Link to="/cart" className={styles.header_cart}>
          <span className={styles.cart_count}>{totalItem}</span>
          <BiCart size={32} />
        </Link>
      </nav>
    </header>
  );
}

export default Header;
