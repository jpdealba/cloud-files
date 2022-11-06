import { getBlob, getDownloadURL, getStorage, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Element({ file, index }) {
  const state = useSelector(state => state)
//   const [image, setImage] = useState(state.files.myFilesImages[state.files.myFilesImages.length - 1 - index])
  const storage = getStorage();
  const gsReferencePreview = ref(storage, file.preview_url)
  const gsReference = ref(storage, file.file)
  const downloadData = async () => { 
    const blob = await getBlob(gsReference)
    const elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = file.file_name;        
    document.body.appendChild(elem);
    elem.click();        
    document.body.removeChild(elem);
  }
  return (
   <li className="pb-3 sm:pb-4 w-full ">
      <div className="flex items-center space-x-4 hover:cursor-pointer border  mx-3 px-5 py-2 rounded-md" >
         <div className="flex-shrink-0">
            <img className="w-8 h-8 rounded-full" src={file.preview_url} alt="" />
         </div>
         <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              {file.file_name}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
               {file.creator_username}
            </p>
         </div>
          <div className="flex-1 min-w-0 flex flex-col items-end">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              {new Date(file.date).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
               {new Date(file.date).toLocaleTimeString()}
            </p>
           </div>
           <button class="hover:bg-gray-400 text-gray-800 font-bold rounded inline-flex items-center p-1" onClick={() => downloadData()}>
            <svg class="fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
         </button>
      </div>
   </li>
  )
}
