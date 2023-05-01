import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
// Styling
import "./css/home.css";
// Components
import Board from "./Board";
import Alert from "./Alert";
import { Container, Grid } from "@mui/material";

const Home = (props) => {
  // Check if user is logged
  if (!props.isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <Container maxWidth="md" sx={{ p: 2 }}>
      {/* <div className='nav__display'>
        <Nav />
      </div> */}
      <div className="alert__display">
        <Alert />
      </div>

      <Board />
    </Container>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Home);
