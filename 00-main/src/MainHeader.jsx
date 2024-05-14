import './Main.css'

export function MainHeader(){

   // document.addEventListener("DOMContentLoaded", function() {
    //     // Get current URL path
    //     var path = window.location.pathname;
    //     console.log(path)
    //     // Find all nav links
    //     var links = document.querySelectorAll('.nav-link');
      
    //     links.forEach(function(link) {
    //       if (link.href.includes(path)) {
    //         link.classList.add('active'); // Add 'active' class if current path is in href of the link
    //       }
    //     });
    //   });

    return(
        <header className='headerMain'>
            <nav className='navbarMain'>
                <ul className='navbarUL' > 
                    <li className='navbarLI'><a className='navbarA' href="/profile">Perfil</a></li>
                    <li className='navbarLI'><a className='navbarA' href="/contact">Contactos</a></li>
                </ul>
                <div className='navbarDIV'> 
                    <img src="assets/logo.png" alt="" />
                </div>
                <ul className='navbarUL'>
                    <li className='navbarLI'><a className='navbarA' href="/search">Buscar</a></li>
                    <li className='navbarLI'><a className='navbarA' href="">Sobre Nosotros</a></li>
                </ul>
            </nav>
        </header>
    )
}