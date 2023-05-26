import React from 'react'
import RolesRoute from '../components/RouteGuard/RolesRoute'
import { DoctorAppointments, PatientAppointments } from '../components/Dashboard/Appointment'

function AllAppointments() {
    return (
        <section className="w-full py-4">
          <p className="font-semibold text-[1.2rem]">My Profile</p>
          <RolesRoute doctor={<DoctorAppointments />} patient={<PatientAppointments />} />
        </section>
      )
}

export default AllAppointments