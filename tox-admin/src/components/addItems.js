import React, { useState } from 'react'
import "../css/addItems.css"
import { AddFoodItems } from '../services/cafeteria.service'

export default function AddItems({ set, setMenuList, menuList }){

    const [cafeteria,setCafeteria]=useState("")
    const [item,setItem]=useState("")
    const [price,setPrice]=useState("")
    const [foodType,setFoodType]=useState(null)
    const [isLoading,setIsLoading]=useState(false)

    const handleBackButton = (event) => {
        event.preventDefault()
        setMenuList([])
        set(false)
    }

    const handleAddItem = (event) => {
        event.preventDefault()
        if(!item||!price||!foodType)
        {
            alert("Food item data not filled!!")
            return
        }
        if(isNaN(price))
        {
            alert("Price of food item is not a number!")
            return
        }
        for(let i=0;i<menuList.length;i++)
        {
            if(menuList[i].title===item)
            {
                alert(`Food item ${item} already exists`)
                return
            }
        }
        const data={
            title:item,
            price:price,
            type:foodType
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
        setCafeteria("")
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
            alert("Cafeteria name not filled")
            return
        }
        if(!menuList.length)
        {
            setIsLoading(false)
            alert("Menu List empty")
            return
        }
        await AddFoodItems(cafeteria,menuList).then(res=>{
            setItem("")
            setPrice("")
            setCafeteria("")
            setMenuList([])
            setIsLoading(false)
            set(false)
            alert("Food items added")
            return
        }).catch(e=>{
            setIsLoading(false)
            return
        })
    }

    return(
        <div className='form-container'>
            <form>
                <div className='container-food-items-content'>
                    <h2 id='container-title'>Add food items to cafeteria</h2>
                    <h3 className='form-input-text-primary-title'>Cafeteria Name</h3>
                    <input type={"text"} value={cafeteria} className='form-input-primary' placeholder='Name' onChange={(text)=>setCafeteria(text.target.value)} />
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
                            <div id='veg-div'></div>
                            <label for={"Veg"} className='food-type-text'>Veg</label>
                            <input id="Non-Veg" type="radio" name="food-type" value="Non Veg" className='radio-btn' />
                            <div id='non-veg-div'></div>
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
                                <div style={{display:"flex",flex:0.33}}>
                                    <h3 className='text-primary'>Price</h3>
                                </div>
                                <div style={{display:"flex",flex:0.33}}>
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
                                            <div style={{display:"flex",flex:0.33,margin:"0"}}>
                                                <h3 className='text-secondary'>₹{item.price}</h3>
                                            </div>
                                            <div style={{display:"flex",flex:0.33,margin:"0"}}>
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
    )
}