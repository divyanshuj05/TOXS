import React from 'react'
import "../css/menuList.css"

export default function List({ menuList }){
    return(
        <>
            <h2 id='container-title'>Menu List</h2>
            <div className='list-container'>
                <div className='list-item-container'>
                    <h3 className='form-input-text-primary'>Items</h3>
                </div>
                <div className='list-item-container'>
                    <h3 className='form-input-text-primary'>Price</h3>
                </div>
                <div className='list-item-container'>
                    <h3 className='form-input-text-primary'>Type</h3>
                </div>
            </div>  
            {
                menuList.map((item)=>{
                    const key=item.title
                    return(
                        <div key={key} className='list-container'>
                            <div className='list-item-container'>
                                <h3 className='form-input-text-primary'>{item.title}</h3>
                            </div>
                            <div className='list-item-container'>
                                <h3 className='form-input-text-primary'>₹{item.price}</h3>
                            </div>
                            <div className='list-item-container'>
                                <h3 className='form-input-text-primary'>{item.type}</h3>
                            </div>
                        </div>  
                    )
                })
            }
        </>
    )
}