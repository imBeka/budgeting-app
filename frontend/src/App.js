import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Registration from './Pages/Registration';

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={ <Dashboard />} />
            <Route path='/login' element={ <Login />} />
            <Route path='/registration' element={ <Registration />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
