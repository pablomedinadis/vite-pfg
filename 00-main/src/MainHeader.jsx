import './Main.css'

export function MainHeader(){
    return(
        <header className='headerMain'>
            <nav className='navbarMain'>
                <ul className='navbarUL' > 
                    <li className='navbarLI'><a className='navbarA' href="">Perfil</a></li>
                    <li className='navbarLI'><a className='navbarA' href="">Contactos</a></li>
                </ul>
                <div className='navbarDIV'> 
                    <img src="assets/logo.png" alt="" />
                </div>
                <ul className='navbarUL'>
                    <li className='navbarLI'><a className='navbarA' href="">Buscar</a></li>
                    <li className='navbarLI'><a className='navbarA' href="">Sobre Nosotros</a></li>
                </ul>
            </nav>
        </header>
    )
}