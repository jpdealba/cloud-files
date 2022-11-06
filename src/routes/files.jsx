import axios from 'axios';
import { getBlob, getBytes, getDownloadURL, getStorage, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import DownloadLink from "react-download-link";
import { useDispatch, useSelector } from 'react-redux';
import { loadMyFiles } from '../store/slices/filesSlice';
import { API_URL } from '../utilities/utils';
import Element from './element';

const Files = () => {
  // const [image, setImage] = useState()
  // const storage = getStorage();
  const state = useSelector(state => state)
  // const gsReference = ref(storage, 'https://firebasestorage.googleapis.com/v0/b/cloudfiles-7a01e.appspot.com/o/files%2F4hZRJZUSaPR5palVlBy0xKJaKCm1%2Fiteso.jpeg?alt=media');
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get(API_URL + "files/created/" + state.firebase.user.uid).then(res => {
      dispatch(
        loadMyFiles({ files: res.data })
      )
    }).catch(err => console.log(err))

  }, [])

  return (
    <div className="mt-10">
      <h1 className="mt-10 mb-5 self-center font-bold leading-tight text-4xl text-blue-800 flex justify-center">
        My Files
      </h1>
      <ul className="dark:divide-gray-700 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-auto justify-between flex">
        {
          state.files.myFiles.map((file, index) => <Element file={file} key={index} />)
        }
      </ul>
    </div>


  );
};




export default Files;
