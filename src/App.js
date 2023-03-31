import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import "./api/axiosDefaults";
import SignIpForm from './pages/auth/SignUpForm';

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path='/' render={() => <h1>Homepage</h1>} />
          <Route exact path='/write' render={() => <h1>Write</h1>} />
          <Route exact path='/saved' render={()=> <h1>Reading List</h1>} />
          <Route exact path='/signin' render={()=> <h1>Sign in</h1>} />
          <Route exact path='/signup' render={()=> <SignIpForm /> } />
          <Route render={() => <p>Page not found</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;