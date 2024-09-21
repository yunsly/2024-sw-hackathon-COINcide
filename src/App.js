import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'styles/App.css'
import StartPage from 'pages/StartPage';
import GroupNamePage from 'pages/GroupNamePage';
import GroupPage from 'pages/GroupPage'
import GroupPage2 from 'pages/GroupPage2'
import Split from 'pages/Split'
import Solution from 'pages/Solution'

const App = () => {
  return (
    <Router>
      <div className="App">
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/group-name" element={<GroupNamePage />} />
        <Route path="/group-page" element={ <GroupPage />} />
        <Route path="/group-page2" element={ <GroupPage2 />} />
        <Route path="/split-page" element={ <Split />} />
        <Route path="/solution-page" element={ <Solution />} />
      </Routes>
      </div>
    </Router>
  );
};

export default App;