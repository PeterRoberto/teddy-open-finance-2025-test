// Styles
import "../../assets/styles/components/header.scss";

// Hooks
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

// Context
import { useAuth } from "../../context/userContext";

// Images
import logo from "../../assets/img/logo-teddy.png";


import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon,
  UserIcon,
  UserPlusIcon
} from '@heroicons/react/24/solid'
import { NavLink } from 'react-router-dom'



const Navbar = () => {
  const { name } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Logout
  const handleLogOut = () => {
    localStorage.removeItem('name');
    navigate("/");
  }

  return (
    <header className="px-2 bg-white shadow-[0_2px_2px_rgba(0,0,0,0.25)]">
      <div className="container mx-auto py-4">
        <nav aria-label="Global" className="nav-header flex items-center justify-between">
          <div className="flex icon-menu-mobile">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex items-center justify-center rounded-md text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-8 cursor-pointer" />
            </button>
          </div>
          <div className="flex lg:flex-1">
              <NavLink to="/" className="box-logo">
                <img className='logo' src={logo} alt="Teddy Open Finance" title="Teddy Open Finance" />
              </NavLink>
          </div>
          
          <PopoverGroup className="hidden lg:flex lg:gap-x-12">
            <NavLink to="/clientes" className="text-sm/6 font-semibold text-gray-900">
              Clientes
            </NavLink>
            <NavLink to="/clientes-selecionados" className="text-sm/6 font-semibold text-gray-900">
              Clientes Selecionados
            </NavLink>

            <button 
              className="cursor-pointer flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900"
              onClick={handleLogOut}
              >
              Sair
            </button>
          </PopoverGroup>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <h2>Olá, <strong>{name ?? "visitante"}</strong></h2>
          </div>
        </nav>
      </div>
      
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 sm:py-10 sm:px-5">
          <div className="top-area-menu-mobile flex items-center justify-between">
            <NavLink to="/" className="box-logo">
              <img className='logo' src={logo} alt="Teddy Open Finance" title="Teddy Open Finance" />
            </NavLink>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6 cursor-pointer" />
            </button>
          </div>
          <div className="mt-6 flow-root area-items-menu">
            <div className="divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                
                <NavLink to="/" className="link-item flex rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                  <HomeIcon className="size-6 text-black mr-4" />
                  <span className="font-semibold text-lg">Home</span>
                </NavLink>
                <NavLink to="/clientes" className="link-item flex rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                  <UserIcon className="size-6 text-black mr-4" />
                  <span className="font-semibold text-lg">Clientes</span>
                </NavLink>
                <NavLink to="/clientes-selecionados" className="link-item flex rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                  <UserPlusIcon className="size-6 text-black mr-4" />
                  <span className="font-semibold text-lg">Clientes Selecionados</span>

                  
                </NavLink>
              </div>
  
            </div>
          </div>
          <div className="py-6 visitor-area">
            <div className="">
              <h2 className="hello-visitor">Olá, <strong>{name ?? "visitante"}</strong></h2>
            </div>
            <button 
              className="mobile-logout cursor-pointer flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900"
              onClick={handleLogOut}
              >
              Sair
            </button>
          </div>
        </DialogPanel>
                    
      </Dialog>
    </header>
  )
}
export default Navbar