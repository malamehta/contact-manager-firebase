import React, { useContext, useState } from 'react';
import './Sidebar.scss';
import { Link } from 'react-router-dom';
import { ToggleContext } from '../../App';


function Sidebar(props) {
  const {isActive}=useContext(ToggleContext)
  return (
    <>
      <section className='container-left'
       style={{
                display:isActive ? 'none' : "",
                // transitionDelay:'8s',
                // transitionProperty:'linear'
              }}
      >
        <Link to={'/add'} className='create-contact'>
          {/* <span className='plus-icon'>+</span>
           */}
           <svg width="36" height="36" viewBox="0 0 36 36"><path fill="#34A853" d="M16 16v14h4V20z"></path><path fill="#4285F4" d="M30 16H20l-4 4h14z"></path><path fill="#FBBC05" d="M6 16v4h10l4-4z"></path><path fill="#EA4335" d="M20 16V6h-4v14z"></path><path fill="none" d="M0 0h36v36H0z"></path></svg>
          <span className='create-contact__text'> create contact</span>
        </Link>
        <Link to={'/'} className='contacts-tab'>
          <p className='contacts-tab__text'><i class="material-symbols-outlined">
            person
          </i>contacts</p>
          <span></span>
        </Link>
      </section>
      
    </>
  )
}

export default Sidebar