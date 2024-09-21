import React, { useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'styles/App.css';

const GroupNamePage = () => {
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState([]);
  const [memberName, setMemberName] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCurrency, setSelectedCurrency] = useState('');

  // URL에서 그룹 이름을 가져오기
  const existingGroupName = new URLSearchParams(location.search).get('groupName');

  // 그룹 목록 상태
  const [groupList, setGroupList] = useState([]);
  // 로컬 스토리지에서 그룹 목록 가져오기
  useEffect(() => {
    const savedGroups = JSON.parse(localStorage.getItem('groups')) //groups라는 키 이름 사용, 여러 그룹을 배열로 사용하려고,
    //groupList는 현재 메모리에 저장된 그룹 목록, 실제로 localStorage와는 별개
    setGroupList(savedGroups);
  }, []);

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleMemberNameChange = (e) => {
    setMemberName(e.target.value);
  };

  const addMember = (e) => {
    e.preventDefault();
    if (memberName.trim()) {
      setMembers([...members, memberName]);
      setMemberName('');
    }
  };

  // 그룹 생성 버튼 클릭 시 호출
  const handleNextClick = () => {
  // 상태를 로컬 스토리지에 저장

  localStorage.setItem('groupName', groupName);
  localStorage.setItem('members', JSON.stringify(members));
  localStorage.setItem('selectedCurrency', selectedCurrency);

  const newGroup = {
    name: groupName,
    members: members,
    currenct: selectedCurrency,
  };

  // 기존 그룹 목록 가져오기
  const savedGroups = JSON.parse(localStorage.getItem('groups')) || [];
  savedGroups.push(newGroup); //새로운 그룹 추가
  localStorage.setItem('groups', JSON.stringify(savedGroups));

  // 그룹 목록 업데이트
  setGroupList(savedGroups);

  //그룹 페이지로 이동
    navigate('/group-page'); 
  };

  // Currency 데이터
  const currencies = [
    { id: 1, name: 'Dollar' },
    { id: 2, name: 'Pound' },
    { id: 3, name: 'Yen' },
    // 다른 화폐 데이터 추가
  ];

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Group Name</h1>
      <input
        type="text"
        placeholder="Great Cucumber"
        value={groupName}
        onChange={handleGroupNameChange}
      />
      <h1>{existingGroupName ? `그룹: ${existingGroupName}` : 'Member Name'}</h1>
      <form onSubmit={addMember}>
        <input
          type="text"
          placeholder="Heidy"
          value={memberName}
          onChange={handleMemberNameChange}
        />
        <button type="submit" className="submitbutton">Add</button>
      </form>

      <h3 style={{ fontSize: '32px', fontWeight: 'bold' }}>Members</h3>
    <ul>
      {members.map((member, index) => (
        <li key={index} style={{ fontSize: '24px' }}> {/* 멤버 이름의 폰트 크기를 24px로 설정 */}
          {member}
        </li>
      ))}
    </ul>

      {/* Select Box 추가 */}
      <h3 style={{ fontSize: '32px', fontWeight: 'bold' }}>Currency Selection</h3>
      <div className="dropdown-container">
        <select value={selectedCurrency} onChange={handleCurrencyChange} aria-label="Currency Selection">
          <option value="" disabled>Choose</option>
          {currencies.map((currency) => (
            <option key={currency.id} value={currency.name}>
              {currency.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ whiteSpace: 'pre-line', margin: '40px' }}>
        <button onClick={handleNextClick} className="button">
            Create a Group
            </button>
      </div>
    </div>
  );
};

export default GroupNamePage;