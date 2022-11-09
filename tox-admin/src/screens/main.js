import React, { useState } from 'react'
import '../css/home.css';
import background from "../assets/background-image.jpg"
import Vendor from "../components/registerVendor"

export default function Main(){

  const [vendor,setVendor]=useState(false)
  const [cafteria,setCafeteria]=useState(false)

  return(
    <>
      <div className='flexbox-container'>
        <div className="admin-home" style={{backgroundImage:`url(${background})`}}>
          <div className='content-container'>
            {!cafteria&&!vendor?
            (
              <>
                <div className='container-main'>
                  <h2 id='container-title'>TOX Admin</h2>
                  <h3 id='choose-text'>Choose a service</h3>
                  <button className='primary-btn' onClick={()=>setVendor(!vendor)}>Register new vendor</button>
                  <button className='primary-btn' onClick={()=>setCafeteria(!cafteria)}>Register new cafteria</button>
                </div>
                <div className='container-footer'>
                  <a className='secondary-btn' href='https://github.com/Aryan486/TOXS'>TOX on Github</a>
                </div>
              </>
            ):
            (vendor?
              (
                <Vendor set={setVendor} />
              ):
              (
                <div>Caftertia {cafteria}</div>
              )
            )
            }            
          </div>
        </div>
      </div>
    </>
  )
}