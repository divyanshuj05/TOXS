/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import '../css/vendor.css'
import { CheckVendorData } from '../services/vendor.service'

export default function Vendor({ set }){

    const [name,setName]=useState(null)  
    const [mail,setMail]=useState(null)
    const [mobile,setMobile]=useState(null)
    const [password,setPassword]=useState(null)
    const [cafe,setCafe]=useState(null)

    const handleVendorSubmit = (event,set) => {
        event.preventDefault()
        const res=CheckVendorData(name,mail,mobile,password,cafe)
        if(res===false) return
        set(false)
    }

    return(
        <div className='form-contaniner'>
            <form>
                <h2 id="container-title">Register new vendor</h2>
                <h3 className='form-input-text-primary'>User Name</h3>
                <input className='form-input-primary' type={"text"} placeholder="Name" onChange={(text)=>setName(text.target.value)} /> 
                <h3 className='form-input-text-primary'>E Mail</h3>
                <input className='form-input-primary' type={"email"} placeholder="E-Mail" onChange={(text)=>setMail(text.target.value)} />
                <h3 className='form-input-text-primary'>Mobile Number</h3>
                <input className='form-input-primary' type={"text"} placeholder="Mobile Number" onChange={(text)=>setMobile(text.target.value)} />
                <h3 className='form-input-text-primary'>Password</h3>
                <input className='form-input-primary' type={"password"} placeholder="Password" onChange={(text)=>setPassword(text.target.value)} />
                <h3 className='form-input-text-primary'>Vendor of cafteria</h3>
                <input className='form-input-primary' type={"text"} placeholder="Cafteria" onChange={(text)=>setCafe(text.target.value)} />
                <div className='container-btns'>
                    <button className='tertiary-btn' onClick={()=>set(false)} >Back</button>
                    <input className='tertiary-btn' type={"reset"} />
                    <button className='tertiary-btn' onClick={(event)=>handleVendorSubmit(event,set)}>Submit</button>
                </div>
            </form>
        </div>
    )
}