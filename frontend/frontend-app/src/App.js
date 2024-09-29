
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';
import CustomerDashboard from './components/CustomerDashboard';
import AdminDashboard from './components/AdminDashboard';
import SignUp from './components/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import Restaurants from './components/Restaurants';
import DishList from './components/DishList';
import AddRestaurant from './components/AddRestaurant';
import ModifyRestaurant from './components/ModifyRestaurant';
import AddDish from './components/AddDish';
import Cart from './components/Cart';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/logout' element={<Logout/>}></Route>
        <Route path='/user' element={<CustomerDashboard/>}></Route>
        <Route path='/admin' element={<AdminDashboard/>}></Route>
        <Route path='/restaurants' element={<Restaurants/>}></Route>
        <Route path='/dishlist' element={<DishList/>}></Route>
        <Route path='/addrestaurant' element={<AddRestaurant/>}></Route>
        <Route path='/modifyrestaurant' element={<ModifyRestaurant/>}></Route>
        <Route path='/adddish' element={<AddDish/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
