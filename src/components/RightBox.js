import React from 'react'
import Holidays from "../holidays.json"
const RightBox = () => {
  Holidays.map((item) => {
    console.log(item.name)
  })
  return (
    <div className='rightbox-parent'>
      <p>List of holidays</p>
        <ul>
      {
        Holidays.map((item) => {
          return (
              <li key={item.id}>
                {item.name}
              </li>
          )
        }
        )
      }
      </ul>
    </div>
  )
}

export default RightBox