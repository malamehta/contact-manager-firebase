import Card from "./components/Card/Card";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/Home/Home";
import {Routes,Route} from 'react-router-dom'
import AddEdit from "./pages/AddEdit/AddEdit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Search from "./pages/Search/Search";
import NoRecord from "./pages/NoRecord/NoRecord";
import View from "./pages/View/View";
import '../src/App.scss'
import {React, useState,createContext } from "react";

export const ToggleContext = createContext();

function App() {

  const[isActive,setIsActive]=useState(0);
  const handelClick =()=>{
      setIsActive(current => !current);
  }

  return (
    <div className="App">
     <ToggleContext.Provider value={{isActive, handelClick}}>
    <ToastContainer position='top-center'/> 
     <Header/>
     <main className="main">
     <div className="left"><Sidebar/></div>
      <div className="right">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/add" element={<AddEdit/>}/>
        <Route path="/update/:id" element={<AddEdit/>}/>
        <Route path="/update/:id" element={<AddEdit/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/noRecord" element={<NoRecord/>}/>
        <Route path="/view/:id" element={<View/>}/>
      </Routes>
      </div>
     </main> 
     </ToggleContext.Provider>  
    </div>
  );
}

export default App;
