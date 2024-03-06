import {useState, useEffect} from 'react';

export default function Projects(){
    const [data, setData] = useState(null);


    useEffect(() =>{
        fetch('http://localhost:8080/get-verse-list')
        .then(response => response.json())
        .then(json => setData(json))
        .catch(error => console.error(error));
    }, []);

    return(
        <div className="projects" id="projects">
            <h1>Projects</h1>
            {/* {data ? <pre>{JSON.stringify(data, null, 2)}</pre>: 'Loading...'} */}
            <div className="project-items">
                <a href="/bible-app"><div className="project-item">
                    <h3>Bible Memorization App</h3>
                </div></a>
                <div className="project-item">
                    <h3>Project #1</h3>
                </div>
                <div className="project-item">
                    <h3>Project #2</h3>
                </div>
            </div>
        </div>
        
    )
}