import { useContext, useState, useEffect } from "react";
import style from "./Header.module.css";
import { FaSearch } from "react-icons/fa";
import flag from "../../assets/download.png";
import { IoLocationOutline } from "react-icons/io5";
import { LuShoppingCart } from "react-icons/lu";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import {auth} from '../../Utils/firebase'

function Header() {
  const [{ user, cart, authLoading }, dispatch] = useContext(DataContext);
  if (authLoading) return null; 

  const totalItem = cart?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const handleSignOut = () => {
    const confirmed = window.confirm("Are you sure you want to sign out?");
    if (confirmed) {
      auth.signOut();
    }
  };

  return (
    <div className={style.fixed}>
      <div className={style.header__container}>
        <div className={style.logo__container}>
          {/* amazon logo */}
          <Link to="/">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="Amazon logo"
            />
          </Link>
          <div className={style.delivery}>
            {/* deliver to */}
            <span>
              <IoLocationOutline size={20} />
            </span>
            <div>
              <p>Deliver to</p>
              <span>Ethiopia</span>
            </div>
          </div>
        </div>

        <div className={style.search}>
          {/* search bar */}
          <select name="" id="">
            <option value="">All</option>
          </select>
          <input type="text" placeholder="Search Product" />
          <FaSearch size={29} />
        </div>

        <div className={style.order__container}>
          {/* language ,account ,cart and  order section*/}

          <a href="" className={style.language}>
            <img src={flag} alt="USA Flag" />
            <select name="" id="">
              <option value="">EN</option>
            </select>
          </a>

          {/* sign in and account */}
          <Link to={user? "#" : "/signup"} className={style.account}>
            <div>
              {user ? (
                <>
                  <p>Hello, {user?.email.split("@")[0]} </p>
                  <span onClick={handleSignOut}>Sign out</span>
                </>
              ) : (
                <>
                  <p>Sign In</p>
                  <span>Account & Lists</span>
                </>
              )}
            </div>
          </Link>
          {/* returns and order */}
          <Link to="/orders" className={style.orders}>
            <div>
              <p>Returns</p>
              <span>& Orders</span>
            </div>
          </Link>
          {/* cart */}
          <Link to="/cart" className={style.cart}>
            <LuShoppingCart size={25} />
            <span>{totalItem}</span>
          </Link>
        </div>
      </div>
      <LowerHeader />
    </div>
  );
}
export default Header;
