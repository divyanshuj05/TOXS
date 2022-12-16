/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import '../css/vendor.css'
import { CheckVendorData, EnterVendorData } from '../services/vendor.service'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Vendor({ set }){

    const [name,setName]=useState("")  
    const [mail,setMail]=useState("")
    const [mobile,setMobile]=useState("")
    const [password,setPassword]=useState("")
    const [isLoading,setIsLoading]=useState(false)
    const [securityQuestionOne,setSecurityQuestionOne]=useState("")
    const [securityOne,setSecurityOne] = useState("")
    const [securityQuestionTwo,setSecurityQuestionTwo]=useState("")
    const [securityTwo,setSecurityTwo] = useState("")
    const [securityKey,setSecurityKey]=useState("")

    const handleVendorSubmit =async (event) => {
        event.preventDefault()
        const res=CheckVendorData(name,mail,mobile,password,securityOne,securityQuestionOne,securityTwo,securityQuestionTwo,securityKey)
        if(res!==true)
        {
            toast.warn(res,{
                position:"top-center",
                theme:"colored"
            })
            return
        }
        setIsLoading(true)
        await EnterVendorData(name,mail,mobile,password,securityOne,securityQuestionOne,securityTwo,securityQuestionTwo,securityKey).then(res=>{
            toast.success("Vendor successfully registered",{
                position:"top-center",
                theme:"colored"
            })
            onReset()
            setIsLoading(false)
            return
        }).catch(e=>{
            toast.error(e,{
                position:"top-center",
                theme:"colored"
            })
            setIsLoading(false)
            return
        })
    }

    const onReset = () => {
        setName("")
        setMail("")
        setMobile("")
        setPassword("")
        setSecurityQuestionOne("")
        setSecurityQuestionTwo("")
        setSecurityOne("")
        setSecurityTwo("")
        setSecurityKey("")
    }

    return(
        <>
            <div className='form-contaniner'>
                <form onReset={onReset}>
                    <h2 id="container-title">Register new vendor</h2>
                    <h3 className='form-input-text-primary'>User Name</h3>
                    <input className='form-input-primary' value={name} type={"text"} placeholder="Name" onChange={(text)=>setName(text.target.value)} /> 
                    <h3 className='form-input-text-primary'>E Mail</h3>
                    <input className='form-input-primary' value={mail} type={"email"} placeholder="E-Mail" onChange={(text)=>setMail(text.target.value)} />
                    <h3 className='form-input-text-primary'>Mobile Number</h3>
                    <input className='form-input-primary' value={mobile} type={"text"} placeholder="Mobile Number" onChange={(text)=>setMobile(text.target.value)} />
                    <h3 className='form-input-text-primary'>Password</h3>
                    <input className='form-input-primary' value={password} type={"password"} placeholder="Password" onChange={(text)=>setPassword(text.target.value)} />
                    <h3 for="security1" className='form-input-text-primary'>Security Question 1</h3>
                    <select name="security1" className="form-input-dropdown" onClick={(text)=>setSecurityQuestionOne(text.target.value)}>
                        <option value="" disabled selected hidden>Select question 1</option>
                        <option value="Your favourite movie">Your favourite movie</option>
                        <option value="First pet name">First pet name</option>
                        <option value="First school name">First school name</option>
                        <option value="Your favourite food">Your favourite food</option>
                        <option value="Your elder/younder sibling's pet name">Your elder/younder sibling's pet name</option>
                    </select>
                    <input className='form-input-primary' type={"password"} value={securityOne} placeholder="Answer security question 1" onChange={(text)=>setSecurityOne(text.target.value)} />
                    <h3 for="security2" className='form-input-text-primary'>Security Question 2</h3>
                    <select name="security2" className="form-input-dropdown" onClick={(text)=>setSecurityQuestionTwo(text.target.value)}>
                        <option value="" disabled selected hidden>Select question 2</option>
                        <option value="Your favourite movie">Your favourite movie</option>
                        <option value="First pet name">First pet name</option>
                        <option value="First school name">First school name</option>
                        <option value="Your favourite food">Your favourite food</option>
                        <option value="Your elder/younder sibling's pet name">Your elder/younder sibling's pet name</option>
                    </select>
                    <input className='form-input-primary' type={"password"} value={securityTwo} placeholder="Answer security question 2" onChange={(text)=>setSecurityTwo(text.target.value)} />
                    <h3 className='form-input-text-primary'>Security Key</h3>
                    <input className='form-input-primary' type={"password"} value={securityKey} placeholder="Security Key" onChange={(text)=>setSecurityKey(text.target.value)} />
                    {isLoading?
                    (   
                        <p style={{textAlign:"center",marginTop:"5%"}}>Request processing...</p>
                    ):
                    (
                        <div className='container-btns'>
                            <button className='tertiary-btn' onClick={()=>set(false)} >Back</button>
                            <input className='tertiary-btn' type={"reset"} />
                            <button className='tertiary-btn' onClick={(event)=>handleVendorSubmit(event)}>Submit</button>
                        </div>
                    )
                    }
                </form>
            </div>
        <ToastContainer />
        </>
    )
}