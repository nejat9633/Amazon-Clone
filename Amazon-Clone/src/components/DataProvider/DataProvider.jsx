import React, { createContext, useEffect, useReducer } from "react";
import {onAuthStateChanged} from 'firebase/auth'
import {auth } from '../../Utils/firebase'
import { Type } from "../../Utils/action.type";

export const DataContext = createContext();

function DataProvider({ children, reducer, initialState }) 
{

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    authLoading: true,
  });
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
      dispatch({
        type:Type.SET_USER,
        user: currentUser,
      })

      dispatch({
        type:Type.SET_AUTH_LOADING,
        authLoading: false,
      })
    })

    return unsubscribe;
  },[])



  return (
    <DataContext.Provider value={useReducer(reducer,initialState)}>{children}</DataContext.Provider>
  );
}

export default DataProvider;
