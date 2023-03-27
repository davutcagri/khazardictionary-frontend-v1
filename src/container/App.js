import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import TopBar from '../components/TopBar';
import UserSignupPage from '../pages/UserSignupPage';
import UserLoginPage from '../pages/UserLoginPage';
import HomePage from '../pages/HomePage';
import UserPage from '../pages/UserPage';
import LanguageSelectorNotLogin from '../components/LanguageSelectorNotLogin';
import TestPage from '../pages/TestPage';
import ClubsPage from '../pages/ClubsPage';

const App = () => {
  const { isLoggedIn } = useSelector((store) => ({ isLoggedIn: store.isLoggedIn }));

  return (
    <div>
      <Router>
        <TopBar />
        <Switch>
          {isLoggedIn && <Route exact path='/' component={HomePage} />}
          <Route path='/signup' component={UserSignupPage} />
          {!isLoggedIn && <Route path='/login' component={UserLoginPage} />}
          <Route path='/user/:username' component={UserPage} />
          <Route path='/testpage' component={TestPage} />
          <Route path='/schoolClubs' component={ClubsPage} />
          {!isLoggedIn && <Redirect to='/login' />}
          {isLoggedIn && <Redirect to='/' />}
        </Switch>
        {!isLoggedIn && <LanguageSelectorNotLogin />}
      </Router>
    </div>
  );

}


export default App; 