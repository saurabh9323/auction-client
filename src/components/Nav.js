import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
// // Material UI Componeents
import { Button, /*Link*/ } from '@mui/material';
// // Files
import './css/nav.css';
import logo from '../images/nav-bar-banner.png';
// // Actions
import { logout } from '../actions/auth';

//import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import NavDropdown from 'react-bootstrap/NavDropdown';

const Navinger = (props) =>{
 return (
   <Navbar bg="light" bgcol expand="lg">
     <Container fluid>
       <Navbar.Brand href="#">
       <RouterLink to='/'>
           <img className='nav__icon' src={logo} alt='navicon' href='/' />
         </RouterLink>
       </Navbar.Brand>
       <Navbar.Toggle aria-controls="navbarScroll" />
       <Navbar.Collapse id="navbarScroll">
       {props.isAuth && (
         <div className='nav__buttons'>
         <Nav
           className="me-auto my-2 my-lg-0"
           style={{ maxHeight: '100px' }}
           
         >
          
            <RouterLink to='/' style={{ textDecoration: 'none' }}>
             <Button>Home</Button>
           </RouterLink>
           <RouterLink to='/dashboard' style={{ textDecoration: 'none' }}>
             <Button>Dashboard</Button>
           </RouterLink>
           <RouterLink to='/postad' style={{ textDecoration: 'none' }}>
             <Button>Post Ad</Button>
           </RouterLink>
           </Nav>
            </div>
       )}
           
         
     <div className='nav__group2'>
       <div className='nav__account'>
         {props.isAuth ? (
           <Nav.Link
             href='#'
             color='inherit'
             onClick={props.logout}
             sx={{ textDecoration: 'none' }}
           >
             Logout
           </Nav.Link>
         ) : (
           <Nav.Link to='/login' sx={{ textDecoration: 'none' }}>
             Login
           </Nav.Link>
         )}
       </div>
     </div>
       </Navbar.Collapse>
     </Container>
   </Navbar>
 );
}
const mapStateToProps = (state) => ({
 isAuth: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { logout })(Navinger);










































// import Nav from 'react-bootstrap/Nav';

// const Navinger = (props) => {
//   return (
//     <Nav className="justify-content-center">
//     <div className='nav' style={{backgroundColor: "lightblue"}}>
//       <div className='nav__group1'>
//         <div className='nav__image-container'>
         // <RouterLink to='/'>
         //   <img className='nav__icon' src={logo} alt='navicon' href='/' />
         // </RouterLink>
//         </div>

       // {props.isAuth && (
       //   <div className='nav__buttons'>
        
       //     <RouterLink to='/' style={{ textDecoration: 'none' }}>
       //       <Button>Home</Button>
       //     </RouterLink>
       //     <RouterLink to='/dashboard' style={{ textDecoration: 'none' }}>
       //       <Button>Dashboard</Button>
       //     </RouterLink>
       //     <RouterLink to='/postad' style={{ textDecoration: 'none' }}>
       //       <Button>Post Ad</Button>
       //     </RouterLink>
       //   </div>
       // )}
//       </div>

//       <div className='nav__group2'>
//         <div className='nav__account'>
//           {props.isAuth ? (
//             <Link
//               href='#'
//               color='inherit'
//               onClick={props.logout}
//               sx={{ textDecoration: 'none' }}
//             >
//               Logout
//             </Link>
//           ) : (
//             <Link to='/login' sx={{ textDecoration: 'none' }}>
//               Login
//             </Link>
//           )}
//         </div>
//       </div>
//     </div>
//     </Nav>
//   );
// };

// const mapStateToProps = (state) => ({
//   isAuth: state.auth.isAuthenticated,
// });

// export default connect(mapStateToProps, { logout })(Navinger);