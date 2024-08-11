import React, { useState } from "react";
import { MainContent } from "./components/MainContent";
import { Gallary } from "./components/Gallary";
import parrot from './assets/images/background/parrot.png'



function App() {
  const [image, setImage] = useState(parrot)
  const [parrotsMessage1, setParrotsMessage1] = useState("");
  const [parrotsMessage2, setParrotsMessage2] = useState("");
  const [parrotsMessage3, setParrotsMessage3] = useState("");
  const [parrotsMessage4, setParrotsMessage4] = useState("");


  return (
    <div className="App p-4">
      <header className="App-header">
        <div className="flex flex-col items-center">
          <MainContent setImage={setImage} setParrotsMessage1={setParrotsMessage1} setParrotsMessage2={setParrotsMessage2} setParrotsMessage3={setParrotsMessage3} setParrotsMessage4={setParrotsMessage4} />
          <Gallary image={image} parrotsMessage1={parrotsMessage1} parrotsMessage2={parrotsMessage2} parrotsMessage3={parrotsMessage3} parrotsMessage4={parrotsMessage4} />
        </div>
      </header>
    </div>
  );
}

export default App;
