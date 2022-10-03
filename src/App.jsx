import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState("");
  const [get, setGet] = useState(null);
  const [change, setChange] = useState(0);

  const API_CAT = "https://catfact.ninja/fact";
  const API_GIPHY = "https://api.giphy.com/v1/gifs/search";
  const API_KEY_GIPHY = "riLThAIxFYE776teUEcwEfU7TbDiGfRA";

  const getGiphy = async (string) => {
    const { data } = await axios.get(
      `${API_GIPHY}?q=${string}&api_key=${API_KEY_GIPHY}`
    );
    setGet(data.data[0].images.original.url);
  };

  useEffect(() => {
    const handleSubmit = async () => {
      const { data } = await axios.get(API_CAT);
      setCount(data.fact);
      console.log(data.fact.split(" ", 3).join(" "));
      getGiphy(data.fact.split(" ", 3).join(" "));
    };
    handleSubmit();
  }, [change]);

  return (
    <div className="App">
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {get && (
          <img
            src={get}
            alt="giphy"
            style={{ width: "200px", height: "200px", objectFit: "contain" }}
          />
        )}
        <p>{count}</p>
      </div>
      <button onClick={() => setChange((change) => change + 1)}>Button</button>
    </div>
  );
}

export default App;
