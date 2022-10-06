import React, { useEffect, useState } from 'react';
import './Card.scss';
import { Link } from 'react-router-dom';
import fireDb from '../../firebase'
import { toast } from 'react-toastify';

function Card(props) {
  const [data, setData] = useState({});

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
  }, []);

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this data")) {
      fireDb.child(`contacts/${id}`).remove((err) => {
        if (err) {
          toast.error(err)
        } else {
          toast.warning("contact Deleted successfully")
        }
      })
    }
  }
  return (
    <>
      {Object.keys(data).map((id, index) => {
        return (
          <div className='card'
            style={{ width: props.isActive ? '100%' : '', height: props.isActive ? 'auto' : "" }}
          >
            <span className='person-name '>{data[id].fname}</span>
            <span className='person-name '>{data[id].lname}</span>
            <div className='card-pill'>
              <span className='campany-name pill'> {data[id].company}</span>
              <span className='designation pill'>{data[id].designation}</span>
            </div>
            <div className='contact'
              style={{
                display: props.isActive ? 'flex' : "",
                flexWrap: props.isActive ? "wrap" : "",
                marginRight: props.isActive ? "100px" : ""
              }}
            >
              <p className='phone-num'><span><i class="material-symbols-outlined">
                call
              </i></span>
                <a href={`${data[id].mob}`}>{data[id].mob}</a></p>
              <p className='email' style={{
                marginLeft: props.isActive ? '10px' : "",
                display: props.isActive ? 'flex' : "",
                // alignItems: props.isActive ? 'center' : "",
              }}><span><i class="material-symbols-outlined">
                mail
              </i></span>
                <a href={`mailto:${data[id].email}`}>{data[id].email}</a>
              </p>
              {/* <p className='address'><span><i class="material-icons">place</i></span>{data[id].address}</p> */}
            </div>
            <div className='edit-delete'>
              <Link to={`/view/${id}`} >
                <i className='material-symbols-outlined'>visibility</i>
              </Link>
              <Link to={`/update/${id}`}>
                <i class="material-symbols-outlined">
                  edit
                </i>
              </Link>

              <i className="material-symbols-outlined"
                onClick={() => {
                  onDelete(id)
                }}>delete</i>


            </div>
          </div>
        )
      })}
    </>
  )
}

export default Card;