import './Header.scss'
import React, { useState, useEffect,createContext, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
// import fireDb from "../../firebase"
// import Card from '../Card/Card'

import { ToggleContext } from '../../App';


function Header() {
  const [search, setSearch] = useState("");
  const [menuToggle, setMenuToggle] = useState(true);
  const [searchbar,setSearchbar]=useState(false);

  // const[isActive,setIsActive]=useState(false);
  // const handelClick =()=>{
  //     setIsActive(current => !current);
  // }

  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    history(`/search?fname=${search}`);
    setSearch('');
  }

  const cleartext=()=>{
    setSearch('');
  }

  const searchHandler=()=>{
    setSearchbar(current => !current);
  }
  const{handelClick}=useContext(ToggleContext)
  return (
    <>
    <section className='header-section'>
    <div className='header-left'>
      <i class="material-symbols-outlined" onClick={handelClick}>
        menu
      </i>
      <Link to={'/'} className='logo'>
      <i class="material-symbols-outlined">
        person_filled
      </i>
      <span className='logo-text'>Contacts</span>
      </Link>
    </div>
    <div >
    <span onClick={searchHandler} class="material-symbols-outlined search-icon__btn"  style={{marginRight:"30px"}}>
        search
      </span>
    </div>
    <div className='search-bar' tabindex="0">
      {/* <i class="fa fa-search"></i> */}
      <span class="material-symbols-outlined search-icon" onClick={handleSubmit}>
        search
      </span>
      <form onSubmit={handleSubmit}>
        <input type="text"
          placeholder='search'
          className='search-bar__input'
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        ></input>
      </form>
      <span className="material-symbols-outlined close-btn"  onClick={cleartext}>close</span>
    </div>
  </section>

  {
    <div className={searchbar?'slide-search':'slide-search2'}>
    <div className='search-bar__slider' tabIndex="0">
      <form onSubmit={handleSubmit}>
        <input type="text"
          placeholder='search'
          className='search-bar__input'
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        ></input>
      </form>
      <span className="material-symbols-outlined close-btn"  onClick={cleartext}>close</span>
    </div>
    </div>
  }
  
  
</>
      
  )
}

export default Header