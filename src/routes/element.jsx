import { getBlob, getDownloadURL, getStorage, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/modal";
import { setData, toggleVisible } from "../store/slices/modalSlice";
import { downloadData } from "../utilities/utils";

export default function Element({ file, index }) {
  const state = useSelector((state) => state);
  const storage = getStorage();
  const gsReferencePreview = ref(storage, file.preview_url);
  const dispatch = useDispatch();

  return (
    <div>
      <button
        className="pb-3 sm:pb-4 w-full "
        data-modal-toggle="defaultModal"
        onClick={() => {
          dispatch(setData({ data: file }));
          dispatch(toggleVisible(true));
        }}
      >
        <div className="flex items-center space-x-4 hover:cursor-pointer border  mx-3 px-5 py-2 rounded-md">
          <div className="flex-shrink-0">
            <img
              className="w-8 h-8 rounded-full"
              src={file.preview_url}
              alt=""
            />
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
          <div
            className="hover:bg-gray-400 text-gray-800 font-bold rounded inline-flex items-center p-1 cursor-pointer"
            onClick={(e) => downloadData(e, file)}
          >
            <svg
              className="fill-current w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
}
