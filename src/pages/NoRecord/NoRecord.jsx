import React from 'react'
import Card from '../../components/Card/Card'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import './NoRecord.scss'
import {Link} from 'react-router-dom';

function NoRecord() {
  return (
    <>
      <section className='norecord-section'>
          <img src='assets/images/no-data-img.png'></img>
          <Link to={'/'} className="back-btn">BACK TO DASHBOARD</Link>
      </section>
  </>
  )
}

export default NoRecord