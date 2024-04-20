import {useState, useEffect} from 'react';
import project1 from '../images/project1.png'
import project2 from '../images/project2.png'

export default function Projects(){

    return(
        <div className="projects" id="projects">
            <h2>Projects</h2>
            <div className="project-items">
                <div>
                <a href="/bible-app" target="_blank">
                    <div className="project-item" style={{ backgroundImage: `url(${project1})`}}>
                        <div className="project-text">
                            <h4>Bible Memorization App</h4>
                        </div> 
                    </div>
                </a>
                <p>#Springboot #REST</p>
                </div>
                <div>
                <a href="https://github.com/SamAshray1/CoronaVirus-Flask_Deployment" target="_blank">
                    <div className="project-item" style={{ backgroundImage: `url(${project2})`}}>
                    <div className="project-text">
                        <h4>Corona Virus Predicter</h4>
                    </div> 
                    </div>
                </a>
                <p>#DataScience #Flask</p>
                </div>
            </div>
        </div>
        
    )
}