import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'styles/App.css';

const GroupPage2 = () => {
  const [groupList, setGroupList] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null); // 상태 추가
  const navigate = useNavigate(); // 다른 페이지로 이동

  useEffect(() => {
    // 로컬 스토리지에서 그룹 목록 가져오기
    const savedGroups = JSON.parse(localStorage.getItem('groups')) || [];
    setGroupList(savedGroups);
  }, []);

  const handleGroupClick = (group) => {
    // 선택한 그룹의 정보를 상태에 저장
    setSelectedGroup(group);
    
    // 선택한 그룹의 정보를 로컬 스토리지에 저장하고 상세 페이지로 이동
    localStorage.setItem('groupName', group.name);
    localStorage.setItem('members', JSON.stringify(group.members));
    localStorage.setItem('selectedCurrency', group.currency || '');

    navigate('/split-page'); // 상세 페이지로 이동
  };

  return (
    <div style={{ padding: '40px' }}>
      <h1>Saved Groups</h1>
      <ul>
        {groupList.map((group, index) => (
          <li
            key={index}
            style={{ fontSize: '24px', cursor: 'pointer' }}
            onClick={() => handleGroupClick(group)}
          >
            {group.name} {/* 그룹 이름을 적절하게 수정 */}
          </li>
        ))}
      </ul>

      {/* 선택한 그룹 정보 표시 */}
      {selectedGroup && (
        <div style={{ marginTop: '40px' }}>
          <h2>Selected Group Details</h2>
          <h3>Group Name: {selectedGroup.name}</h3>
          <h4>Members:</h4>
          <ul style={{ fontSize: '20px' }}>
            {selectedGroup.members.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
          <h4>Currency: {selectedGroup.currency}</h4>
        </div>
      )}
    </div>
  );
};

export default GroupPage2;