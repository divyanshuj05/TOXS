import React, { useState, useEffect } from 'react'
import "../css/cafeteria.css"
import { CheckCafeteriaData, RegisterCafeteria, GetAllVendors } from '../services/cafeteria.service'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Cafeteria({ set, setMenuList, menuList }){

    const [name,setName]=useState("")
    const [location,setLocation]=useState("")
    const [img,setImg]=useState("")
    const [openTime,setOpenTime]=useState("")
    const [closeTime,setCloseTime]=useState("")
    const [isLoading,setIsLoading]=useState(false)
    const [vendor,setVendor]=useState("")
    const [foodType,setFoodType]=useState(null)
    const [item,setItem]=useState("")
    const [price,setPrice]=useState("")
    const [allVendors,setAllVendors]=useState([])
    const [vendorLoading,setVendorLoading]=useState(false)

    useEffect(()=>{
        setVendorLoading(true)
        GetAllVendors().then(res=>{
            setAllVendors(res)
            setVendorLoading(false)
        }).catch(e=>{
            console.log(e)
            setVendorLoading(false)
            toast.warn("Some error occured while getting vendors",{
                position:"top-center",
                theme:"colored"
            })
        })
    },[])

    const handleCafeteriaSubmit = async(event) => {
        event.preventDefault()
        const res=CheckCafeteriaData(name,location,vendor,img,openTime,closeTime,menuList)
        if(res!==true)
        {
            toast.warn(res,{
                position:"top-center",
                theme:"colored"
            })
            return
        }
        setIsLoading(true)
        await RegisterCafeteria(name,location,vendor,img,openTime,closeTime,menuList).then(res=>{
            toast.success("Cafeteria successfullly registered",{
                position:"top-center",
                theme:"colored"
            })
            handleReset()
            setIsLoading(false)
            return
        }).catch(e=>{
            setIsLoading(false)
            handleReset()
            toast.error(e,{
                position:"top-center",
                theme:"colored"
            })
            return
        })
    }

    const handleAddItem = (event) => {
        event.preventDefault()
        if(!item||!price||!foodType)
        {
            toast.warn("Food item data not filled!!",{
                position:"top-center",
                theme:"colored"
            })
            return
        }
        if(isNaN(price))
        {
            toast.warn("Price of food item is not a number!",{
                position:"top-center",
                theme:"colored"
            })
            return
        }
        for(let i=0;i<menuList.length;i++)
        {
            if(menuList[i].title===item)
            {
                toast.warn(`Food item ${item} already exists`,{
                    position:"top-center",
                    theme:"colored"
                })
                return
            }
        }
        document.getElementsByClassName('form-input-quaternary').value=null
        const data={
            title:item,
            price:price,
            type:foodType,
            isPresent:true
        }
        setMenuList([...menuList,data])
        setItem("")
        setPrice("")
        setFoodType(null)
        let ele = document.getElementsByName("food-type");
        for(let i=0;i<ele.length;i++)
            ele[i].checked = false;
    }

    const handleBackButton = (event) => {
        event.preventDefault()
        setMenuList([])
        set(false)
    }

    const handleReset = () => {
        setMenuList([])
        setItem("")
        setPrice("")
        setName("")
        setLocation("")
        setVendor("")
        setOpenTime("")
        setCloseTime("")
        document.getElementById("file").value=""
    }

    const handleVeg = () => {
        document.getElementById("Veg").checked=true
        setFoodType("Veg")
    }

    const handleNonVeg = () => {
        document.getElementById("Non Veg").checked=true
        setFoodType("Non Veg")
    }

    if(vendorLoading){
        return(
            <div style={{height:"100%"}}>
                <p style={{textAlign:"center",marginTop:"5%"}}>Loading...</p>
            </div>
        )        
    }

    return(
        <>
            <div style={{ height:"100%"}}>
                <form onReset={handleReset}>
                    <h2 id='container-title'>Register new cafeteria</h2>
                    <h3 className='form-input-text-primary'>Name</h3>
                    <input value={name} type={"text"} className='form-input-primary' placeholder='Cafeteria Name' onChange={(text)=>setName(text.target.value)} />
                    <h3 className='form-input-text-primary'>Location</h3>
                    <input value={location} type={"text"} className='form-input-primary' placeholder='Location' onChange={(text)=>setLocation(text.target.value)}  />
                    <h3 className='form-input-text-primary'>Vendor Name</h3>
                    <select className="form-input-primary" onClick={(text)=>setVendor(text.target.value)}>
                    {allVendors.length===0?
                    (
                        <>
                            <option value="" disabled selected hidden>No Vendors Available</option>
                        </>
                    ):
                    (
                        <>
                            <option value="" disabled selected hidden>Select Vendor</option>
                            {allVendors.map((item)=>{
                                const key=item
                                return(
                                    <option key={key} value={item}>{item}</option>
                                )
                            })}
                        </>   
                    )
                    }
                    </select>
                    <h3 className='form-input-text-primary'>Select an image</h3>
                    <input id="file" type={"file"} className='form-input-secondary' placeholder='Select File' onChange={(text)=>setImg(text.target.files[0])}  />
                    <h3 className='form-input-text-primary'>Timings of cafeteria</h3>
                    <div style={{display:"flex",marginLeft:"10%"}}>
                        <input value={openTime} type={"time"} className='form-input-tertiary' placeholder='Open at' onChange={(text)=>setOpenTime(text.target.value)}  />
                        <h5 style={{margin:4}}>to</h5>
                        <input value={closeTime} type={"time"} className='form-input-tertiary' placeholder='Closes at' onChange={(text)=>setCloseTime(text.target.value)}  />
                    </div>
                    <h3 className='form-input-text-primary'>Add food item</h3>
                    <div style={{display:"flex",marginLeft:"10%",flexDirection:"column"}}>
                        <div style={{display:"flex"}}>
                            <div style={{display:"flex",flexDirection:"column",width:110}}>
                                <h3 className='form-input-text-secondary'>Item name</h3>
                                <input type={"text"} placeholder='Item name' className='form-input-quaternary' value={item} onChange={(text)=>setItem(text.target.value)} />
                            </div>
                            <div style={{display:"flex",flexDirection:"column",width:110}}>
                                <h3 className='form-input-text-secondary'>Item Price</h3>
                                <input type={"text"} placeholder='Price ₹' className='form-input-quaternary' value={price} onChange={(text)=>setPrice(text.target.value)} />
                            </div>
                            <div style={{display:"flex",flexDirection:"column",width:110, justifyContent:"center"}}>
                                <button className='quaternary-btn' onClick={(event)=>handleAddItem(event)} >Done</button>
                            </div>
                        </div>
                        <div style={{display:"flex",marginTop:"1%"}} onChange={(event)=>setFoodType(event.target.value)}>
                            <h3 className='food-type-text'>Item Type:</h3>
                            <input type="radio" id="Veg" value="Veg" name="food-type" className='radio-btn' />
                            <div id='veg-div' onClick={handleVeg}></div>
                            <label for={"Veg"} className='food-type-text'>Veg</label>
                            <input type="radio" id="Non Veg" name="food-type" value="Non Veg" className='radio-btn' />
                            <div id='non-veg-div' onClick={handleNonVeg}></div>
                            <label for={"Non Veg"} className='food-type-text'>Non Veg</label>
                        </div>
                    </div>
                    {isLoading?
                        (   
                            <p style={{textAlign:"center",marginVertical:"5%"}}>Request processing...</p>
                        ):
                        (
                            <div className='container-btns'>
                                <button className='tertiary-btn' onClick={(event)=>handleBackButton(event)}>Back</button>
                                <input className='tertiary-btn' type={"reset"} />
                                <button className='tertiary-btn' onClick={(event)=>handleCafeteriaSubmit(event,set)}>Submit</button>
                            </div>
                        )
                    }
                </form>
            </div>
            <ToastContainer />
        </>
    )
}