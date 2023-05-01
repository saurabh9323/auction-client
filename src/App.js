import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Ad from "./components/Ad";
import AdForm from "./components/AdForm";
import Nav from "./components/Nav";
import Dashboard from "./components/Dashboard";
// Actions
import { loadUser } from "./actions/auth";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import Payment from "./components/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51HSPwlCBwfrNhRYnFrdEPybc9iBj3vee9UL4OyXEL3VAeUoElw6YCtGGUnKU0AGRFzsuhibB92wWCbqYSiyRhaG8007Wszha7P"
);

function App() {
  // Load user
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ads/:adId" element={<Ad />} />
          <Route path="/postad" element={<AdForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/payment" element={<Elements stripe={promise}>
              <Payment />
            </Elements>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
