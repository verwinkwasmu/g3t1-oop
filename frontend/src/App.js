import WithoutNav from './components/WithoutNav';
import WithNav from './components/WithNav';

import NavBar from './components/NavBar';

import Login from './components/Login';
import HomeDash from './components/HomeDash';
import Archive from './components/Archive';
import Profile from './components/Profile';

import WorkflowDash from './components/Admin/Workflows/WorkflowDash';
import FormDash from './components/Admin/FormDash';
import AccountDash from './components/Admin/Accounts/AccountDash';
import AccountView from './components/Admin/Accounts/AccountView';
import WorkflowTemplateView from './components/Admin/Workflows/WorkflowTemplateView';
import WorkflowAssignedView from './components/Admin/Workflows/WorkflowAssignedView';

import CreateForm from './components/Admin/CreateForm';

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
        <Route path="/accounts/:id" element={<AccountView />} />

          <Route path="/accounts" element={<AccountDash />} />
          <Route path="/workflows/:id" element={<WorkflowView />} />
          <Route path="/accounts/:id" element={<AccountView />} />

          <Route path="/forms/create-form" element={<CreateForm />}></Route>


        </Route>
      </Routes>

    </div>

  );
}

export default App;
