import React, { useEffect, useState } from "react";

const UploadFile = () => {
  const [selectedFile, setFile] = useState(null)

  useEffect(() => {
    console.log(selectedFile)
  }, [selectedFile])

  const onSubmit = (e) => {
    // setFile(e.target.value[0])
    e.preventDefault()
  }

  return (
    <form className='flex items-center mt-10 flex-col' onSubmit={onSubmit}>
      <h1 className="mt-10 mb-5 self-center font-bold leading-tight text-4xl text-blue-800">
        Upload a New File
      </h1>
     <div className="flex justify-center items-center w-2/3">
        {selectedFile ?
          <div className='relative'>
            <button class="absolute -top-5 -right-5 bg-red-500 text-white p-1 rounded-full hover:bg-red-800 m-2" onClick={()=>setFile(null)}>
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
              <img src={selectedFile} className="h-26 object-cover border p-2"/>
            </div>
          : <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-40 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col justify-center items-center pt-5 pb-6">
                <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" onChange={(e) => onImageChange(e, setFile)}/>
        </label>}
      </div> 
      <input type={"submit"} placeholder="Submit" />
    </form>
  );
};

const onImageChange = (event, setImage) => {
  if (event.target.files && event.target.files[0]) {
    let reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  }
}

export default UploadFile;
