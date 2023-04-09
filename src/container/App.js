import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import TopBar from '../components/TopBar';
import UserSignupPage from '../pages/UserSignupPage';
import UserLoginPage from '../pages/UserLoginPage';
import HomePage from '../pages/HomePage';
import UserPage from '../pages/UserPage';
import PostPage from '../pages/PostPage';
import LanguageSelectorNotLogin from '../components/LanguageSelectorNotLogin';
import TestPage from '../pages/TestPage';

const App = () => {
  const { isLoggedIn } = useSelector((store) => ({ isLoggedIn: store.isLoggedIn }));

  return (
    <div>
      <Router>
        <TopBar />
        <Switch>
          {isLoggedIn && <Route exact path='/' component={HomePage} />}
          {!isLoggedIn && <Route path='/login' component={UserLoginPage} />}
          <Route path='/signup' component={UserSignupPage} />
          <Route path='/user/:username' component={UserPage} />
          <Route path='/posts/:username/:id' component={PostPage}/>
          <Route path='/testpage' component={TestPage} />
          {!isLoggedIn && <Redirect to='/login' />}
          {isLoggedIn && <Redirect to='/' />}
        </Switch>
        {!isLoggedIn && <LanguageSelectorNotLogin />}
      </Router>
    </div>
  );

}


export default App; 