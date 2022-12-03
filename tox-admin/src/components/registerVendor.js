/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import '../css/vendor.css'
import { CheckVendorData, EnterVendorData } from '../services/vendor.service'

export default function Vendor({ set }){

    const [name,setName]=useState(null)  
    const [mail,setMail]=useState(null)
    const [mobile,setMobile]=useState(null)
    const [password,setPassword]=useState(null)
    const [cafe,setCafe]=useState(null)
    const [isLoading,setIsLoading]=useState(false)
    const [securityQuestionOne,setSecurityQuestionOne]=useState(null)
    const [securityOne,setSecurityOne] = useState("")
    const [securityQuestionTwo,setSecurityQuestionTwo]=useState(null)
    const [securityTwo,setSecurityTwo] = useState("")
    const [securityKey,setSecurityKey]=useState(null)

    const handleVendorSubmit =async (event,set) => {
        event.preventDefault()
        const res=CheckVendorData(name,mail,mobile,password,cafe,securityOne,securityQuestionOne,securityTwo,securityQuestionTwo,securityKey)
        if(res===false) return
        setIsLoading(true)
        await EnterVendorData(name,mail,mobile,password,cafe,securityOne,securityQuestionOne,securityTwo,securityQuestionTwo,securityKey).then(res=>{
            alert("Vendor successfully registered")
            setIsLoading(false)
            set(false)
            return
        }).catch(e=>{
            setIsLoading(false)
            return
        })
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
                <h3 className='form-input-text-primary'>Cafteria of vendor</h3>
                <input className='form-input-primary' type={"text"} placeholder="Cafteria" onChange={(text)=>setCafe(text.target.value)} />
                <h3 for="security1" className='form-input-text-primary'>Security Question 1</h3>
                <select name="security1" className="form-input-dropdown" onChange={(text)=>setSecurityQuestionOne(text.target.value)}>
                    <option value="" disabled selected hidden>Select question 1</option>
                    <option value="Your favourite movie">Your favourite movie</option>
                    <option value="First pet name">First pet name</option>
                    <option value="First school name">First school name</option>
                    <option value="Your favourite food">Your favourite food</option>
                    <option value="Your elder/younder sibling's pet name">Your elder/younder sibling's pet name</option>
                </select>
                <input className='form-input-primary' type={"text"} placeholder="Answer security question 1" onChange={(text)=>setSecurityOne(text.target.value)} />
                <h3 for="security2" className='form-input-text-primary'>Security Question 2</h3>
                <select name="security2" className="form-input-dropdown" onChange={(text)=>setSecurityQuestionTwo(text.target.value)}>
                    <option value="" disabled selected hidden>Select question 2</option>
                    <option value="Your favourite movie">Your favourite movie</option>
                    <option value="First pet name">First pet name</option>
                    <option value="First school name">First school name</option>
                    <option value="Your favourite food">Your favourite food</option>
                    <option value="Your elder/younder sibling's pet name">Your elder/younder sibling's pet name</option>
                </select>
                <input className='form-input-primary' type={"text"} placeholder="Answer security question 2" onChange={(text)=>setSecurityTwo(text.target.value)} />
                <h3 className='form-input-text-primary'>Security Key</h3>
                <input className='form-input-primary' type={"text"} placeholder="Security Key" onChange={(text)=>setSecurityKey(text.target.value)} />
                {isLoading?
                (   
                    <p style={{textAlign:"center",marginTop:"5%"}}>Request processing...</p>
                ):
                (
                    <div className='container-btns'>
                        <button className='tertiary-btn' onClick={()=>set(false)} >Back</button>
                        <input className='tertiary-btn' type={"reset"} />
                        <button className='tertiary-btn' onClick={(event)=>handleVendorSubmit(event,set)}>Submit</button>
                    </div>
                )
                }
            </form>
        </div>
    )
}