import React from 'react'
import TheHeader from '../components/TheHeader'
import LeftBox from '../components/LeftBox'
import RightBox from '../components/RightBox'
import List from "../components/List";

const Dashboard = () => {
  return (
    <div>
        <TheHeader/>
        <div className='parent-box'>
            <div className='left-box'>
                <LeftBox/>
            </div>
            <div className='right-box'>
                <RightBox/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard