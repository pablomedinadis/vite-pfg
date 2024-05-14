import './Main.css'
import React, { useState } from 'react';

export function SearchMenu() {
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);

    const selectLanguage = (language) => {
        setSelectedLanguages(prevLanguages => [...prevLanguages, { name: language, rating: null }]);
    }

    const clearLanguages = () => {
        setSelectedLanguages([]);
    }

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
    }

    const clearLanguagesSearch = async () => {
        const list = document.getElementById('languageList');
        list.innerHTML = ''; // Clear previous results
    }

    const searchLanguages = async () => {
        const input = document.getElementById('languageInput').value.toLowerCase();
        const languages = await fetchLanguages();
        const filteredLanguages = languages.filter(lang => lang[0].toLowerCase().includes(input));
        displayLanguages(filteredLanguages);
    }

    const displayLanguages = (languages) => {
        const list = document.getElementById('languageList');
        list.innerHTML = ''; // Clear previous results
        languages.forEach(language => {
            const listItem = document.createElement('button');
            listItem.textContent = language[0];
            listItem.onclick = () => selectLanguage(language[0]); // Add the language to the list on click
            list.appendChild(listItem);
        });
    }

    const selectSkill = (skill) => {
        setSelectedSkills(prevSkills => [...prevSkills, { name: skill, rating: null }]);
    }

    const clearSkills = () => {
        setSelectedSkills([]);
    }

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
    }

    const clearSkillsSearch = async () => {
        const list = document.getElementById('skillList');
        list.innerHTML = ''; // Clear previous results
    }

    const searchSkills = async () => {
        const input = document.getElementById('skillInput').value.toLowerCase();
        const skills = await fetchSkills();
        const filteredSkills = skills.filter(skill => skill[0].toLowerCase().includes(input));
        displaySkills(filteredSkills);
    }

    const displaySkills = (skills) => {
        const list = document.getElementById('skillList');
        list.innerHTML = ''; // Clear previous results
        skills.forEach(skill => {
            const listItem = document.createElement('button');
            listItem.textContent = skill[0];
            listItem.onclick = () => selectSkill(skill[0]); // Add the skill to the list on click
            list.appendChild(listItem);
        });
    }

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
    }

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
                                                        language.rating === number ? '#000000' : number === 1 ? '#d1c4e9' :
                                                            number === 2 ? '#b3e5fc' : number === 3 ? '#ffcc80' :
                                                                number === 4 ? '#cfd8dc' : '#ffe082'
                                                }}
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
                                                        skill.rating === number ? '#000000' : number === 1 ? '#d1c4e9' :
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
                    <button className='searchMainBtn'>Buscar contactos</button>
                </div>
            </div>
        </div>
    )
}
