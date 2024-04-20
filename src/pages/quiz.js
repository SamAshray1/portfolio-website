import React, { useState, useEffect } from "react";

function Quiz() {
  const [data, setData] = useState(null);
  const [randomKeys, setRandomKeys] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("https://test.com/references/get-verse-list")
      .then((response) => response.json())
      .then((json) => {
        console.log("Fetched data:", json); // Check the structure of the fetched data
        setData(json);
        if (json !== null) {
          const keys = []
          for( let i=0; i<json.length; i++){
            console.log("test", Object.keys(json[i]));
            keys.push(Object.keys(json[i]));
          }
          // const keys = Object.keys(json);
          console.log("Keys:", keys); // Check the keys array
          const shuffledKeys = shuffleArray(keys);
          console.log("Shuffled keys:", shuffledKeys); // Check the shuffled keys array
          setRandomKeys(shuffledKeys);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleNextKey = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % randomKeys.length);
  };

  return (
    <div>
      {data && randomKeys.length > 0 && (
        <div>
          <h2>{String(randomKeys[currentIndex]).toUpperCase()}</h2>
          <button onClick={handleNextKey}>Next Key</button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
