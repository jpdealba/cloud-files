import { getBlob, getDownloadURL, getStorage, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';

export default function Element({ file }) {
  const [image, setImage] = useState()
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

  useEffect(() => {
    getDownloadURL(gsReferencePreview).then(res => setImage(res))
  }, [])
  return (
   <li className="pb-3 sm:pb-4 w-full ">
      <div className="flex items-center space-x-4 hover:cursor-pointer border  mx-3 px-5 py-2 rounded-md" onClick={() => downloadData()}>
         <div className="flex-shrink-0">
            <img className="w-8 h-8 rounded-full" src={image} alt="" />
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
      </div>
   </li>
  )
}
