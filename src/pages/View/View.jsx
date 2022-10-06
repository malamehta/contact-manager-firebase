import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import fireDb from "../../firebase"
import { Link, useNavigate, useParams } from "react-router-dom";
import './View.scss'

function View() {
    const [user, setUser] = useState({})
    const { id } = useParams();

    useEffect(() => {
        fireDb.child(`contacts/${id}`).get().then((snapshot) => {
            if (snapshot.exists()) {
                setUser({ ...snapshot.val() });
            } else {
                setUser({});
            }
        })
    }, [id])
  return (
    <>
    <section className='view-section'>
    <div className='basic-details'>
        <h3 className='name'>{user.fname+" "+user.lname}</h3>
        <p className='companyDesignation'>{user.designation+" "+"("+user.company+")"}</p>
        <p className='notes'>{user.notes}</p>
    </div>
    <div className='contact-details'>
        <h5 className='heading'>Contact details</h5>
        <p className='mobile'><i class='material-symbols-outlined'>call</i>{user.mob}</p>
        <p className='email'><i class='material-symbols-outlined'>outgoing_mail</i>{user.email}</p>
        <p className='address'><i class="material-symbols-outlined">location_on</i>{user.address}</p>
        <p className='birthday'><i class="material-symbols-outlined">cake</i>{user.birthday}</p>
    </div>
    </section>
  
  <Link to={'/'} className='material-symbols-outlined arrow'>keyboard_backspace</Link>
</>
  )
}

export default View