import './App.css'
import { MainHeader } from './MainHeader'
import { MainProfileMenu } from './ProfileMenu'

export function Profile(){
    return(
        <>
        <MainHeader />
        <MainProfileMenu />
        </>
    )
}


{/* <div className='body-Profile'>
            <header className="header-EN">
                <nav className="navbar-Profile">
                    <ul className="nav-links-Profile left">
                        <li><a href="#">Perfil</a></li>
                        <li><a href="#">Contactos</a></li>
                    </ul>
                    <div className="logo-Main">
                        <img src="assets/logo.png" alt=""/>
                    </div>
                    <ul className="nav-links-Profile right">
                        <li><a href="#">Buscar</a></li>
                        <li><a href="#">Sobre Nosotros</a></li>
                    </ul>
                </nav>
            </header>
        </div> */}