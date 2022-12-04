import React, { useState } from 'react'
import '../css/main.css';
import background from "../assets/background-image.jpg"
import Vendor from "../components/registerVendor"
import Cafeteria from '../components/registerCafeteria';
import AddItems from '../components/addItems';
import List from '../components/menuList';

export default function Main(){

  const [vendor,setVendor]=useState(false)
  const [cafteria,setCafeteria]=useState(false)
  const [addItems,setAddItems]=useState(false)
  const [menuList,setMenuList]=useState([])

  return(
    <>
      <div className='flexbox-container'>
        <div className="admin-home" style={{backgroundImage:`url(${background})`}}>
            {!cafteria&&!vendor&&!addItems?
            (
              <div className='content-container'>
                <div className='container-main'>
                  <h2 id='container-title'>TOX Admin</h2>
                  <h3 id='choose-text'>Choose a service</h3>
                  <button className='primary-btn' onClick={()=>setVendor(!vendor)}>Register new vendor</button>
                  <button className='primary-btn' onClick={()=>setCafeteria(!cafteria)}>Register new cafteria</button>
                  <button className='primary-btn' onClick={()=>setAddItems(!addItems)}>Add food items</button>
                </div>
                <div className='container-footer'>
                  <a className='secondary-btn' target={"_blank"} rel="noreferrer" href='https://github.com/Aryan486/TOXS'>TOX on Github</a>
                </div>
              </div>
            ):
            (vendor?
              (
                <div className='content-container'>
                  <Vendor set={setVendor} />
                </div>
              ):
              (cafteria?
                (
                  <div className='width-control'>
                    <div className='content-container' style={{marginRight:10}}>
                      <Cafeteria set={setCafeteria} setMenuList={setMenuList} menuList={menuList} />
                    </div>
                    {menuList.length?
                    (
                      <div className='content-container'>
                        <List menuList={menuList} />
                      </div>
                    ):
                    (
                      <></>
                    )
                    }
                  </div>
                ):
                (
                  <div className='content-container'>
                    <AddItems set={setAddItems} setMenuList={setMenuList} menuList={menuList} />
                  </div>  
                )                
              )
            )
            }            
          </div>
        </div>
    </>
  )
}