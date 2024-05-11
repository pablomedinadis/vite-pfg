import './Main.css'

export function MainProfileMenu(){
    return(
        <div className='containerProfile'>
            {/* 1/4 */}
            <div className='containerOneQuarter'>
                <div>
                    <img src="" alt="" />
                    <h2 className='profileH'>Pablo Medina</h2>
                    <h3 className='profileH'>Ingeniero Informático</h3>
                    <p className='profileP'>Edad 24</p>
                    <p className='profileP'>Pais: España</p>
                    <p className='profileP'>Residencia: Madrid, España</p>
                    <div className='profileButton'>
                        <button>Editar Perfil</button>
                        <button>Ver Tarjeta</button>
                    </div>
                </div>
            </div> 
            {/* 3/4 */}
            <div className='containerThreeQuarter'>
                <h3 className='profileContainerTitle'>Idiomas</h3>
                <div className='profileContainerSkills'>
                    <div className='profileContainerSkillBox'>
                        <div className='profileSkillBox1'>
                            <div className='profileSkillBtn'>
                                <button>Español</button>
                            </div>
                        </div>
                        <div className='profileSkillBox2'>
                            <div className='profileSkillBtn'>
                                <button>Español</button>
                            </div>
                        </div>
                        <div className='profileSkillBox3'>
                            <div className='profileSkillBtn'>
                                <button>Español</button>
                            </div>
                        </div>
                        <div className='profileSkillBox4'>
                            <div className='profileSkillBtn'>
                                <button>Español</button>
                            </div>
                        </div>
                    </div>
                </div>
                <h3 className='profileContainerTitle'>Main Skills</h3>
                <div className='profileContainerSkills'>
                    <div className='profileContainerSkillBox'>
                        <div className='profileSkillBox1'>
                            <div className='profileSkillBtn'>
                                <button>Español</button>
                                <button>Español</button>
                                <button>Español</button>
                            </div>
                        </div>
                        <div className='profileSkillBox2'>
                            <div className='profileSkillBtn'>
                                <button>Español</button>
                                <button>Español</button>
                                <button>Español</button>
                            </div>
                        </div>
                        <div className='profileSkillBox3'>
                            <div className='profileSkillBtn'>
                                <button>Español</button>
                                <button>Español</button>
                                <button>Español</button>
                            </div>
                        </div>
                        <div className='profileSkillBox4'>
                            <div className='profileSkillBtn'>
                                <button>Español</button>
                                <button>Español</button>
                                <button>Español</button>
                            </div>
                        </div>
                    </div>
                </div>
                <h3 className='profileContainerTitle'>Other Skills</h3>
                <div className='profileContainerSkills'>
                    <div className='profileContainerSkillBox'>
                        <div className='profileSkillBox1'>
                            <div className='profileSkillBtn'>
                                <button>Español</button>
                                <button>Español</button>
                                <button>Español</button>
                            </div>
                        </div>
                        <div className='profileSkillBox2'>
                            <div className='profileSkillBtn'>
                                <button>Español</button>
                                <button>Español</button>
                                <button>Español</button>
                            </div>
                        </div>
                        <div className='profileSkillBox3'>
                            <div className='profileSkillBtn'>
                                <button>Español</button>
                                <button>Español</button>
                                <button>Español</button>
                            </div>
                        </div>
                        <div className='profileSkillBox4'>
                            <div className='profileSkillBtn'>
                                <button>Español</button>
                                <button>Español</button>
                                <button>Español</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}