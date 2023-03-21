import NavBar from './components/NavBar';

import MainDash from './components/Admin/MainDash';
import WorkflowDash from './components/Admin/Workflows/WorkflowDash';
import FormDash from './components/Admin/FormDash';
import AccountDash from './components/Admin/Accounts/AccountDash';
import AccountView from './components/Admin/Accounts/AccountView';
import WorkflowView from './components/Admin/Workflows/WorkflowView';

import CreateForm from './components/Admin/CreateForm';

import ApprovalDash from './components/Approver/ApprovalDash';

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

        <Route path="/accounts" element={<AccountDash />} />
        {/* <Route path="/accounts/id" element={<AccountView />} /> */}
        <Route path="/workflows/id" element={<WorkflowView />} />
        {/* <Route path="/accounts/:accountid" element={<AccountView />} /> */}
        <Route path="/accounts/:id" element={<AccountView />} />

        <Route path="/forms/create-form" element={<CreateForm />}></Route>

        <Route path="/approvals" element={<ApprovalDash />}></Route>

        {/* <Route path="/profile" element={<Profile />} /> */}

      </Routes>

    </div>

  );
}

export default App;
