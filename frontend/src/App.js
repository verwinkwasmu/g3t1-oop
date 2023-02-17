import NavBar from './components/NavBar';

import MainDash from './components/Admin/MainDash';
import WorkflowDash from './components/Admin/WorkflowDash';
import FormDash from './components/Admin/FormDash';
import UserDash from './components/Admin/UserManagement/UserDash';
import Profile from './components/Profile';


import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<MainDash />} />
        <Route path="/workflows" element={<WorkflowDash />} />
        <Route path="/forms" element={<FormDash />} />
        <Route path="/users" element={<UserDash />} />
        {/* <Route path="/profile" element={<Profile />} /> */}

      </Routes>

    </div>
    
  );
}

export default App;
