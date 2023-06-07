import { createContext, useState, useContext } from "react";

const UserDataContext = createContext({
  data: {},
  setUserData: (props) => { },
});


export function UserDataContextProvider(props) {
  const [dataList, setDataList] = useState(null);

  function setUserData(props) {
    setDataList(props.dataObject);
  }

  const context = {
    data: dataList,
    setUserData: setUserData,
  };


  return (
    <UserDataContext.Provider value={context}>
      {props.children}
    </UserDataContext.Provider>
  );
}

export default UserDataContext;