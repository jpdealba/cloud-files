import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import { logOut } from "../store/slices/firebaseSlice";

const Header = ({}) => {
  const state = useSelector((state) => state.firebase);
  const dispatch = useDispatch();
  const location = useLocation();
  const isLoggedIn = state.loggedIn;
  return (
    <ul className="flex border-b lg:px-36  px-0 bg-[#f6f6f6]">
      <div className="flex flex-row justify-between w-full ">
        <div className="flex flex-row ">
          <Link className="flex" to={`/home`}>
            <img
              className="object-cover md:h-9 md:w-9 h-7 w-7 m-1 self-center"
              src="/cf-logo.png"
            ></img>
          </Link>
          <div className="flex md:ml-3 sm:ml-1">
            <NavElement
              location={location}
              title={isLoggedIn ? "Home" : "Log in"}
              path={isLoggedIn ? "/home" : "/login"}
            />
            {isLoggedIn && (
              <NavElement
                location={location}
                title={"Search"}
                path={"/search"}
              />
            )}
            {isLoggedIn && (
              <NavElement location={location} title={"Files"} path={"/files"} />
            )}
            {isLoggedIn && (
              <li className="-mb-px h-max self-end">
                <Link
                  onClick={() => dispatch(logOut())}
                  className="inline-block py-2 md:px-4 px-2 border-b
               text-gray-400 font-semibold md:text-base text-sm "
                  href="#"
                >
                  Logout
                </Link>
              </li>
            )}
          </div>
        </div>
        {isLoggedIn && (
          <UserImage userId={state.user.uid} location={location} />
        )}
      </div>
    </ul>
  );
};

const NavElement = ({ location, title, path }) => {
  return (
    <li className="-mb-px h-max self-end">
      <Link
        to={path}
        className={`inline-block
        md:text-base text-sm 
          rounded-t py-2 md:px-4 px-2 ${
            location.pathname == path
              ? "text-blue-700 font-bold border-l border-t border-r bg-white"
              : "text-blue-500 border-b"
          }`}
        href="#"
      >
        {title}
      </Link>
    </li>
  );
};

const UserImage = ({ userId, location }) => {
  return (
    <Link className="flex justify-end items-end" to={`/profile/${userId}`}>
      <button
        className="flex justify-end items-end focus:ring-blue-300"
        id="dropdownInformationButton"
        data-dropdown-toggle="dropdownInformation"
      >
        <img
          className={`object-cover md:h-9 border-2 hover:border-blue-700
        md:w-9 h-7 w-7 m-1 self-center rounded-full`}
          src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
        ></img>
      </button>
    </Link>
  );
};

export default Header;
