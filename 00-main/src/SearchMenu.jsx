import './Main.css';
import React, { useState, useEffect } from 'react';

export function SearchMenu() {
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        const fetchMD = async () => {
            try {
                const response = await fetch('http://localhost:1234/md');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };
        fetchMD();
    }, []);

    const selectLanguage = (language) => {
        setSelectedLanguages(prevLanguages => [...prevLanguages, { name: language, rating: null }]);
    };

    const clearLanguages = () => {
        setSelectedLanguages([]);
    };

    const fetchLanguages = async () => {
        try {
            const response = await fetch('http://localhost:1234/lang');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Failed to fetch languages:', error);
            return [];
        }
    };

    const clearLanguagesSearch = () => {
        const list = document.getElementById('languageList');
        list.innerHTML = ''; // Clear previous results
    };

    const searchLanguages = async () => {
        const input = document.getElementById('languageInput').value.toLowerCase();
        const languages = await fetchLanguages();
        const filteredLanguages = languages.filter(lang => lang[0].toLowerCase().includes(input));
        displayLanguages(filteredLanguages);
    };

    const displayLanguages = (languages) => {
        const list = document.getElementById('languageList');
        list.innerHTML = ''; // Clear previous results
        languages.forEach(language => {
            const listItem = document.createElement('button');
            listItem.textContent = language[0];
            listItem.onclick = () => selectLanguage(language[0]); // Add the language to the list on click
            list.appendChild(listItem);
        });
    };

    const selectSkill = (skill) => {
        setSelectedSkills(prevSkills => [...prevSkills, { name: skill, rating: null }]);
    };

    const clearSkills = () => {
        setSelectedSkills([]);
    };

    const fetchSkills = async () => {
        try {
            const response = await fetch('http://localhost:1234/skills');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Failed to fetch skills:', error);
            return [];
        }
    };

    const clearSkillsSearch = () => {
        const list = document.getElementById('skillList');
        list.innerHTML = ''; // Clear previous results
    };

    const searchSkills = async () => {
        const input = document.getElementById('skillInput').value.toLowerCase();
        const skills = await fetchSkills();
        const filteredSkills = skills.filter(skill => skill[0].toLowerCase().includes(input));
        displaySkills(filteredSkills);
    };

    const displaySkills = (skills) => {
        const list = document.getElementById('skillList');
        list.innerHTML = ''; // Clear previous results
        skills.forEach(skill => {
            const listItem = document.createElement('button');
            listItem.textContent = skill[0];
            listItem.onclick = () => selectSkill(skill[0]); // Add the skill to the list on click
            list.appendChild(listItem);
        });
    };

    const selectRating = (type, name, rating) => {
        if (type === 'language') {
            setSelectedLanguages(prevLanguages =>
                prevLanguages.map(lang =>
                    lang.name === name ? { ...lang, rating } : lang
                )
            );
        } else if (type === 'skill') {
            setSelectedSkills(prevSkills =>
                prevSkills.map(skill =>
                    skill.name === name ? { ...skill, rating } : skill
                )
            );
        }
    };

    const searchUsers = () => {
        const filtered = Object.values(users).filter(user => {
            const userLanguages = user.languages.map(lang => ({
                name: lang.languagename,
                rating: lang.proficiencylevel,
            }));
            const userSkills = user.skills.map(skill => ({
                name: skill.skillname,
                rating: skill.proficiencylevel,
            }));

            const languagesMatch = selectedLanguages.every(selLang =>
                userLanguages.some(userLang =>
                    userLang.name === selLang.name && userLang.rating >= selLang.rating
                )
            );

            const skillsMatch = selectedSkills.every(selSkill =>
                userSkills.some(userSkill =>
                    userSkill.name === selSkill.name && userSkill.rating >= selSkill.rating
                )
            );

            return languagesMatch && skillsMatch;
        });

        setFilteredUsers(filtered);
    };

    const getProficiencyColor = (level) => {
        switch (level) {
            case 5:
                return 'gold';
            case 4:
                return 'silver';
            case 3:
                return 'bronze';
            case 2:
                return '#b3e5fc';
            case 1:
                return '#d1c4e9';
            default:
                return 'white';
        }
    };

    return (
        <div className='containerSearch'>
            <div className='containerOneQuarterSearch'>
                <div className='searcherSearch'>
                    <p>Idiomas</p>
                    <input type="text" id="languageInput" placeholder='p.ej: Spanish' />
                    <button className="searcherSearchBtn" onClick={searchLanguages}>Buscar</button>
                    <button className="searcherSearchBtnClear" onClick={clearLanguagesSearch}>Limpiar</button>
                    <ul id="languageList"></ul>
                </div>
                <div className='searcherSearch'>
                    <p>Skills</p>
                    <input type="text" id="skillInput" placeholder='p.ej: C++' />
                    <button className="searcherSearchBtn" onClick={searchSkills}>Buscar</button>
                    <button className="searcherSearchBtnClear" onClick={clearSkillsSearch}>Limpiar</button>
                    <ul id="skillList"></ul>
                </div>
            </div>
            <div className='containerThreeQuarterSearch'>
                <div className='searchResults'>
                    <div className='searchResultsContainer'>
                        <p>Idiomas elegidos:</p>
                        <ul>
                            {selectedLanguages.map((language, index) => (
                                <li key={index} className='languageItem'>
                                    {language.name}
                                    <div className='ratingButtons'>
                                        {[1, 2, 3, 4, 5].map(number => (
                                            <button
                                                key={number}
                                                className='ratingButton'
                                                style={{
                                                    backgroundColor:
                                                        language.rating === number ? '#FF9F1C' : number === 1 ? '#d1c4e9' :
                                                            number === 2 ? '#b3e5fc' : number === 3 ? '#ffcc80' :
                                                                number === 4 ? '#cfd8dc' : '#ffe082'
                                                }
                                            }
                                                onClick={() => selectRating('language', language.name, number)}
                                            >
                                                {number}
                                            </button>
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button className="searchResultsBtnClear" onClick={clearLanguages}>Borrar Idiomas</button>
                    </div>
                    <div className='searchResultsContainer'>
                        <p>Skills elegidas:</p>
                        <ul>
                            {selectedSkills.map((skill, index) => (
                                <li key={index} className='languageItem'>
                                    {skill.name}
                                    <div className='ratingButtons'>
                                        {[1, 2, 3, 4, 5].map(number => (
                                            <button
                                                key={number}
                                                className='ratingButton'
                                                style={{
                                                    backgroundColor:
                                                        skill.rating === number ? '#FF9F1C' : number === 1 ? '#d1c4e9' :
                                                            number === 2 ? '#b3e5fc' : number === 3 ? '#ffcc80' :
                                                                number === 4 ? '#cfd8dc' : '#ffe082'
                                                }}
                                                onClick={() => selectRating('skill', skill.name, number)}
                                            >
                                                {number}
                                            </button>
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button className="searchResultsBtnClear" onClick={clearSkills}>Borrar Skills</button>
                    </div>
                </div>
                <div className='searchResultsContainer'>
                    <button className="searchMainBtn" onClick={searchUsers}>Buscar Usuarios</button>
                    <ul className='userList'>
                        {filteredUsers.map((user, index) => (
                            <li key={index} className='userItem'>
                                <div className='userCard'>
                                    <div className='userInfo'>
                                        <p>{user.name} {user.surname}</p>
                                    </div>
                                    <div className='userSkills'>
                                        <div className='userLanguages'>
                                            <p className='mt'>Idiomas</p>
                                            <div className='skillsContainer'>
                                                {user.languages.map((lang, i) => (
                                                    <div 
                                                        key={i} 
                                                        className='skillItem' 
                                                        style={{ backgroundColor: getProficiencyColor(lang.proficiencylevel) }}
                                                    >
                                                        {lang.languagename}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className='userMainSkills'>
                                            <p>Main Skills</p>
                                            <div className='skillsContainer'>
                                                {user.skills.map((skill, i) => (
                                                    <div 
                                                        key={i} 
                                                        className='skillItem' 
                                                        style={{ backgroundColor: getProficiencyColor(skill.proficiencylevel) }}
                                                    >
                                                        {skill.skillname}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='userActions'>
                                        <button className='userActionBtn'>Ver tarjeta</button>
                                        <button className='userActionBtn'>Conectar</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            
        </div>
    );
}





{/* <ul className='resultList'>
                        {filteredUsers.map((user, index) => (
                            <div className='resultContainer'>
                                <li key={index}>
                                <div className='resultDiv'>
                                    <div className='resultDiv1'>
                                        <p>{user.name} {user.surname}</p>
                                    </div>
                                    <div className='resultDiv2'>
                                        <ul>
                                            <div className='resultDiv2Container'>
                                                <div className='resultDiv2Content1'>
                                                    <li>Idiomas</li>
                                                    <div className='resultContent'>
                                                    {user.languages.map((lang, i) => (
                                                        <li key={i}>{lang.languagename} - Nivel: {lang.proficiencylevel}</li>
                                                    ))}
                                                    </div>
                                                </div>
                                                <div className='resultDiv2Content2'>
                                                    <li>Skills</li>
                                                    {user.skills.map((skill, i) => (
                                                        <li key={i}>{skill.skillname} - Nivel: {skill.proficiencylevel}</li>
                                                    ))}
                                                </div>
                                            </div>
                                        </ul>
                                    </div>
                                    <div className='resultDiv3'>
                                        <button>Hol</button>
                                        <button>Hol</button>
                                    </div>
                                </div>
                                </li>
                            </div>  
                        ))}
                    </ul> */}