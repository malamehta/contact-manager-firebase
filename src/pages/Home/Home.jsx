import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../../components/Card/Card'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import './Home.scss'

function Home() {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(false);
    // setIsActive(current => !current);
  }
  const handleClick2 = () => {
    setIsActive(true);
    // setIsActive(current => !current);
  }
  return (
   <>
   <section className='card-section'>
   <Card isActive={isActive}/>
   </section>
    <button className='toggle-btn' onClick={handleClick}>
    <i class="material-symbols-outlined" style={{color:isActive?'':"blue"}}>window</i></button>
    <button className='toggle-btn btn2' onClick={handleClick2}>
    <i class="material-symbols-outlined" style={{color:isActive?'blue':""}}>table_rows</i></button>
      
    
  </>
  )
}

export default Home