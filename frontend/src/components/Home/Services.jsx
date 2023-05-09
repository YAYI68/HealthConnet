import {ServicesData} from "../../data/index"
function ServicesCard({title, description, icon}) {
  return (
    <div className="relative p-4 basis-full min-h-[12.313rem] sm:basis-[45%] lg:basis-[30%] flex flex-col gap-4 flex-1 rounded-2xl shadow-services-card">
      <div className="bg-secondary w-[3rem] h-[3rem] flex items-center justify-center rounded-xl">
        <img src={icon} alt="" className="medical-icons"/>
      </div>
      <p className="font-bold">{title}</p>
      <div className="text-[.8rem] text-gray-500">
       {description}
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section className="relative w-[80%] flex flex-col mt-8 mx-auto">
      <h3
        className="relative self-center font-bold font-jost text-[1.3rem] 
      before:block before:absolute before:w-[50%] before:h-[3px]
       before:bg-primary before:bottom-0 before:left-[50%] before:translate-x-[-50%] mb-4"
      >
        CONNECT WITH
      </h3>
      <div className="flex relative flex-wrap gap-8">
        {ServicesData?.map((item)=>{
          const {id, title, description, icon} = item
          return  <ServicesCard key={id} title={title} description={description} icon={icon}/>
        })}
      </div>
      
    </section>
  );
}
