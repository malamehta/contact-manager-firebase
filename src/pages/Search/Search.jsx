import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import fireDb from "../../firebase";
import { toast } from 'react-toastify';
import "./Search.scss"
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from '../../components/Card/Card';

function Search() {
  const [data, setData] = useState({});

  const history = useNavigate()

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  let search = query.get("fname").toLowerCase();
  console.log("search", search);

  useEffect(() => {
    fireDb.child("contacts")
      .orderByChild("fname")
      .equalTo(search)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          setData(data);
          // console.log("searchpage"+data)
        } else {
          history('/noRecord')
        }
      })
  }, [search])


  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this data")) {
      fireDb.child(`contacts/${id}`).remove((err) => {
        if (err) {
          toast.error(err)
        } else {
          toast.success("contact Deleted successfully")
        }
      })
    }
  }
  return (
    <>
      <section className='searched-section'>
        <div className='card-wrapper'>
          {Object.keys(data).map((id, index) => {
            return (
              <div className='card'>
                <span className='person-name'>{data[id].fname}</span>
                <span className='person-name'>{data[id].lname}</span>
                <div className='card-pill'>
                  <span className='campany-name pill'> {data[id].company}</span>
                  <span className='designation pill'>{data[id].designation}</span>
                </div>
                <div className='contact'>
                  <p className='phone-num'><span><i class='fas fa-phone'></i></span>{data[id].mob}</p>
                  <p className='email'><span><i class='fas fa-envelope-open'></i></span>{data[id].email}</p>
                  <p className='address'><span><i class="material-icons">place</i></span>{data[id].address}</p>
                </div>
                <div className='edit-delete'>
                  <Link to={`/view/${id}`} >
                    <i className='fa fa-eye'></i>
                  </Link>
                  <Link to={`/update/${id}`}>
                    <i className="fa fa-pen"></i>
                  </Link>

                  <i className="fa fa-trash"
                    onClick={() => {
                      onDelete(id)
                    }}></i>

                </div>
              </div>

            )
          }
          )
          }
        </div>

      </section>
    </>

  )
}

export default Search