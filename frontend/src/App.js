import NavBar from './components/NavBar';

import MainDash from './components/Admin/MainDash';
import WorkflowDash from './components/Admin/Workflows/WorkflowDash';
import FormDash from './components/Admin/FormDash';
import AccountDash from './components/Admin/Accounts/AccountDash';
import AccountView from './components/Admin/Accounts/AccountView';
import WorkflowTemplateView from './components/Admin/Workflows/WorkflowTemplateView';
import WorkflowAssignedView from './components/Admin/Workflows/WorkflowAssignedView';


import ApprovalDash from './components/Approver/ApprovalDash';

import CreateQuestionnaire from './components/Admin/Forms/CreateQuestionnaire';
import ViewAllQuestionnaires from './components/Admin/Forms/ViewAllQuestionnaires';
import EditQuestionnaire from './components/Admin/Forms/EditQuestionnaire';
import ViewIndivQuestionnaire from './components/Admin/Forms/ViewIndivQuestionnaire';

import Profile from './components/Profile';


import { Route, Routes } from "react-router-dom";
import ViewWorkflowQuestionnaire from './components/Admin/Workflows/ViewWorkflowQuestionnaire';

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
        <Route path="/workflow-templates/:id" element={<WorkflowTemplateView />} />
        <Route path="/workflow-assigned/:id" element={<WorkflowAssignedView />} />
        {/* <Route path="/accounts/:accountid" element={<AccountView />} /> */}
        <Route path="/accounts/:id" element={<AccountView />} />

        <Route path="/approvals" element={<ApprovalDash />}></Route>

        {/* <Route path="/profile" element={<Profile />} /> */}

        <Route path="/forms/create-questionnaire" element={<CreateQuestionnaire/>}/>
        <Route path="/forms/view-all-questionnaires" element={<ViewAllQuestionnaires/>}/>
        <Route path="/forms/edit-questionnaire/:id" element={<EditQuestionnaire/>}/>
        <Route path="/forms/view-indiv-questionnaire/:id" element={<ViewIndivQuestionnaire/>}/>

        <Route path="/Workflows/ViewWorkflowQuestionnaire/:id" element={<ViewWorkflowQuestionnaire/>}/>

      </Routes>

    </div>

  );
}

export default App;
