import { useAppContext } from "../../context/AppContext"
import MainNav from "./MainNav"
import MobileNav from "./MobileNav"


function Navbar() {
  const {  ref, inView } = useAppContext()
  return (
    <header ref={ref} className={`w-screen overflow-hidden h-[10vh] flex items-center justify-center `}> 
     <MainNav/>
     <MobileNav/>
    </header>
  )
}

export default Navbar

