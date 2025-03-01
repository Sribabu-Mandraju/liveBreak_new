
import React, { useState} from "react";
import tasklogo from '../assets/tasklogo.svg'
import { RiMenu2Fill } from "react-icons/ri";
import {
    FaBars,
    FaTimes,
    
  } from "react-icons/fa";
const Task = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setOpenDropdown(null);
      };
      const navItems = [
          { label: "Home", href: "#"},
          { label: "Products", href: "#"},
          { label: "Tokenomics", href: "#"},
          { label: "Roadmap", href: "#"},
          { label: "Docs", href: "#"},
          { label: "Testnet", href: "#"},
         
        ];
  return (
    <div className='flex w-screen h-screen bg-gray-900'>
        <header className='flex items-center w-full my-6 h-max flex-row justify-between mx-8 md:mx-14'>
            <div>
                <img src={tasklogo} className='md:w-auto md:h-auto w-[50%] ' />
            </div>
            <div className={`hidden lg:flex flex-row p-[19px] px-16 shadow-white/30 shadow-inner text-white gap-12 text-xl border-opacity-5 rounded-[25px] backdrop-blur-xl   bg-white/5 border h-full border-white/20`}>
            {
                navItems.map((data)=>(
                    <a href={data.href} className={`${data.label=="Testnet" ? "text-gray-500 font-semibold" :"text-white"}`}>
                        {data.label}
                    </a >
                ))
            }    
            </div>
            <div className='md:hidden flex text-white text-2xl'>
                <button
                              onClick={toggleMobileMenu}
                              className="lg:hidden text-white transition-colors duration-200"
                              aria-label="Toggle mobile menu"
                            >
                               <RiMenu2Fill size={24} />
                            </button>

            </div>
            {isMobileMenuOpen && (
          <>
            
            <div
              className="fixed left-2 top-16 backdrop-blur-xl shadow-white/30 shadow-inner   bg-gray-900 border h-[90vh] border-white/40 bottom-0 w-64 text-white p-4 transform transition-transform duration-300 ease-in-out z-50 lg:hidden overflow-y-auto"
              style={{
                zIndex: "300",
              }}
            >
             
              <nav className="flex flex-col justify-start gap-2 ">
                {navItems.map((item, index) => (
                 
                  
                      <a
                        href={item.href}
                        className={`flex items-center gap-2 py-2 px-3  ${item.label=="Testnet" ? "text-gray-500 font-semibold" :"text-white"} rounded-md transition-colors duration-200`}
                        onClick={toggleMobileMenu}
                      >
                        
                        {item.label}
                      </a>
                    
               
                ))
            }
              </nav>
            </div>
          </>
        )}

        </header>

    </div>
  )
}

export default Task