import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [lottoNumbers, setLottoNumbers] = useState([]);
  const [lastLotto, setLastLotto] = useState({});

  // 로또 번호 가져오는 함수
  const fetchLottoNumbers = async () => {
    try {
      const response = await fetch('https://lotto-app-7qdz.onrender.com/lotto'); // 백엔드 API 주소
      const data = await response.json();
      setLottoNumbers(data.numbers);
    } catch (error) {
      console.error('로또 번호 불러오기 실패:', error);
    }
  };

  const fetchLastLotto = async () => {
    try {
      const response = await fetch("https://lotto-app-7qdz.onrender.com/last-lotto");
      const data = await response.json();
      console.log(data);
      if (data.raw.returnValue === 'success') {
        setLastLotto({
          round: data.raw.drwNo,
          numbers: [
            data.raw.drwtNo1,
            data.raw.drwtNo2,
            data.raw.drwtNo3,
            data.raw.drwtNo4,
            data.raw.drwtNo5,
            data.raw.drwtNo6,
          ],
          bonus: data.raw.bnusNo,
        });
      }
    } catch (error) {
      console.error("지난 로또 번호 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchLastLotto();
  }, []);

  return (
    <div className="container">
      <h1>🎰 로또 번호 추천기</h1>
      <button onClick={fetchLottoNumbers}>번호 추천 받기</button>
      {lottoNumbers.length > 0 && (
        <p className="lotto-numbers">{lottoNumbers.join(', ')}</p>
      )}

       {/* 지난주 로또 번호 표시 */}
       {lastLotto.round && (
        <div className="last-lotto">
          <h2>지난주 로또 ({lastLotto.round}회차)</h2>
          <p className="lotto-numbers">{lastLotto.numbers.join(', ')}</p>
          <p className="bonus-number">보너스 번호: {lastLotto.bonus}</p>
        </div>
      )}
    </div>
  );
}

export default App;
