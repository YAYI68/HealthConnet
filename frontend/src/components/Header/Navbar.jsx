import { useAppContext } from "../../context/AppContext"
import MainNav from "./MainNav"
import MobileNav from "./MobileNav"


function Navbar() {
  
  return (
    <header  className={`w-screen overflow-hidden h-[10vh] flex items-center justify-center `}> 
     <MainNav/>
     <MobileNav/>
    </header>
  )
}

export default Navbar

