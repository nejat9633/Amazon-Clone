import React from "react";
import style from "./Header.module.css";
import { FaSearch } from "react-icons/fa";
import flag from "../../assets/download.png";
import { IoLocationOutline } from "react-icons/io5";
import { LuShoppingCart } from "react-icons/lu";
import LowerHeader from "./LowerHeader";

function Header() {
  return (
    <div>
      <div className={style.header__container}>
        <div className={style.logo__container}>
          {/* amazon logo */}
          <a href="">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="Amazon logo"
            />
          </a>
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
          <FaSearch size={27} />
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
          <a href="" className={style.account}>
            <div>
              <p>Sign In</p>
              <span>Account & Lists</span>
            </div>
          </a>
          {/* returns and order */}
          <a href="" className={style.orders}>
            <div>
              <p>Returns</p>
              <span>& Orders</span>
            </div>
          </a>
          {/* cart */}
          <a href="" className={style.cart}>
            <LuShoppingCart size={25} />
            <span>0</span>
          </a>
        </div>
      </div>
      <LowerHeader />
    </div>
  );
}
export default Header;
