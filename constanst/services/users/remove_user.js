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
  import { db } from "../../../firebase";
  
  export default async function removeUser(id) {
    const docRefa = doc(db, "users", id);
    const docData = await getDoc(docRefa);
    const isEmailExisting = docData.exists();
    var date = new Date();
  
    const logsRef = doc(db, "logs", date.toString());
  
    if (isEmailExisting) {
      await deleteDoc(docRefa)
  
      await setDoc(logsRef, {
        action: "Remove User",
        timestamp: date.toString(),
        description: `removed an user with a id of ${id}`,
      });
  
      Router.reload(window.location.pathname);
      return { success: true, message: "User Removed Successfully." };
    } else {
      return { success: false, message: "User Operation Failed." };
    }
  }