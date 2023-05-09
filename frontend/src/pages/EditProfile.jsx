import React from 'react'
import DoctorProfileForm from '../components/Form/DoctorProfileForm'
import RolesRoute from '../components/RouteGuard/RolesRoute'
import PatientForm from '../components/Form/PatientForm'

function EditProfile() {
  return (
    <section className='w-full'>
      <RolesRoute doctor={<DoctorProfileForm />} patient={<PatientForm/>} />
    </section>
  )
}

export default EditProfile