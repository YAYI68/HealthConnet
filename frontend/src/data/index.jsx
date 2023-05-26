import { GiHeartOrgan, GiMedicines } from "react-icons/gi";
import HeartIcon from "../assets/svg/heart.svg"
import UrologyIcon from "../assets/svg/urology.svg"
import PharmacyIcon from "../assets/svg/pharmacy_alt.svg"
import DiabetesIcon from "../assets/svg/diabetes.svg"
import NeurologyIcon from "../assets/svg/neurology.svg"
import SurgicalIcon from "../assets/svg/surgical.svg"
import { AiTwotoneHome } from "react-icons/ai";
import { ImAddressBook } from "react-icons/im";
import { FaCalendarAlt } from "react-icons/fa";
import { MdSettings, MdWorkHistory } from "react-icons/md";
import { BsBellFill, BsFillCalendarCheckFill, BsFillCalendarXFill } from "react-icons/bs";
import { HiCurrencyDollar } from "react-icons/hi";
import articleImg1 from '../assets/images/EXercisess.webp';
import articleImg2 from '../assets/images/mentalHealth.jpg';
import articleImg3 from '../assets/images/medications.jpg';


export const successHistory = [
  {
    name: "Doctor",
    value: 175,
  },
  {
    name: "Clinic location",
    value: 50,
  },
  {
    name: "Surgery room",
    value: 30,
  },
  {
    name: "Patient Capacity",
    value: 1200,
  },
];

export const testmonialData = [
  {
    id: 1,
    name: "Sunday Omena",
    sickness: "fever",
    message: "havn't been feeling well, found the nearest doctor with this app",
  },
  {
    id: 2,
    name: "Yayi Dev",
    sickness: "headache",
    message: "Got quick medicine thanks to health connect",
  },
  {
    id: 3,
    name: "Isreal Dev",
    sickness: "Over Coding",
    message: "almost quit coding thanks to health connect for therapist",
  },
  {
    id: 4,
    name: "Harison Dev",
    sickness: "Sleeplessness",
    message: "was able to locate the nearest pharmacist shop",
  },
];

export const ServicesData = [
  {
    id: 1,
    title: "Cardiologist",
    icon: HeartIcon,
    description:
      "Link up with experts on the heart and blood vessels, You might see them for heart failure, a heart attack, and irregular heart beat",
  },
  {
    id: 2,
    title: "Dermatologists",
    icon: DiabetesIcon,
    description:
      "Have problems with ur skin, hair, nails? Do you have moles, scars, acne? Dermatologist can help",
  },
  {
    id: 3,
    title: "Neurologist",
    icon: NeurologyIcon,
    description:
      "Specialist in nervous system, which includes the brain, spinal cord, and nerves. They treat stokes, brain, and spinal tumors.",
  },
  {
    id: 4,
    title: "General Surgeons",
    icon: SurgicalIcon,
    description:
      "These Doctors can operate on all parts of your body. They can take tumors, appendences, or gallbladders and repair hernias.",
  },
  {
    id: 5,
    title: "Ureologist",
    icon: UrologyIcon,
    description:
      "These are surgeons who care for men and women for problems in the urinary tract, like a leaky bladder.",
  },
  {
    id: 6,
    title: "Pharmacist",
    icon: PharmacyIcon,
    description: "Helps patients with prescription and description on how to take drugs",
  },
];


export const DashboardLink = [
  {
    icon:<AiTwotoneHome className='h-[1rem] w-[1rem] lg:h-[1.5rem] lg:w-[1.5rem]'/>,
    name:'Overview',
    link:'/dashboard/overview'
  },
  {
    icon:<ImAddressBook className='h-[1rem] w-[1rem]  lg:h-[1.5rem] lg:w-[1.5rem]'/>,
    name:'Appointment',
    link:'/dashboard/appointment'
  },
  {
    icon:<MdWorkHistory className='h-[1rem] w-[1rem] lg:h-[1.5rem] lg:w-[1.5rem]'/>,
    name:'History',
    link:'/dashboard/history'
  },
  {
    icon:<BsBellFill className='h-[1rem] w-[1rem] lg:h-[1.5rem] lg:w-[1.5rem]'/>,
    name:'Notifications',
    link:'/dashboard/notification'
  },  
  {
    icon:<MdSettings className='h-[1rem] w-[1rem] lg:h-[1.5rem] lg:w-[1.5rem]'/>,
    name:'Setting',
    link:'/dashboard/setting'
  },
]

