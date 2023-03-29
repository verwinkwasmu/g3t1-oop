import WithoutNav from './components/WithoutNav';
import WithNav from './components/WithNav';
import Archive from './components/Archive'


import NavBar from './components/NavBar';

import Login from './components/Login';
import HomeDash from './components/HomeDash';

import WorkflowDash from './components/Admin/Workflows/WorkflowDash';
import FormDash from './components/Admin/FormDash';
import AccountDash from './components/Admin/Accounts/AccountDash';
import AccountView from './components/Admin/Accounts/AccountView';
import WorkflowTemplateView from './components/Admin/Workflows/WorkflowTemplateView';
import WorkflowAssignedView from './components/Admin/Workflows/WorkflowAssignedView';
import WorkflowView from './components/Admin/Workflows/WorkflowView';


import ApproverDash from './components/Approver/ApproverDash';

import CreateQuestionnaire from './components/Admin/Questionnaires/CreateQuestionnaire';
import ViewAllQuestionnaires from './components/Admin/Questionnaires/ViewAllQuestionnaires';
import EditQuestionnaire from './components/Admin/Questionnaires/EditQuestionnaire';
import ViewIndivQuestionnaire from './components/Admin/Questionnaires/ViewIndivQuestionnaire';

import VendorEditQuestionnaire from './components/Vendor/Questionnaires/VendorEditQuestionnaire';

import Profile from './components/Profile';

import useToken from './useToken';

import { Route, Routes } from "react-router-dom";

function App() {
  const { token, setToken } = useToken();

  console.log(token)

  if (!token) {
    console.log("token not found")
    return <Login setToken={setToken}/>
  }

  return (
    <div>
      <Routes>
        <Route element={<WithNav />}>
          <Route path="/" element={<HomeDash />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/archive" element={<Archive />} />


          <Route path="/workflows" element={<WorkflowDash />} />

          <Route path="/accounts" element={<AccountDash />} />
          {/* <Route path="/accounts/id" element={<AccountView />} /> */}
          <Route path="/workflow-templates/:id" element={<WorkflowTemplateView />} />
          <Route path="/workflow-assigned/:id" element={<WorkflowAssignedView />} />
          {/* <Route path="/accounts/:accountid" element={<AccountView />} /> */}

          <Route path="/accounts" element={<AccountDash />} />
          <Route path="/accounts/:id" element={<AccountView />} />
          {/* <Route path="/accounts/:accountid" element={<AccountView />} /> */}
          <Route path="/accounts/:id" element={<AccountView />}/>
          <Route path="/approvals" element={<ApproverDash />}/>
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/questionnaires/create-questionnaire" element={<CreateQuestionnaire/>}/>
          <Route path="/questionnaires/view-all-questionnaires" element={<ViewAllQuestionnaires/>}/>
          <Route path="/questionnaires/edit-questionnaire/:id" element={<EditQuestionnaire/>}/>
          <Route path="/questionnaires/view-indiv-questionnaire/:id" element={<ViewIndivQuestionnaire/>}/>

          <Route path="/vendor/questionnaires/edit-questionnaire/:id" element={<VendorEditQuestionnaire/>}/>




        </Route>
        
      </Routes>
    </div>

  );
}

export default App;

