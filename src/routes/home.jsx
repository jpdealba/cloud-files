import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Element from './element';

const Home = ({}) => {
  const state = useSelector(state => state)
  return (
    <div className="mt-10">
      <h1 className="mt-10 mb-5 self-center font-bold leading-tight text-4xl text-blue-800 flex justify-center">
        All Files
      </h1>
      <ul className="dark:divide-gray-700 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-auto justify-between flex">
        {
          state.files.allFiles.map((file, index) => <Element file={file} key={index} index={index} />)
        }
      </ul>
    </div>
  );
};




export default Home;
