import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({
    show: false,
    type: '',
    msg: ''
  })
  const handleSubmit = (e) =>{
    e.preventDefault()
    if (!name){
     showAlert(true, 'danger', 'Please enter value')
    }
    else if (name && isEditing){
      setList(list.map((item) =>{
        if (item.id === editID){
          return {...item, title: name}
        }
        return item
      }))
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'value changed')
    }
    else {
      showAlert(true, 'success', 'Item added to the list')
      const newItem = {
        id: new Date().getTime().toString(),
        title: name
      };
      setList([...list, newItem])
      setName('')
    }
  }
  const showAlert = (show, type, msg) =>{
    setAlert({
      show: show,
      type: type,
      msg: msg
      
    })
  
  }
  const clearList = () =>{
    showAlert(true, 'danger', 'empty list')
    setList([])
  }
  const removeItem =(id) =>{
    showAlert(true, 'danger', 'Item removed');
    setList(list.filter((item)=> item.id != id ))
  }
  const editItem = (id) =>{
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title)
  }
  return <section className='section-center'>
    <form className='grocery-form' onSubmit={handleSubmit}>
      {alert.show && <Alert {...alert} removeAlert={showAlert}/>}
      <h3>Grocery Bud</h3>
      <div className='form-control'>
        <input type='text' className='grocery' placeholder='e.g eggs' value={name} onChange={(e) => setName(e.target.value)}/>
        <button type='submit' className='submit-btn'>
          {isEditing ? 'edit': 'submit'}
        </button>
      </div>
    </form>
    {
      list.length > 0 && (
        <div className='grocery-container'>
        <List items={list} removeItem={removeItem} editItem={editItem}/>
        <button className='clear-btn' onClick={clearList}>
          Clear Items
        </button>
      </div>
      )
    }
   
  </section>
}

export default App
