import { getBlob, getDownloadURL, getStorage, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Element({ file, index }) {
  const state = useSelector(state => state)
//   const [image, setImage] = useState(state.files.myFilesImages[state.files.myFilesImages.length - 1 - index])
  const storage = getStorage();
   const gsReferencePreview = ref(storage, file.preview_url)
   const [isModalVisible, setModalVisible] = useState(false)
  const gsReference = ref(storage, file.file)
   const downloadData = async (e) => { 
   e.preventDefault();
   e.stopPropagation();
    const blob = await getBlob(gsReference)
    const elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = file.file_name;        
    document.body.appendChild(elem);
    elem.click();        
    document.body.removeChild(elem);
  }
   return (
     <div>
         <button className="pb-3 sm:pb-4 w-full " data-modal-toggle="defaultModal" onClick={() => setModalVisible(true)}>
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
               <button class="hover:bg-gray-400 text-gray-800 font-bold rounded inline-flex items-center p-1" onClick={(e) => downloadData(e)}>
                  <svg class="fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
               </button>
            </div>
         </button>
         <div id="defaultModal" tabindex="-1" aria-hidden="true" class={`overflow-y-auto overflow-x-hidden fixed h-50
             z-50 w-full md:inset-0 h-modal md:h-full ${!isModalVisible && "hidden"}`} onBlurr={()=> setModalVisible(false)}>
            <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">

               <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

                     <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                           Terms of Service
                        </h3>
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setModalVisible(false)}>
                           <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                           <span class="sr-only">Close modal</span>
                        </button>
                     </div>

                     <div class="p-6 space-y-6">
                        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                           With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                        </p>
                        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                           The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                        </p>
                     </div>

                     <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                        <button data-modal-toggle="defaultModal" type="button" 
                        onClick={(e) => downloadData(e)}
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                        focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600
                         dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >Download</button>
                     </div>
               </div>
            </div>
         </div>
     </div>

  )
}
