import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'styles/App.css';

const GroupPage = () => {
  const navigate = useNavigate(); // 다른 페이지로 이동

  const handleNextClick = () => {
    navigate('/group-page2'); // navigate 함수를 이용해 /group-page2 경로로 이동
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Group created!</h1>
      <h2>Copy the URL of the group page and share it with members via messaging apps.</h2>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ whiteSpace: 'pre-line', margin: '60px' }}>
      <button onClick={handleNextClick} className="button">Go to Group Page</button>
    </div>
    </div>
    </div>
  );
};

export default GroupPage;