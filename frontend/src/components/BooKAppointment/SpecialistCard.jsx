import { useNavigate, Link } from "react-router-dom";
import { MdLocationPin } from "react-icons/md";
import { useAuthContext } from "../../context/AuthContext";

import { TbCurrencyNaira } from "react-icons/tb";

export default function SpecialistCard({ doctor }) {
  const { user } = useAuthContext();

  console.log({ doctor });

  const navigate = useNavigate();

  function handleNavigate(doctor) {
    navigate(`/appointment/${doctor.slug}`, { state: { id: doctor.uid } });
  }
  return (
    <div
      className="card-hover w-[95%]  md:w-[47%] lg:w-[40%] justify-between 
    flex relative rounded-xl shadow-services-card  cursor-pointer gap-2 pr-2"
    >
      <div className="flex-1 basis-[30%] flex items-center justify-center rounded-2xl bg-secondary">
        <img src={doctor.image} alt="doctor image" className="max-h-[80%] " />
      </div>
      <div className="flex-1 basis-[70%] flex flex-col gap-2">
        <Link
          to={`/appointment/${doctor.slug}`}
          state={{ id: doctor.uid }}
          className="text-primary  md:text-lg lg:text-xl font-[900] mt-2"
        >
          Dr. {doctor.firstname} {doctor.lastname}
        </Link>
        <div className="w-fit p-1 flex flex-col gap-1 items-center border border-primary rounded-md text-xs">
          <p>Mon - Fri</p>
          <p>8am - 5pm</p>
        </div>
        <div className="flex flex-col">
          <p className="text-primary font-semibold text-sm">{doctor.field}</p>
          <p className="text-primary font-semibold flex items-center text-sm">
            <TbCurrencyNaira /> <span>{doctor.price}</span>
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center relative">
          <p className="text-[.8rem] flex items-center text-primary font-[500] w-full lg:w-4/6">
            <span>
              <MdLocationPin />
            </span>{" "}
            {doctor?.hospital ? doctor.hospital : "hospital"}
          </p>

          <button
            className="w-full lg:w-2/6 text-xs bg-primary text-white px-1 py-2 rounded-md "
            onClick={() => handleNavigate(doctor)}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
