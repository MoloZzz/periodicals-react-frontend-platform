import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Users from './pages/Users';
import Periodicals from './pages/Periodicals';
import Subscriptions from './pages/Subscriptions';
import Payments from './pages/Payments';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/users" component={Users} />
        <Route path="/periodicals" component={Periodicals} />
        <Route path="/subscriptions" component={Subscriptions} />
        <Route path="/payments" component={Payments} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Routes>
    </Router>
  );
}

export default App;