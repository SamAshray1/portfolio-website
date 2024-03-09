import {useState, useEffect} from 'react';
import AddVerseForm from './addVerseForm';
import Quiz from './quiz';

function BibleApp(){
    const [data, setData] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showQuiz, setQuiz] = useState(false);

    const handleClick = () => {
        setShowForm(false);
        setQuiz(false);
        fetch('http://localhost:8080/get-verse-list')
        .then(response => response.json())  
        .then(json => {
            setData(json);
            if(data !== null){
                const arrayDataItems = data.map((item, index) => (<p key={`verse-${index}`}>{item[Object.keys(item)[0]]}</p>))
                console.log("test", JSON.stringify(arrayDataItems,1,null));
                setData(json);
                }
        })
        .catch(error => console.error(error));
    }
    

    const handleButtonClick = () => {
        setData(null);
        setShowForm(true);
        setQuiz(false);
      };

    
      const handleSubmit = (formData) => {
        console.log('Form data submitted:', formData);
        // Handle form submission here, e.g., send it to the server
      };

    const handleQClick = () =>{
        setData(null);
        setShowForm(false);
        setQuiz(true);
    }

    return(<div className="bible-app">
        <h1>Bible Memorization App</h1>
        <div className="options">
            <button onClick={handleClick} className="option-button">View Verses</button>
            <button onClick={handleButtonClick} className="option-button">Add Verses</button>
            <button onClick={handleQClick} className="option-button">Quiz</button>
        </div>
        {data && (<div>{data.map((item, index) => (<p key={`verse-${index}`}><b>{Object.keys(item)[0]}</b> - {item[Object.keys(item)[0]]}</p>))}</div>)}
        {showForm && <AddVerseForm onSubmit={handleSubmit} />} {/* Render the form component */}
        { showQuiz && <Quiz />}

    </ div>)
}

export default BibleApp;