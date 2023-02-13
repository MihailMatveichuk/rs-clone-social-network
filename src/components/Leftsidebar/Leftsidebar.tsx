import React from 'react';
const logoSrc = require('../../assets/images/logo.png');
import './Leftsidebar.scss';
import { NavLink } from "react-router-dom";

const Leftsidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
          <img alt="nav-logo" src={logoSrc} />
      </div>
      <nav className="nav">
      <ul className="nav__list">
        <li>
          <NavLink
            to="discover"
            // className={({ isActive }) =>
            //   isActive ? activeClassName : undefined
            // }
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_913_1430)">
                <path d="M8.64639 14.256L9.92681 12.122C10.2336 11.6106 10.387 11.355 10.5739 11.1273C10.7398 10.9252 10.9252 10.7398 11.1273 10.5739C11.355 10.387 11.6106 10.2336 12.122 9.92681L14.256 8.64639C15.0621 8.16274 15.4651 7.92092 15.6684 7.97392C15.8436 8.0196 15.9804 8.15641 16.0261 8.33159C16.0791 8.53486 15.8373 8.9379 15.3536 9.74397L14.0732 11.878C13.7664 12.3894 13.613 12.6451 13.4261 12.8727C13.2602 13.0748 13.0748 13.2602 12.8727 13.4261C12.645 13.613 12.3894 13.7664 11.878 14.0732L9.74397 15.3536C8.93789 15.8373 8.53485 16.0791 8.33158 16.0261C8.1564 15.9804 8.01959 15.8436 7.97391 15.6684C7.92091 15.4652 8.16274 15.0621 8.64639 14.256Z" fill="#71747A"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM3.25 12C3.25 7.16751 7.16751 3.25 12 3.25C16.8325 3.25 20.75 7.16751 20.75 12C20.75 16.8325 16.8325 20.75 12 20.75C7.16751 20.75 3.25 16.8325 3.25 12Z" fill="#71747A"/>
              </g>
              <defs>
                <clipPath id="clip0_913_1430">
                  <rect width="24" height="24" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/user'
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 0.5C9.37665 0.5 7.25 2.62665 7.25 5.25C7.25 7.87335 9.37665 10 12 10C14.6234 10 16.75 7.87335 16.75 5.25C16.75 2.62665 14.6234 0.5 12 0.5ZM9.25 5.25C9.25 3.73122 10.4812 2.5 12 2.5C13.5188 2.5 14.75 3.73122 14.75 5.25C14.75 6.76878 13.5188 8 12 8C10.4812 8 9.25 6.76878 9.25 5.25Z" fill="#71747A"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 12C4.13498 12 1.5 16.2774 1.5 18.5C1.5 19.4772 1.83011 20.3693 2.48039 21.0196C3.13067 21.6699 4.02275 22 5 22H19C19.9772 22 20.8693 21.6699 21.5196 21.0196C22.1699 20.3693 22.5 19.4772 22.5 18.5C22.5 16.2774 19.865 12 12 12ZM3.5 18.5C3.5 17.7226 4.86502 14 12 14C19.135 14 20.5 17.7226 20.5 18.5C20.5 19.0228 20.3301 19.3807 20.1054 19.6054C19.8807 19.8301 19.5228 20 19 20H5C4.47725 20 4.11933 19.8301 3.89461 19.6054C3.66989 19.3807 3.5 19.0228 3.5 18.5Z" fill="#71747A"/>
            </svg>
          </NavLink>
        </li>
        <li>
          <NavLink to="/chat">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_857_5494)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.75877 1H16.2414C17.0463 0.999988 17.7107 0.999977 18.2519 1.04419C18.814 1.09012 19.3307 1.18868 19.816 1.43597C20.5687 1.81947 21.1806 2.43139 21.5641 3.18404C21.8114 3.66937 21.91 4.18608 21.9559 4.74817C22.0001 5.28936 22.0001 5.95372 22.0001 6.75868V12.2413C22.0001 13.0463 22.0001 13.7106 21.9559 14.2518C21.91 14.8139 21.8114 15.3306 21.5641 15.816C21.1806 16.5686 20.5687 17.1805 19.816 17.564C19.3307 17.8113 18.814 17.9099 18.2519 17.9558C17.7107 18 17.0464 18 16.2414 18H14.0862C13.9699 18 13.9122 18.0002 13.8702 18.0019L13.8671 18.0021L13.8647 18.0039C13.8316 18.0297 13.7874 18.0668 13.6986 18.142L8.30439 22.7063C8.2982 22.7115 8.29187 22.7169 8.28542 22.7224C8.19831 22.7962 8.08784 22.8897 7.98599 22.9612C7.89432 23.0256 7.63595 23.2034 7.2755 23.2107C6.89007 23.2186 6.52259 23.0481 6.27961 22.7488C6.05238 22.4689 6.02121 22.1568 6.01112 22.0453C5.99992 21.9214 6 21.7766 6.00006 21.6624C6.00007 21.6539 6.00007 21.6457 6.00007 21.6376V17.9938C5.65873 17.9839 5.36554 17.959 5.09588 17.8965C3.60932 17.5515 2.44857 16.3908 2.10361 14.9042C1.99947 14.4554 1.99971 13.9415 2.00004 13.2488C2.00005 13.2095 2.00007 13.1696 2.00007 13.129L2.00007 6.7587C2.00006 5.95373 2.00005 5.28937 2.04427 4.74817C2.09019 4.18608 2.18876 3.66937 2.43605 3.18404C2.81954 2.43139 3.43146 1.81947 4.18411 1.43597C4.66945 1.18868 5.18615 1.09012 5.74825 1.04419C6.28944 0.999977 6.9538 0.999988 7.75877 1ZM5.91111 3.03755C5.4727 3.07337 5.24849 3.1383 5.09209 3.21799C4.71577 3.40973 4.40981 3.7157 4.21806 4.09202C4.13837 4.24842 4.07344 4.47262 4.03762 4.91104C4.00085 5.36113 4.00007 5.94342 4.00007 6.8V13.129C4.00007 13.9945 4.0066 14.2571 4.05184 14.4521C4.22432 15.1954 4.8047 15.7758 5.54798 15.9482C5.74294 15.9935 6.00554 16 6.87104 16L6.87294 16C6.88206 16 6.91256 15.9999 6.94251 16.0011C6.97969 16.0026 7.05609 16.007 7.14873 16.0285C7.55753 16.1233 7.87674 16.4425 7.9716 16.8513C7.9931 16.944 7.99748 17.0204 7.99896 17.0576C8.00015 17.0875 8.00009 17.118 8.00008 17.1271L8.00007 17.129V20.3439L12.4067 16.6152C12.4179 16.6057 12.4294 16.596 12.4412 16.586C12.5698 16.4766 12.7318 16.3389 12.9223 16.2368C13.0877 16.1483 13.2647 16.0834 13.4481 16.0442C13.6595 15.999 13.8721 15.9995 14.041 15.9999C14.0564 16 14.0715 16 14.0862 16H16.2001C17.0567 16 17.6389 15.9992 18.089 15.9624C18.5275 15.9266 18.7517 15.8617 18.9081 15.782C19.2844 15.5903 19.5903 15.2843 19.7821 14.908C19.8618 14.7516 19.9267 14.5274 19.9625 14.089C19.9993 13.6389 20.0001 13.0566 20.0001 12.2V6.8C20.0001 5.94342 19.9993 5.36113 19.9625 4.91104C19.9267 4.47262 19.8618 4.24842 19.7821 4.09202C19.5903 3.7157 19.2844 3.40973 18.9081 3.21799C18.7517 3.1383 18.5275 3.07337 18.089 3.03755C17.6389 3.00078 17.0567 3 16.2001 3H7.80007C6.94349 3 6.3612 3.00078 5.91111 3.03755Z" fill="#71747A"/>
              </g>
              <defs>
                <clipPath id="clip0_857_5494">
                    <rect width="24" height="24" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </NavLink>
        </li>
        <li>
          <NavLink to="/notification">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_13448_272989)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0001 0C7.58164 -2.50339e-06 4.00005 3.58259 4.00005 8.00074V10.8268L2.62008 14.6907C2.47006 15.1107 2.33901 15.4776 2.25494 15.7841C2.16798 16.1012 2.09973 16.458 2.15145 16.8375C2.26122 17.6431 2.75584 18.345 3.47754 18.7193C3.81756 18.8956 4.17657 18.9514 4.50437 18.9761C4.82134 19 5.21094 19 5.65695 19L8.00005 19C8.00005 21.2091 9.79091 23 12 23C14.2092 23 16 21.2091 16 19L18.3431 19C18.7891 19 19.1788 19 19.4957 18.9761C19.8235 18.9514 20.1825 18.8956 20.5226 18.7193C21.2443 18.345 21.7389 17.6431 21.8487 16.8375C21.9004 16.458 21.8321 16.1012 21.7452 15.7841C21.6611 15.4776 21.53 15.1107 21.38 14.6906L20.0001 10.8268V8.00074C20.0001 3.5826 16.4185 2.5034e-06 12.0001 0ZM14 19H10C10 20.1046 10.8955 21 12 21C13.1046 21 14 20.1046 14 19ZM18.3073 17C18.7997 17 19.1127 16.9993 19.3452 16.9818C19.5341 16.9675 19.5961 16.9458 19.6037 16.9428C19.747 16.8677 19.8451 16.7279 19.867 16.5675C19.8646 16.5845 19.8774 16.5357 19.8164 16.3131C19.7547 16.0883 19.6501 15.7933 19.4845 15.3296L18.0662 11.3584C18.0253 11.2438 18.0001 11.1159 18.0001 10.9776V8.00074C18.0001 4.68689 15.3136 2 12.0001 2C8.68648 2 6.00005 4.68689 6.00005 8.00074V10.9776C6.00005 11.1159 5.97483 11.2438 5.9339 11.3584L4.51563 15.3296C4.35002 15.7933 4.24537 16.0883 4.18371 16.3131C4.13359 16.4959 4.13325 16.5615 4.13344 16.5697C4.15589 16.7292 4.25377 16.8681 4.39638 16.9428C4.40402 16.9458 4.46593 16.9675 4.65491 16.9818C4.88737 16.9993 5.20042 17 5.69281 17H18.3073Z" fill="#71747A"/>
              </g>
              <defs>
                <clipPath id="clip0_13448_272989">
                  <rect width="24" height="24" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_857_5967)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.783 21.5C12.9898 21.5 13.1754 21.3726 13.2496 21.1795C14.1941 18.7239 16.726 17.2621 19.3248 17.672C19.5291 17.7042 19.7323 17.6073 19.8357 17.4281L20.6187 16.0719C20.7221 15.8927 20.7046 15.6684 20.5745 15.5075C18.9201 13.4618 18.9201 10.5382 20.5745 8.49251C20.7046 8.33164 20.7221 8.10727 20.6187 7.9281L19.8357 6.5719C19.7322 6.39273 19.5291 6.29578 19.3248 6.32801C16.726 6.73787 14.1941 5.27609 13.2496 2.82051C13.1754 2.62741 12.9898 2.5 12.783 2.5L11.2169 2.5C11.0101 2.5 10.8245 2.62741 10.7503 2.82051C9.80582 5.2761 7.27394 6.73788 4.67512 6.32801C4.47076 6.29578 4.26766 6.39273 4.16421 6.5719L3.38121 7.9281C3.27777 8.10727 3.29535 8.33164 3.42545 8.49251C5.07982 10.5382 5.07982 13.4618 3.42545 15.5075C3.29535 15.6684 3.27777 15.8927 3.38121 16.0719L1.64916 17.0719C1.13195 16.1761 1.21987 15.0542 1.87033 14.2499C2.93152 12.9377 2.93152 11.0623 1.87033 9.75013C1.21987 8.9458 1.13195 7.82395 1.64916 6.9281L2.43216 5.5719C2.94938 4.67606 3.9649 4.19128 4.98669 4.35243C6.6537 4.61533 8.27777 3.67768 8.88358 2.10256C9.25492 1.13707 10.1825 0.5 11.2169 0.5L12.783 0.5C13.8174 0.5 14.745 1.13707 15.1163 2.10255C15.7221 3.67768 17.3462 4.61533 19.0132 4.35242C20.035 4.19127 21.0505 4.67606 21.5677 5.5719L22.3507 6.9281C22.868 7.82394 22.78 8.9458 22.1296 9.75013C21.0684 11.0623 21.0684 12.9377 22.1296 14.2499C22.78 15.0542 22.868 16.1761 22.3507 17.0719L21.5677 18.4281C21.0505 19.3239 20.035 19.8087 19.0132 19.6476C17.3462 19.3847 15.7221 20.3223 15.1163 21.8975C14.745 22.8629 13.8174 23.5 12.783 23.5H11.217C10.1825 23.5 9.25493 22.8629 8.88359 21.8974C8.27777 20.3223 6.65371 19.3847 4.9867 19.6476C3.9649 19.8087 2.94938 19.3239 2.43216 18.4281L1.64916 17.0719L3.38121 16.0719L4.16421 17.4281C4.26766 17.6073 4.47076 17.7042 4.67512 17.672C7.27395 17.2621 9.80583 18.7239 10.7503 21.1795C10.8245 21.3726 11.0101 21.5 11.217 21.5H12.783ZM7.49996 12C7.49996 9.51472 9.51468 7.5 12 7.5C14.4852 7.5 16.5 9.51472 16.5 12C16.5 14.4853 14.4852 16.5 12 16.5C9.51468 16.5 7.49996 14.4853 7.49996 12ZM9.49996 12C9.49996 10.6193 10.6192 9.5 12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6192 14.5 9.49996 13.3807 9.49996 12Z" fill="#71747A"/>
              </g>
              <defs>
                <clipPath id="clip0_857_5967">
                  <rect width="24" height="24" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </NavLink>
        </li>
      </ul>
    </nav>
    </div>


  );
};

export default Leftsidebar;
