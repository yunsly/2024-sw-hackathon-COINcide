import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'styles/App.css';

//지불자가 모든 금액 지불, 선택된 멤버들이 분담
//1.전체 비용 나눠서 각 멤버가 지불해야 할 금액 계산
//2.각 멤버가 지불자에게 보내야 할 금액 표시
const Split = () => {
  const [payer, setPayer] = useState('');
  const [payment, setPayment] = useState('');
  const [price, setPrice] = useState('');
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]); // 멤버 체크
  const [settlementDetails, setSettlementDetails] = useState([]); //잔액 세부정보
  //const [splitResults, setSplitResults] = useState([]); //금액 나누기 (로컬에만 저장)
  const navigate = useNavigate();

  // 저장된 멤버 목록 가져오기
  useEffect(() => {
    const savedMembers = JSON.parse(localStorage.getItem('members')) || [];
    setMembers(savedMembers);
  }, []);

  const handlePayerChange = (e) => {
    setPayer(e.target.value);
  };

  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };


  //멤버 체크
  const handleMemberChange = (member) => {
    if (selectedMembers.includes(member)) { //배열에 해당 멤버 있는지 확인, 만약 포함되어 있다면, 해당 멤버는 이미 선택됨 => 체크박스 클릭 시 선택 해제
      setSelectedMembers(selectedMembers.filter((m) => m !== member)); //선택 해제
    } else {
      setSelectedMembers([...selectedMembers, member]);
    }
  };


  // 다음 버튼 클릭
  const handleNextClick = () => {
    //비용 분할 계산
    if (!payer || !price || selectedMembers.length === 0) {
      alert('Payer, price, and members must be selected.');
      return;
    }

    //parseFloat은 부동 소수점 반환 (문자+숫자 받음)
    const amountPerMember = parseFloat(price) / (selectedMembers.length); // 선택된 멤버 

    // 지불할 금액 계산
    const splitResults = selectedMembers.map((member) => ({
      member,
      amountOwed: amountPerMember.toFixed(2), // 소수점 둘째 자리까지 반올림
    }));

    //각 멤버의 잔액 초기화
    const balances = {};

    //지불자에게는 비용이 양수로, 나머지에게는 비용이 음수로 저장
    //존재하면 양수, 존재하지 않으면 (: -parseFloat(price)), 지불한 금액을 음수
    balances[payer] = balances[payer] ? amountPerMember : -amountPerMember

    //selectedMembers 배열 순회, 각 멤버에 대한 잔액 계산
    //존재하면 그 값에 각 멤버가 지불해야 할 금액 더함, 존재하지 않으면 각 멤버가 지불해야 할 금액으로 초기화
    selectedMembers.forEach((member) => {
      balances[member] = balances[member] ? balances[member] +  amountPerMember : amountPerMember; 
    })

    //잔액을 배열로 변환
    const settlementDetailsArray = Object.entries(balances).map(([member, balance]) => ({
      member,
      balance: balance.toFixed(2), // 소수점 둘째 자리까지 반올림
    }));

    //정보 업데이트
    setSettlementDetails(settlementDetailsArray); // 세부정보 업데이트

    // 상태를 로컬 스토리지에 저장
    localStorage.setItem('payer', payer);
    localStorage.setItem('payment', payment);
    localStorage.setItem('price', price);
    localStorage.setItem('selectedMembers', JSON.stringify(selectedMembers));
    localStorage.setItem('splitResults', JSON.stringify(splitResults)); // 계산 결과 저장
    localStorage.setItem('settlementDetails', JSON.stringify(settlementDetailsArray));
    navigate('/solution-page'); // 다음 화면으로 이동
  };


  return (
    <div style={{ padding: '20px' }}>
      <h1>Payer</h1>
      <select value={payer} onChange={handlePayerChange}>
        <option value="" disabled>Select</option>
        {members.map((member, index) => (
          <option key={index} value={member}>
            {member}
          </option>
        ))}
      </select>

      <h1>Payment</h1>
      <input
        type="text"
        placeholder="Payment Description"
        value={payment}
        onChange={handlePaymentChange}
      />

      <h1>Price</h1>
      <input
        type="text"
        placeholder="Amount"
        value={price}
        onChange={handlePriceChange}
      />

      <h1>Select Members for Payment</h1>
      <ul>
        {members.map((member, index) => (
          <li key={index}>
            <label style={{ fontSize: '20px'}}>
              <input
                type="checkbox"
                checked={selectedMembers.includes(member)}
                onChange={() => handleMemberChange(member)}
              />
              {member}
            </label>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ whiteSpace: 'pre-line', margin: '40px' }}>
        <button onClick={handleNextClick} className="button">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Split;