export const DoctorServices = [
  {
    name:'Urology',
    link:'urology',
  },

  {
    name:'Anesthesiologists',
    link:'anesthesiologist',
  },

  {
    name:'Cardiologists',
    link:'cardiologist',
  },

  {
    name:'Dermatologists',
    link:'dermatologist',
  },

  {
    name:'Endocrinologists',
    link:'endocrinologist',
  },

  
  {
    name:'Dentists',
    link:'Dentist',
  },
  
  {
    name:'Gastroenterologists',
    link:'gastroenterologist',
  },
  
  {
    name:'Hematologists',
    link:'hematologist',
  },

  {
    name:'Neurologists',
    link:'neurologists',
  },

  {
    name:'Neurologists',
    link:'neurologist',
  },

  {
    name:'Nephrologists',
    link:'nephrologist'
  },
  
  {
    name:'Gynecologists',
    link:'gynecologists'
  },
  
  {
    name:'Oncologists',
    link:'oncologists'
  },
  {
    name:'Ophthalmologists',
    link:'ophthalmologist'
  },
  {
    name:'Radiologists',
    link:'radiologist'
  },
  {
    name:'Pulmonologists',
    link:'pulmonologists'
  },
  {
    name:'Psychiatrists',
    link:'psychiatrists'
  },
  {
   name:'Otolaryngologists',
   link:'otolaryngologist'
  },

]

export const BookingData = [
  {
    title:'Total Booking',
    number:22,
    bgColor:'bg-blue-100',
    icon:<FaCalendarAlt  className={`h-[1.5rem] w-[1.5rem] fill-blue-500`} />,
  },
  {
    title:'Booking Success',
    number:22,
    bgColor:'bg-green-100',
    icon:<BsFillCalendarCheckFill className={`h-[1.5rem] w-[1.5rem] fill-green-500`} />
  },
  {
    title:'Booking Cancel',
    number:22,
    bgColor:'bg-red-100',
    icon:<BsFillCalendarXFill className={`h-[1.5rem] w-[1.5rem] fill-red-500`} /> 
  },
  {
    title:'Paid Amount',
    number:'$50',
    bgColor:'bg-lime-100',
    icon:<HiCurrencyDollar className={`h-[1.5rem] w-[1.5rem] fill-lime-500`} /> 
  }
]


export const workHours = ['9:00 AM', '9:15 AM', '9:30 AM', '9:45 AM', 
                          '10:00 AM','10:15 AM', '10:30 AM', '10:45 AM', 
                          '11:00 AM','11:15 AM', '11:30 AM', '11:45 AM', 
                          '12:00 PM','12:15 PM', '12:30 PM', '12:45 PM',
                          '1:00 PM','1:15 PM', '1:30 PM', '1:45 PM',
                          '2:00 PM','2:15 PM', '2:30 PM', '2:45 PM',
                          '3:00 PM','3:15 PM','3:30 PM', '3:45 PM',
                          '4:00 PM', '4:15 PM', '4:30 PM', '4:45 PM',
                          '5:00 PM', 
                        ]


export const blogPosts = [
    {
      id: 1,
      title:
        'The Benefits of Regular Exercise: How a Healthy Lifestyle Can Improve Your Health',
      date: '2023-02-10',
      image: articleImg1,
      body: 'Regular exercise is a crucial component of a healthy lifestyle, and has been shown to have numerous benefits for both physical and mental health.',
    },
    {
      id: 2,
      title:
        'Mental Health and Wellbeing: Tips for Managing Stress, Anxiety, and Depression',
      date: '2023-03-28',
      image: articleImg2,
      body: 'Mental health and wellbeing are crucial components of overall health and happiness. Unfortunately, many people struggle with stress, anxiety, and depression.',
    },
    {
      id: 3,
      title: 'Understanding Your Medications: Tips for Safe and Effective Use',
      date: '2023-04-03',
      image: articleImg3,
      body: 'Medications are an important tool in managing many health conditions, but they can also be complex and confusing.',
    },
   ]