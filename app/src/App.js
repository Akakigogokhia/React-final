import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import AddListing from './components/addListing/AddListing';
import AuthComponent from './components/auth/Auth';
import EstateDetailed from './components/estateDetailed/EstateDetailed';
import MyListings from './components/myListing/MyListings';

function App() {
  return (
    <Router>
      <div className='app'>
        <Header />
        <AuthComponent />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/addListing' element={<AddListing />} />
          <Route path='estate/:id' element={<EstateDetailed />} />
          <Route path='/myListings' element={<MyListings />} />,
          <Route path='*' element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
