import React, { useEffect, useState } from 'react';
import fireDb from '../../firebase';
import { toast } from 'react-toastify'
import './AddEdit.scss'
import { useNavigate, useParams, Link } from 'react-router-dom'
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';

const initialState = {
  fname: "",
  lname: "",
  mob: "",
  email: "",
  address: "",
  company: "",
  designation: "",
  birthday: "",
  notes: "",

}

function AddEdit() {
  const history = useNavigate()
  const [state, setState] = useState(initialState);

  const [fnameError, setFnameError] = useState('');
  const [lnameError, setLnameError] = useState('');
  const [mobError, setMobError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [companyError, setCompanyError] = useState('');
  const [designationError, setDesignationError] = useState('');



  const [data, setData] = useState({});
  const { fname, lname, mob, email, address, company, designation, birthday, notes } = state;
  const { id } = useParams();

  useEffect(() => {
    fireDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() })
      } else {
        setData({});
      }
    });
    return () => {
      setData({});
    }
  }, [id]);


  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState })
    }
    return () => {
      setState({ ...initialState });
    }
  }, [id, data])
  const handelInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value })
  }



  const handleSubmit = (e) => {
    
    e.preventDefault();
    if (fname === "") {
      setFnameError("name fileld required")
    } else if (fname.length > 20) {
      setFnameError("name should be less than 10 character")
    } else if (lname === "") {
      setLnameError("Last name required")
    } else if (lname > 20) {
      setLnameError("Last name should contain only 10 character")
    } else if (mob.length != 10) {
      setMobError("mobile number should be of 10 digit")
    } else if (!(mob.match(/\d/g).length === 10)) {
      setMobError("Enter only Digits")
    } else if (!/^[A-Z0-9._%+-]+@[A-Z.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setEmailError("enter valid email")
    } 
    else {

      if (!id) {
        fireDb.child("contacts").push(state, (err) => {
          // alert("Contact Added successfully")
          toast.success("Contact Added successfully")

        })
      } else {
        fireDb.child(`contacts/${id}`).set(state, (err) => {
          // alert("Contact updated successfully")
          toast.success("Contact updated successfully")

        })
      }
      setTimeout(() => history("/"), 100)
    }
  }
  return (
    <>
      
        <section className='add-section'>
          <form onSubmit={handleSubmit}>
            <div className='input-container'>
              <i class="material-symbols-outlined">person</i>
              <input
                type="text"
                placeholder='FirstName*'
                // required="required"
                name='fname'
                value={fname}
                onChange={handelInputChange}
              />
              {fnameError && (
                <p className="error" style={{ color: "red" }}> {fnameError} </p>
              )}
              {/* <label>FullName</label> */}
            </div>
            <div className='input-container'>
              <i class="material-symbols-outlined">person</i>
              <input
                type="text"
                placeholder='lastName*'
                // required="required"
                name='lname'
                value={lname}
                onChange={handelInputChange}
              />
              {lnameError && (
                <p className="error" style={{ color: "red" }}> {lnameError} </p>
              )}
              {/* <label>FullName</label> */}
            </div>
            <div className='input-container'>
              <i class='material-symbols-outlined'>call</i>
              <input
                type="text"
                placeholder='Mobile Number*'
                // required="required"
                name='mob'
                value={mob}
                onChange={handelInputChange}
              />
              {mobError && (
                <p className="error" style={{ color: "red" }}> {mobError} </p>
              )}
            </div>
            <div className='input-container'>
              <i class='material-symbols-outlined'>mail</i>
              <input
                type="text"
                placeholder='Email'
                name='email'
                value={email}
                onChange={handelInputChange}
              />
              {emailError && (
                <p className="error" style={{ color: "red" }}> {emailError} </p>
              )}
            </div>
            <div className='input-container '>
              <i class="material-symbols-outlined">location_on</i>
              <input className='fullwidth'
                type="text"
                placeholder='address'
                // required="required"
                name='address'
                value={address}
                onChange={handelInputChange}
              />
              {/* {addressError && (
                <p className="error" style={{ color: "red" }}> {addressError} </p>
              )} */}

            </div>
            <div className='input-container '>
              <i class='material-symbols-outlined'>apartment</i>
              <input className='fullwidth'
                type="text"
                placeholder='company'
                name='company'
                value={company}
                onChange={handelInputChange}
              />
              {companyError && (
                <p className="error" style={{ color: "red" }}> {companyError} </p>
              )}
            </div>
            <div className='input-container '>
              <i class='material-symbols-outlined'>business_center</i>
              <input className='fullwidth'
                type="text"
                placeholder='designation'
                name='designation'
                value={designation}
                onChange={handelInputChange}
              />
              {designationError && (
                <p className="error" style={{ color: "red" }}> {designationError} </p>
              )}
            </div>
            <div className='input-container '>
              <i class='far fa-calendar-alt'></i>
              <input className='fullwidth'
                type="date"
                placeholder='birth date'
                name='birthday'
                value={birthday}
                onChange={handelInputChange}
              />
            </div>
            <div className='input-container ' style={{display:'flex',alignItems:'center'}}>
              {/* <i class='fas fa-file-alt'></i> */}
              <i class="material-symbols-outlined">
                note_add
              </i>
              <textarea placeholder='Add your Bio' className='notes'
                name='notes'
                value={notes}
                onChange={handelInputChange}></textarea>
            </div>
            <input className='info-add-btn' type='submit' value={id ? "update" : "Add"} />
          </form>
        </section>
      <Link to={'/'} className='material-symbols-outlined arrow'>keyboard_backspace</Link>
    </>

  )
}

export default AddEdit