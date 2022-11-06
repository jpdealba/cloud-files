import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { InputElement } from '../utilities/componenets';
import { API_URL } from '../utilities/utils';

const UploadFile = () => {
  const [selectedFile, setFile] = useState(null)
  const [fileName, setName] = useState("")
  const [blob, setBlob] = useState(null)
  const [loading, setLoading] = useState(false)
  const state = useSelector(state => state)
  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await axios.post(`${API_URL}files`, {
      creator_id: state.firebase.user.uid,
      file: new File([blob], fileName, { type: blob.type }),
      users: [state.firebase.user.uid],
      creator_username: state.firebase.user.displayName,
      is_public: false
    }, {    headers: {
      'Content-Type': 'multipart/form-data'
    }}).then(res => {
      setBlob(null)
      setName("")
      setFile(null)
      setLoading(false)
    }).catch(err => { console.log(err);  setLoading(false)})

  }

  return (
    <form className='flex items-center mt-5 flex-col' onSubmit={onSubmit}>
      <h1 className="mt-5 mb-5 self-center font-bold leading-tight text-4xl text-blue-800">
        Upload a New File
      </h1>
      {loading ? <div></div> :
        <div className='flex grid grid-cols-1 md:grid-cols-2 w-full mt-10 px-5'>
        <div className="flex justify-center items-center w-full md:mr-5 ">
            {selectedFile ?
              <div className='relative'>
              <button className="absolute -top-5 -left-5 bg-red-500 text-white p-1 rounded-full hover:bg-red-800 m-2" onClick={() => {
                setFile(null);
                setName("")
                setBlob(null)
              }}>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                  <img src={selectedFile} className="h-44 xl:h-64 lg:h-60 md:h-56 object-cover border p-2"/>
                </div>
              : <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center h-44 xl:h-64 lg:h-60 md:h-56 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                    <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={(e) => onImageChange(e, setFile, setName, setBlob)}/>
            </label>
          }
        </div> 
        <div className='flex flex-col justify-center xl:px-24 lg:px-16 md:px-11 sm:px-24 px-11'>
           <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">File Name</label>
          <InputElement
            setElement={(e) =>
              setName(e.target.value)
            }
            placeholder={"File Name"}
            disabled
            value={fileName}
            type={"text"}
          />
           <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Creator</label>
          <InputElement
            setElement={(e) =>
              setName(e.target.value)
            }
            placeholder={"Creator"}
            disabled
            value={state.firebase.user.displayName}
            type={"text"}
          />
          <div className='flex justify-center items-center w-full'>
            <button type={"submit"} placeholder="Submit"
              className="inline-block px-7 py-3 bg-primary text-white font-medium
                        text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
                        focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg
                        transition duration-150 ease-in-out">
              Upload
            </button>
          </div>
        </div>

      </div>}
    </form>
  );
};

const onImageChange = async (event, setImage, setName, setBlob) => {
  const name = event.target.value.split("\\")
  setName(name[name.length - 1])
  // const response = await fetch(event.target.value);
  // const blob = await event.target.value.blob();
  // const file = new File([blob], name, { type: blob.type });
  // setBlob(file)
  // console.log(file)
  // readTextFile(event.target.value);

  if (event.target.files && event.target.files[0]) {
    let reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
      fetch(e.target.result)
      .then(res => res.blob())
      .then(setBlob)
    };
    reader.readAsDataURL(event.target.files[0]);
  }
}




export default UploadFile;
