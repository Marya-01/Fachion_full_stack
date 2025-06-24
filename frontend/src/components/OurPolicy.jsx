import React from "react";
import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div>
        <img src={assets.exchange} className="w-10 m-auto md-5" alt="" />
        <p className=" font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-400">We offer hassle exchange policy</p>
      </div>

      <div>
        <img src={assets.quilty} className="w-10 m-auto md-5" alt="" />
        <p className="font-semibold">7 Day Return Policy</p>
        <p className="text-gray-400">We offer hassle exchange policy</p>
      </div>

      <div>
        <img src={assets.support} className="w-10 m-auto md-5" alt="" />
        <p className="font-semibold">Best Customer Support</p>
        <p className="text-gray-400">We offer hassle exchange policy</p>
      </div>
    </div>
  );
};

export default OurPolicy;
