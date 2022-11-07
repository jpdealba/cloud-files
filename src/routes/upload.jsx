import axios from "axios";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { InputElement } from "../components/inputElement";
import SearchBar from "../components/searchbar";
import { loadAllFiles, loadMyFiles } from "../store/slices/filesSlice";
import { API_URL, getRandomColor } from "../utilities/utils";
const storage = getStorage();

const UploadFile = () => {
  const [selectedFile, setFile] = useState(null);
  const [fileName, setName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [blob, setBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [users, setUsers] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!fileName || !selectedFile || !blob) {
      toast("Complete the information");
    } else {
      setLoading(true);
      await axios
        .post(
          `${API_URL}files`,
          {
            creator_id: state.firebase.user.uid,
            file: new File([blob], fileName, { type: blob.type }),
            users: users
              .map((user) => user.uid)
              .concat([state.firebase.user.uid]),
            creator_username: state.firebase.user.displayName,
            is_public: isPublic,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(async (file) => {
          const gsReferencePreview = ref(storage, file.data.preview_url);
          await getDownloadURL(gsReferencePreview)
            .then((res) => {
              file.data.preview_url = res;
              file.data.file = res;
              dispatch(
                loadMyFiles({ files: state.files.myFiles.concat([file.data]) })
              );
              dispatch(
                loadAllFiles({
                  files: state.files.allFiles.concat([file.data]),
                })
              );
            })
            .catch((err) => console.log(err));

          setBlob(null);
          setName("");
          setIsPublic(false);
          setFile(null);
          setLoading(false);
          setUsers([]);
          setUsersList([]);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };
  function set() {
    setTimeout(function () {
      console.log("aqui");
      setIsFocused(false);
    }, 100);
  }

  return (
    <form
      className="flex items-center mt-5 flex-col"
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <h1
        className="mt-5 mb-5 self-center font-bold leading-tight text-4xl text-blue-800"
        onClick={() => set()}
      >
        Upload a New File
      </h1>
      {loading ? (
        <div></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 w-full mt-10 px-5 ">
          <div
            className="flex justify-center items-center w-full md:mr-5 flex-col"
            onClick={() => set()}
          >
            {selectedFile ? (
              <div className="relative">
                <button
                  className="absolute -top-5 -left-5 bg-red-500 text-white p-1 rounded-full hover:bg-red-800 m-2"
                  onClick={() => {
                    setFile(null);
                    setName("");
                    setBlob(null);
                    setIsPublic(false);
                    setUsers([]);
                    setUsersList([]);
                  }}
                >
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <img
                  src={selectedFile}
                  className="h-44 xl:h-64 lg:h-60 md:h-56 object-cover border p-2"
                />
              </div>
            ) : (
              <label
                htmlFor="dropzone-file"
                className="flex flex-col justify-center items-center h-44 xl:h-64 lg:h-60 md:h-56 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                  <svg
                    className="mb-3 w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={(e) => onImageChange(e, setFile, setName, setBlob)}
                />
              </label>
            )}
            <div className="flex flex-col justify-center items-center my-5">
              <p className="text-blue-800">You are sharing with: </p>
              {users.map((user) => {
                return (
                  <button
                    className={`bg-blue-200 mt-1 rounded-full`}
                    key={user.uid}
                    onClick={() => {
                      setUsers(
                        users.filter(function (el) {
                          return el.uid != user.uid;
                        })
                      );
                    }}
                  >
                    <div
                      className={
                        "flex w-50  px-2 justify-center py-1 rounded-lg items-center "
                      }
                    >
                      <svg
                        className="h-6 w-6 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="w-min px-1">{user.displayName}</p>
                      <p className="w-min px-1 ml-3">{user.email}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col justify-center xl:px-24 lg:px-16 md:px-11 sm:px-24 px-11">
            <SearchBarUsers
              setUsers={setUsers}
              setUsersList={setUsersList}
              setIsFocused={setIsFocused}
              isFocused={isFocused}
              usersList={usersList}
              users={users}
            />
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 mt-3"
            >
              File Name
            </label>
            <InputElement
              setElement={(e) => setName(e.target.value)}
              placeholder={"File Name"}
              disabled
              value={fileName}
              type={"text"}
            />
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Creator
            </label>
            <InputElement
              setElement={(e) => setName(e.target.value)}
              placeholder={"Creator"}
              disabled
              value={state.firebase.user.displayName}
              type={"text"}
            />
            <div
              className="flex justify-between items-center w-full"
              onClick={() => set()}
            >
              <div className="flex items-center">
                <label
                  htmlFor="default-checkbox"
                  className="block mr-2 text-sm font-medium 
                text-gray-900 dark:text-gray-300"
                >
                  Is It Public?
                </label>
                <input
                  id="default-checkbox"
                  type="checkbox"
                  onChange={(e) => setIsPublic(e.target.checked)}
                  value={isPublic}
                  className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 
                  focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800
                  focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <button
                type={"submit"}
                placeholder="Submit"
                className="inline-block px-7 py-3 bg-primary text-white font-medium
                        text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
                        focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg
                        transition duration-150 ease-in-out"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

const onImageChange = async (event, setImage, setName, setBlob) => {
  const name = event.target.value.split("\\");
  setName(name[name.length - 1]);
  if (event.target.files && event.target.files[0]) {
    let reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
      fetch(e.target.result)
        .then((res) => res.blob())
        .then(setBlob);
    };
    reader.readAsDataURL(event.target.files[0]);
  }
};

const SearchBarUsers = ({
  setUsers,
  setUsersList,
  usersList,
  users,
  setIsFocused,
  isFocused,
}) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search.length > 1)
      axios
        .get(API_URL + "users/" + search)
        .then((res) => setUsersList(res.data));
    else setUsersList([]);
  }, [search]);

  return (
    <div className="">
      <div className="flex flex-row justify-between ">
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Add Users
        </label>
        {isFocused && (
          <div
            className="block mb-2 text-sm font-bold text-blue-700 dark:text-gray-300"
            onClick={() => setIsFocused(false)}
          >
            <label className="font-bold">Done</label>
          </div>
        )}
      </div>

      <div className="relative ">
        <SearchBar
          onChange={(e) => {
            setIsFocused(true);
            setSearch(e.target.value);
          }}
          placeholder={"Search users"}
          value={search}
        />
        {isFocused && (
          <div
            id="dropdown"
            className="absolute z-20 w-full bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
          >
            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
              {usersList.map((user) => {
                const found = users.some((el) => el.uid === user.uid);
                return (
                  <li key={user.uid}>
                    <a
                      href="#"
                      onClick={(e) => {
                        if (!found) users.push(user);
                        else
                          setUsers(
                            users.filter(function (el) {
                              return el.uid != user.uid;
                            })
                          );
                      }}
                      user={user}
                      className={`block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${
                        found && "text-blue-700 bg-blue-100"
                      }`}
                    >
                      {user.displayName}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadFile;
