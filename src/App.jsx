import Home from "./pages/Home/Home"
import Login from './pages/Login/Login'
import { BrowserRouter,Routes,Route } from "react-router-dom"
import List from './pages/List/List'
import Register from './pages/Register/Register'
import Single from './pages/Single/Single'
import New from './pages/New/New'
import {userInputs,productInputs} from './formSource'
const App = () => {
  const user = true;

  return (
    <div className="app dark">
      <BrowserRouter>
      <Routes>
        <Route path="/">
        <Route index element={user ? <Home />:<Register/>} />
        <Route path="login" element={<Login />} />
        <Route path="/users">
          <Route index element={user ? <List/> :<Register/>} />
          <Route path=":userId" element={user ? <Single/>:<Register/>} />
          <Route path="new" element={<New inputs={userInputs} title='Add New User'/>} />
        </Route>
        <Route path="products">
          <Route index element={user ? <List/> :<Register/>} />
          <Route path=":productId" element={user ? <Single/> :<Register/>} />
          <Route path="new" element={user ? <New inputs={productInputs} title='Add New Product'/>:<Register/>} />
        </Route>

        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App