import React, { useState, useEffect } from 'react'
import "../css/addItems.css"
import { AddFoodItems, GettAllCafeterias } from '../services/cafeteria.service'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddItems({ set, setMenuList, menuList }){

    const [cafeteria,setCafeteria]=useState("")
    const [item,setItem]=useState("")
    const [price,setPrice]=useState("")
    const [foodType,setFoodType]=useState(null)
    const [isLoading,setIsLoading]=useState(false)
    const [allCafeterias,setAllCafeterias]=useState([])
    const [cafeteriaLoading,setCafeteriaLoading]=useState(false)

    useEffect(()=>{
        setCafeteriaLoading(true)
        GettAllCafeterias().then(res=>{
            setAllCafeterias(res)
            setCafeteriaLoading(false)
        }).catch(e=>{
            console.log(e)
            setCafeteriaLoading(false)
            toast.warn("Some error occured while getting cafeteria names",{
                position:"top-center",
                theme:"colored"
            })
        })
    },[])

    const handleBackButton = (event) => {
        event.preventDefault()
        setMenuList([])
        set(false)
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

    const handleReset = (event) => {
        event.preventDefault()
        setMenuList([])
        setItem("")
        setPrice("")
        let ele = document.getElementsByName("food-type");
        for(let i=0;i<ele.length;i++)
            ele[i].checked = false;
    }

    const handleSubmit = async(event) => {
        event.preventDefault()
        setIsLoading(true)
        if(cafeteria===""||cafeteria===null||cafeteria===undefined)
        {
            setIsLoading(false)
            toast.warn("Cafeteria name not filled",{
                position:"top-center",
                theme:"colored"
            })
            return
        }
        if(!menuList.length)
        {
            setIsLoading(false)
            toast.warn("Menu List empty",{
                position:"top-center",
                theme:"colored"
            })
            return
        }
        await AddFoodItems(cafeteria,menuList).then(res=>{
            setItem("")
            setPrice("")
            setCafeteria("")
            setMenuList([])
            setIsLoading(false)
            toast.success("Food items added",{
                position:"top-center",
                theme:"colored"
            })
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

    const handleVeg = () => {
        document.getElementById("Veg").checked=true
        setFoodType("Veg")
    }

    const handleNonVeg = () => {
        document.getElementById("Non-Veg").checked=true
        setFoodType("Non Veg")
    }

    if(cafeteriaLoading){
        return(
            <div style={{height:"100%"}}>
                <p style={{textAlign:"center",marginTop:"5%"}}>Loading...</p>
            </div>
        )        
    }

    return(
        <>
            <div style={{height:"100%"}}>
                <form>
                    <div className='container-food-items-content'>
                        <h2 id='container-title'>Add food items to cafeteria</h2>
                        <h3 className='form-input-text-primary-title'>Cafeteria Name</h3>
                        <select className="form-input-primary" onClick={(text)=>setCafeteria(text.target.value)}>
                        {allCafeterias.length===0?
                        (
                            <>
                                <option value="" disabled selected hidden>No Cafeterias Available</option>
                            </>
                        ):
                        (
                            <>
                                <option value="" disabled selected hidden>Select Cafeteria</option>
                                {allCafeterias.map((item)=>{
                                    const key=item
                                    return(
                                        <option key={key} value={item}>{item}</option>
                                    )
                                })}
                            </>   
                        )
                        }
                        </select>
                        <div style={{display:"flex",marginLeft:"10%",marginTop:"3.5%",flexDirection:"column"}}>
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
                                    <button className='quaternary-btn' onClick={(event)=>handleAddItem(event)}>Done</button>
                                </div>
                            </div>
                            <div style={{display:"flex",marginTop:"1%"}} onChange={(event)=>setFoodType(event.target.value)}>
                                <h3 className='food-type-text'>Item Type:</h3>
                                <input id="Veg" type="radio" value="Veg" name="food-type" className='radio-btn' />
                                <div id='veg-div' onClick={handleVeg}></div>
                                <label for={"Veg"} className='food-type-text'>Veg</label>
                                <input id="Non-Veg" type="radio" name="food-type" value="Non Veg" className='radio-btn' />
                                <div id='non-veg-div' onClick={handleNonVeg}></div>
                                <label for={"Non-Veg"} className='food-type-text'>Non Veg</label>
                            </div>
                        </div>
                        {menuList.length?
                        (
                            <>
                                <h5 className='text-primary' style={{marginLeft:"10%"}}>Menu List</h5>
                                <div style={{display:"flex",margin:"0 0 0 10%"}}>
                                    <div style={{display:"flex",flex:0.33}}>
                                        <h3 className='text-primary'>Items</h3>
                                    </div>
                                    <div style={{display:"flex",flex:0.33,margin:0}}>
                                        <h3 className='text-primary'>Price</h3>
                                    </div>
                                    <div style={{display:"flex",flex:0.33,margin:0}}>
                                        <h3 className='text-primary'>Type</h3>
                                    </div>
                                </div>
                                <div className='food-items-scroll-container'>
                                    {menuList.map((item)=>{
                                        const key=item.title
                                        return(
                                            <div key={key} style={{display:"flex"}}>
                                                <div style={{display:"flex",flex:0.33}}>
                                                    <h3 className='text-secondary'>{item.title}</h3>
                                                </div>
                                                <div style={{display:"flex",flex:0.33,margin:0}}>
                                                    <h3 className='text-secondary'>₹{item.price}</h3>
                                                </div>
                                                <div style={{display:"flex",flex:0.33,margin:0}}>
                                                    <h3 className='text-secondary'>{item.type}</h3>
                                                </div>
                                            </div>
                                        )   
                                    })}
                                </div>
                            </>
                        ):
                        (
                            <></>
                        )
                        }
                    </div>
                    {isLoading?
                        (   
                            <p style={{textAlign:"center",marginTop:"5%"}}>Request processing...</p>
                        ):
                        (
                            <div className='container-btns'>
                                <button className='tertiary-btn' onClick={(event)=>handleBackButton(event)}>Back</button>
                                <input className='tertiary-btn' type={"reset"} onClick={(event)=>handleReset(event)} />
                                <button className='tertiary-btn' onClick={(event)=>handleSubmit(event)}>Submit</button>
                            </div>
                        )
                    }
                </form>
            </div>
            <ToastContainer />
        </>
    )
}