import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <NavLink onClick={() => setVisible(false)} to="/">
            <img src={assets.logo} className="mb-4 w-24" alt="" />{" "}
          </NavLink>

          <p className="w-full md:w-2/3 text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the standard dummy text ever since
            the 1500s
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5 text-[#fcba63]">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <NavLink onClick={() => setVisible(false)} to="/">
              <li>Home</li>
            </NavLink>

            <NavLink onClick={() => setVisible(false)} to="/about">
              <li>About</li>
            </NavLink>

            <NavLink onClick={() => setVisible(false)} to="/delivery">
              <li>Delivery</li>
            </NavLink>

            <NavLink onClick={() => setVisible(false)} to="/privacy_policy">
              <li>Privacy policy</li>
            </NavLink>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5 text-[#fcba63]">
            GET IN TOUCH
          </p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+967 775691617</li>
            <li>mariashareef2015@gamil.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright &copy; 2025 Fashion.com - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
