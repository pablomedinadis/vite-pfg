import './Main.css'

export function ContactMenu(){
    return(
        <div className='containerProfile'>
            <div className='containerOneQuarterContact'>
                <div><a href="">Todos</a></div>
                <div><a href=""> Grupos</a></div>
                <div><a href="">Pendientes</a></div>
            </div>
            <div className='containerThreeQuarter'>
                {/* Habría que hacer un mapeo desde la API */}
                <div className='contactContainer'>
                    <div className='contactPhoto'>
                        <img src="" alt="" />
                    </div>
                    <div className='contactInfo'>
                        <h3>Pablo Medina</h3>
                        <h4>Ingeniero Informático</h4>
                        <p>Edad: 24</p>
                        <p>País: España</p>
                        <p>Residencia: Madrid, España</p>
                    </div>
                    {/* Skills */}
                    <div className='contactSkillsContainer'>
                        <p>Idiomas</p>
                        <div className='contactSkillsContainerDiv'>
                            <div className='contactSkillList'>
                                <button>Español</button>
                                <button>Español</button>
                                <button>Español</button>
                                <button>Español</button>
                            </div>
                        </div>
                        <p>Main Skills</p>
                        <div className='contactSkillsContainerDiv'>
                        <div className='contactSkillList'>
                                <button>Español</button>
                                <button>Español</button>
                                <button>Español</button>
                                <button>Español</button>
                            </div>
                        </div>
                    </div>
                    {/* Botones */}
                    <div className='contactButtonContainer'>
                        <button className='contactButtonContainer1'>Ver tarjeta</button>
                        <button className='contactButtonContainer2'>Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}