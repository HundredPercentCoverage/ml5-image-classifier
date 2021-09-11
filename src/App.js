import './App.css';
import tiger from './tiger.jpg';
import * as ml5 from 'ml5';
import { useState } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [predictions, setPredictions] = useState([]);
  const classifier = ml5.imageClassifier('MobileNet', () => setIsLoading(false));

  const classifyImg = () => {
    const image = document.getElementById('image');

    classifier.predict(image, 5, (err, results) => {
      setPredictions(results);
    });
  }

  return (
    <div className="App">
      <h1>Image classification with ML5.js</h1>
      {isLoading ? (
        <p>Loading model...</p>
      ) : (
        <>
          <button onClick={classifyImg}>Classify</button>
          <img src={tiger} alt="Tiger" id="image" className="image" />
        </>
      )}
      {predictions.length > 0 && (
        <>
          {predictions.map(prediction => (
            <div key={prediction.label}>{prediction.label}</div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
