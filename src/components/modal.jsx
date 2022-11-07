import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDocs } from "../routes/root";
import { clearFile } from "../store/slices/filesSlice";
import { toggleVisible } from "../store/slices/modalSlice";
import { API_URL, downloadData } from "../utilities/utils";

export default function Modal({}) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const data = state.modal.data;
  useEffect(() => {
    if (state.modal.data.users) {
      axios
        .post(`${API_URL}users/list`, { users: data.users })
        .then((res) => {
          setUsers(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [data]);
  return (
    <div
      id="defaultModal"
      tabIndex="-1"
      aria-hidden="true"
      className={`fixed h-50 bg-shadow flex justify-center items-center
             z-50 w-full md:inset-0 h-modal md:h-full ${
               !state.modal.isVisible && "hidden"
             }`}
      onBlur={() => {
        setUsers([]);
        setLoading(true);
        dispatch(toggleVisible(false));
      }}
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
            <h3 className="text-sm md:text-xl font-semibold text-gray-900 dark:text-white mr-6 self-center">
              {data.file_name}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => dispatch(toggleVisible(false))}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  ffillrule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div>
            <div className="p-6 space-y-6 flex justify-between items-center">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 ">
                Users in this file:{" "}
                {users.map(
                  (user, index) =>
                    "@" +
                    user.displayName +
                    (index < users.length - 1 ? ", " : "")
                )}
              </p>

              <div className="">
                <img
                  src={data.preview_url}
                  className="h-36 xl:h-64 lg:h-60 md:h-56 object-cover border p-1"
                />
              </div>
            </div>

            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
              <button
                data-modal-toggle="defaultModal"
                type="button"
                onClick={(e) => downloadData(e, state.modal.data)}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                        focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600
                         dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Download
              </button>
              {state.modal.data.creator_id == state.firebase.user.uid && (
                <button
                  data-modal-toggle="defaultModal"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteDoc(setUsers, setLoading, dispatch, state);
                  }}
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none 
                        focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600
                         dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const deleteDoc = async (setUsers, setLoading, dispatch, state) => {
  await axios
    .delete(`${API_URL}files/`, { data: state.modal.data })
    .then((res) => {
      setUsers([]);
      setLoading(true);
      dispatch(toggleVisible(false));
      getDocs(dispatch, state.firebase.user);
      console.log(res.data);
    })
    .catch((err) => console.log(err));
};
