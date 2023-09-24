import React from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { BsTrash } from 'react-icons/bs'
import axios from 'axios'
import { baseURL } from '../utils/constant'

export const List = (props) => {

  const removeTask = () => {
    axios.delete(`${baseURL}/delete/${props.id}`).then((res) => {
      console.log(res.data)
      props.setUpdateUI((prevState) => !prevState)
    })
  }

  return (
    <li style={{
      border: '1px solid black',
      padding: '10px',
      marginBottom: '5px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#f5f5f5'
    }}>
      <span style={{ flex: '1' }}>{props.task}</span>
      <div className="icon_holder" style={{ flex: '0 0 auto' }}>
        <BiEditAlt
          className='icon'
          style={{ cursor: 'pointer', marginRight: '10px' }}
          onClick={() => props.updateMode(props.id, props.task)}
        />
        <BsTrash
          className='icon'
          style={{ cursor: 'pointer' }}
          onClick={removeTask}
        />
      </div>
    </li>
  )
}
