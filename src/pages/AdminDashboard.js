import React, {useState} from 'react'
import { Formik, Form, Field } from 'formik';
import AdminList from "../components/Admin/AdminList"
import TheHeader from '../components/TheHeader'
import AddForm from '../components/Admin/AddForm';

const AdminDashboard = () => {
    const [openForm, setOpenForm] = useState(false)
    
  return (
    <div>
         <TheHeader/>
<AdminList />
<button className='button-85'
onClick={() => setOpenForm(true)}>Add New Employee</button>

{
    openForm && (
        <AddForm/>

    )
}
    </div>
  )
}

export default AdminDashboard