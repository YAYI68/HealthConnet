import DoctorProfile from "../components/Dashboard/Profile/DoctorProfile"
import PatientProfile from "../components/Dashboard/Profile/PatientProfile"
import RolesRoute from "../components/RouteGuard/RolesRoute"


function Profile() {
  return (
    <section className="w-full py-4">
      <p className="font-semibold text-[1.2rem]">My Profile</p>
      <RolesRoute doctor={<DoctorProfile />} patient={<PatientProfile />} />
    </section>
  )
}

export default Profile