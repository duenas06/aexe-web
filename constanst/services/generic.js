import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  updateDoc,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import Router from "next/router";
import { db, storage } from "../../firebase";
import { ref } from "firebase/storage";

export default async function removeData(props) {
  const docRefa = doc(db, props.path, props.id);
  const docData = await getDoc(docRefa);
  const isEmailExisting = docData.exists();
  var date = new Date();

  const logsRef = doc(db, "logs", date.toString());

  if (isEmailExisting) {
    await deleteDoc(docRefa)

    await setDoc(logsRef, {
      action: "Remove Data",
      timestamp: date.toString(),
      description: `removed an data with a id of ${props.id}`,
    });

    Router.reload(window.location.pathname);
    return { success: true, message: "Data Removed Successfully." };
  } else {
    return { success: false, message: "Data Operation Failed." };
  }
}

// export default async function addMessage(path,)

export function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// {props.path, props.id, props.data}
export async function addData(props) {
  const id = makeid(10)
  var date = new Date();
  const docRef = doc(db, props.path, id)
  await setDoc(docRef, { ...props.data, id: id, createdAt: date.toString() })


  const logsRef = doc(db, "logs", date.toString());
  await setDoc(logsRef, {
    action: "Added Data",
    timestamp: date.toString(),
    description: `added an data with a id of ${id}`,
  });
  return { success: true, message: "Data added Successfully" }
}

export async function getDatas(props) {
  var data = []
  const docsRef = query(collection(db, props.path))
  const docs = await getDocs(docsRef)

  docs.docs.map(doc => {
    data.push({ ...doc.data(), id: doc.id })
  })

  return data
}

// {props.path, props.id, props.data}
export async function updateData(props) {
  const docRef = doc(db, props.path, props.id)
  await updateDoc(docRef, props.data)

  var date = new Date();
  const logsRef = doc(db, "logs", date.toString());
  await setDoc(logsRef, {
    action: "Data Updated",
    timestamp: date.toString(),
    description: `updated data with an id of ${props.id}`,
  });
  return { success: true, message: "Data Updated Successfully" }
}

//upload file
export async function uploadFileGetLink(base64Image, type) {
  let doclink = "";
  console.log(base64Image.substring(base64Image.indexOf(",") + 1));
  const reference = ref(storage, `${type}/documents/profile_${new Date()}.png`);
  console.log("running /editProfile...");

  await uploadString(
    reference,
    base64Image.substring(base64Image.indexOf(",") + 1),
    "base64"
  ).then(async (snapshot) => {
    await getDownloadURL(snapshot.ref).then((url) => {
      doclink = url;
    });
  });
  return doclink;
};