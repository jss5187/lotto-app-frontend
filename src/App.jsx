import { useState } from "react";
import "./App.css";

function App() {
    const [numbers, setNumbers] = useState([]);

    const fetchLottoNumbers = async () => {
        try {
            const response = await fetch("https://lotto-app-7qdz.onrender.com/lotto");
            const data = await response.json();
            setNumbers(data.numbers);
        } catch (error) {
            console.error("Error fetching lotto numbers:", error);
        }
    };

    return (
        <div className="container">
            <h1>🎰 로또 번호 추천기</h1>
            <button onClick={fetchLottoNumbers}>번호 받기</button>
            <div className="lotto-numbers">
                {numbers.length > 0 ? numbers.join(", ") : "번호를 받아보세요!"}
            </div>
        </div>
    );
}

export default App;
