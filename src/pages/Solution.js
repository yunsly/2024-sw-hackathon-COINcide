import React, { useEffect, useState } from 'react';
import 'styles/App.css'

const Solution = () => {
  const [payer, setPayer] = useState('');
  const [settlementDetails, setSettlementDetails] = useState([]);
  const [splitResults, setSplitResults] = useState([]);

  // 로컬 스토리지에서 데이터를 가져오기
  useEffect(() => {
    const savedPayer = localStorage.getItem('payer');
    const savedSplitResults = JSON.parse(localStorage.getItem('splitResults'));
    const savedDetails = JSON.parse(localStorage.getItem('settlementDetails')) || [];
    setSettlementDetails(savedDetails);
    setSplitResults(savedSplitResults || []);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Settlement Details</h1>
        <ul>
          {settlementDetails.map((detail, index) => (
            <li key={index}>
              {detail.member}: ${detail.balance}
            </li>
          ))}
        </ul>

      <h1>Who Owes What?</h1>
        <ul>
          {splitResults.length > 0 ? (
            splitResults
              .filter((result) => result.member !== payer) // 지불자가 자기 자신에게 송금하는 것은 제외
              .map((result, index) => (
                  <li key={index} style={{ fontSize: '24px', marginBottom: '10px' }}>
                  {result.member} → {payer}: ${result.amountOwed}
                </li>
              ))
          ) : (
            <li>No split information available.</li>
          )}
        </ul>
    </div>
  );
};

export default Solution;