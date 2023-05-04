import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import TopBar from '../components/TopBar';
import UserSignupPage from '../pages/UserSignupPage';
import UserLoginPage from '../pages/UserLoginPage';
import HomePage from '../pages/HomePage';
import UserPage from '../pages/UserPage';
import PostPage from '../pages/PostPage';
import LanguageSelectorNotLogin from '../components/LanguageSelectorNotLogin';
import TestPage from '../pages/TestPage';
import AdminPage from '../pages/AdminPage';
import TermsOfUsePage from '../pages/TermsOfUsePage';

const App = () => {
  const [hasAdminRole, setHasAdminRole] = useState(false);

  const { isLoggedIn } = useSelector((store) => ({ isLoggedIn: store.isLoggedIn }));
  const adminRole = useSelector(store => {
    if (store.isLoggedIn) {
      return ({ adminRole: store.roleName.includes('ROLE_ADMIN') });
    }
    return null;
  });


  useEffect(() => {
    if (adminRole !== null) {
      if (adminRole.adminRole) {
        setHasAdminRole(true)
      }
    }
  }, [hasAdminRole]);

  return (
    <div>
      <Router>
        <TopBar />
        <Switch>
          {!isLoggedIn && <Route path='/login' component={UserLoginPage} />}
          {!isLoggedIn && <Route path='/signup' component={UserSignupPage} />}
          
          {hasAdminRole && <Route path='/adminPanel' component={AdminPage} />}

          {isLoggedIn && <Route exact path='/' component={HomePage} />}
          {isLoggedIn && <Route path='/user/:username' component={UserPage} />}
          {isLoggedIn && <Route path='/posts/:username/:id' component={PostPage} />}
          
          <Route path='/termsofuse' component={TermsOfUsePage} />
          
          {!isLoggedIn && <Redirect to='/login' />}
          {isLoggedIn && <Redirect to='/' />}
        </Switch>
        {!isLoggedIn && <LanguageSelectorNotLogin />}
      </Router>
    </div>
  );

}


export default App; 