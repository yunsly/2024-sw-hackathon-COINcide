import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'styles/App.css';

const StartPage = () => {
  const navigate = useNavigate(); //다른 페이지로 이동

  const handleStartClick = () => { //'시작' 버튼이 클릭되면 호출됨
    navigate('/group-name'); //navigate 함수를 이용해 /group-name 경로로 이동

  };

  return (
    <div style={{ padding: '18px', textAlign: 'center' }}>
    <h1 style={{ fontSize: '60px' }}>COINcide</h1>
      <h2>Calculate the simplest bill-splitting method</h2>
      <div style={{ whiteSpace: 'pre-line', margin: '100px' }}></div>
      <button onClick={handleStartClick} className="button">
  Get started
</button>
    </div>
  );
};

export default StartPage;