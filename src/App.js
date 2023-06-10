import React, { useEffect, useState } from 'react'
// import GroceryList from './GroceryList'
import './App.css'
import { AiFillDelete } from "react-icons/ai";
import {FiEdit} from "react-icons/fi";

const App = () => {

  const [inputList, setInputList] = useState("");
  const [groceryList, setGroceryList] = useState([]);
  const [addedAlert, setAddedAlert] = useState(false);
  const [removedAlert, setRemovedAlert] = useState(false);
  const [showClearBtn, setShowClearBtn] = useState(false);
  const [emptyListAlert, setEmptyListAlert] = useState(false);
  const [toggleSubmitBtn, setToggleSubmitBtn] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);
  

  const itemEvent = (e) => {
    setInputList(e.target.value);
  }

  const addGrocery = (e) => {
    e.preventDefault();
    if (!inputList) {
      alert("Please fill data");

    } else if (inputList && !toggleSubmitBtn) {
      {
        setGroceryList(groceryList.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputList }
          }
          return elem;
        }))
      }
      setToggleSubmitBtn(true);
      setInputList('')
      setIsEditItem(null);
    } else {
       
      const allInputList = { id: new Date().getTime().toString(), name: inputList }
      setGroceryList((groceryList) => {
        return [...groceryList, allInputList];
      })
      setAddedAlert(true);
      setTimeout(() => {
        setAddedAlert(false);
      }, 2000)
      setShowClearBtn(true);
      setInputList("");
    }
  }

    const deleteItem = (index) => {
      setGroceryList((groceryList) => {
        return groceryList.filter((curElm) => {
          return index !== curElm.id;
        })
      })
      setRemovedAlert(true);
      setTimeout(() => {
        setRemovedAlert(false);
      }, 2000)
    }

    const editItem = (id) => {
      let newEditItem = groceryList.find((elem) => {
        return elem.id === id;
      })
      setToggleSubmitBtn(false);
      setInputList(newEditItem.name)
      setIsEditItem(id);
    }

    const clearAll = () => {
      setGroceryList([]);
      setShowClearBtn(false);
      setEmptyListAlert(true);
      setTimeout(() => {
        setEmptyListAlert(false);
      }, 2000)
        ;
    }
  

    useEffect(() => {
      if (groceryList.length === 0) {
        setShowClearBtn(false)
      }
    }, [groceryList])
  
 

    return (
      <div className='main-div'>
        <div className='center-div'>
          {addedAlert && <div className='alert'><p style={{backgroundColor:" rgb(106, 210, 106)",color:"green"}}>item added to the list</p></div>}
          {removedAlert && <div className='alert'><p style={{backgroundColor:"rgb(230, 127, 127)",color:"red"}}>item removed from the list</p></div>}
          {emptyListAlert && <div className='alert'><p style={{backgroundColor:"rgb(230, 127, 127)",color:"red"}}>the list is empty</p></div>}
          <br />
          <h1> Grocery Bud</h1>
          <br />
          <form  >
            <div className='grocery'>
              <input type='text' placeholder='e.g.eggs' onChange={itemEvent} value={inputList} autoFocus />
              {toggleSubmitBtn ? <button className='btn' type='submit' onClick={ addGrocery }>submit</button> : <button className='btn' onClick={ addGrocery } >edit</button>}
            </div>
          </form>
          <div className='grocery-list'>
        
            {groceryList.map((grocery) => {
              return (
                <div className='grocery-list-items' key={grocery.id}>
                  <p>{grocery.name}</p>
                  <div className='icons'>
                    <FiEdit style={{ color: 'green', marginRight: '10px' }} onClick={() =>  editItem(grocery.id) }></FiEdit>
                    <AiFillDelete style={{ color: 'red', marginRight: '10px' }} onClick={() => deleteItem(grocery.id)}></AiFillDelete>
                                    
                  </div>
                </div>
                  
              )
            })}
            
            
          
            {showClearBtn && <button className='clear-btn' onClick={clearAll }>clear all items</button>}
        
          </div>
        </div>
      
      
      </div>
    )
  }


export default App


