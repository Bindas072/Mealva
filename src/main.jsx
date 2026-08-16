import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router-dom";
import {createRoutesFromElements, RouterProvider,Route} from 'react-router-dom'
import Home from './Components/Home/Home.jsx';
import Features from './Components/Features/Features.jsx';
import About from './Components/About/About.jsx';
import Contact from './Components/Contact/Contact.jsx';
import Login from './Components/Login/Login.jsx';
import Signup from './Components/Signup/Signup.jsx';
import VerifyOtp from './Components/VerifyOTP/VerifyOtp.jsx';
import Dashboard from './Components/Dashboard/Dashboard.jsx';
import JustLayout from './Components/JustLayout.jsx';
import Orderpage from './Components/Orderpage/Orderpage.jsx';
import BannerFood from './Components/BannerFood/Bannerfood.jsx';
const routes = createRoutesFromElements(
  <> 
  
   <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="features" element={<Features />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="verify-otp" element={<VerifyOtp />} />

    </Route>

    <Route element={<JustLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="orderpage" element={<Orderpage />} />
            <Route path="bannerfood" element={<BannerFood />} />
            <Route path="orderpage" element={<Orderpage />} />
    </Route>
    </>  
  
   
  )

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router ={router}/>
    
  </StrictMode>,
)
