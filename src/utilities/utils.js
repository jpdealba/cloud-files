import { getBlob, getStorage, ref } from "firebase/storage";

export const API_URL = "https://cloud-files-api.vercel.app/api/";

export function getRandomColor() {
  var letters = "BCDEF".split("");
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

export const downloadData = async (e, file) => {
  e.preventDefault();
  e.stopPropagation();
  const storage = getStorage();
  const gsReference = ref(storage, file.file);

  const blob = await getBlob(gsReference);
  const elem = window.document.createElement("a");
  elem.href = window.URL.createObjectURL(blob);
  elem.download = file.file_name;
  document.body.appendChild(elem);
  elem.click();
  document.body.removeChild(elem);
};
