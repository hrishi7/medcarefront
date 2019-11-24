import React, { useContext, useEffect } from "react";
import "./App.css";
import Footer from "./components/Footer";
import PropTypes from "prop-types";
import { makeStyles, CssBaseline, Slide, InputBase, Badge, useScrollTrigger, AppBar, Button, Toolbar, IconButton } from "@material-ui/core/";
import { fade } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import MainRoute from "./components/MainRoute";
import { IoIosLogIn,IoIosLogOut,IoIosPerson } from "react-icons/io";
import { FaMicrophone, FaSearch, FaCloudUploadAlt, FaShoppingCart, FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import {store, logoutUserAction} from "./redux";
import { CartContext } from "./components/CartContext";

import SearchBar from './components/SearchBar'

//redux
import {useDispatch,useSelector} from 'react-redux'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  logo: {
    maxwidth: "160px",
    maxHeight: "50px"
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 0
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  toolbar: theme.mixins.toolbar,
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade("#005aff", 0.15),
    "&:hover": {
      backgroundColor: fade("#005aff", 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  margin: {
    paddingTop: theme.spacing(2)
  },
  anchor: {
    textDecoration: "none"
  }
}));

function App(props) {
  let state = useSelector(state=>state)
  const dispatch = useDispatch();
  const classes = useStyles();
  const { item } = useContext(CartContext);
  const handleMic = () => {
    alert("Listening...");
  };
  const uploadFile = () => {
    alert("Upload your preciption here.");
  };
  const handleLogout = () =>{
    dispatch(logoutUserAction());
  }

  return (
    <div>
    <CssBaseline />
    <HideOnScroll>
    <AppBar color="default">
    <Toolbar>
    <Link to="/">
    <img src="https://i.ibb.co/0Vt1xdd/logo.png" alt="logo" className={classes.logo} />
    </Link>
    <div className={classes.grow} />
    <div className={classes.search}>
    <SearchBar/>
    </div>
    <IconButton color="primary" onClick={handleMic}>
    <FaMicrophone />
    </IconButton>
    <IconButton color="primary" onClick={uploadFile}>
    <FaCloudUploadAlt />
    </IconButton>
    <div className={classes.grow} />

    {/* navigation for unauthorized users */}
    {!state.isAuthenticated?(
      <div>
      {/* <Link to="/register" className={classes.anchor}> */}
      <Button color="primary" className="font" onClick={()=>window.location.href = '/register'}>
      Register
      </Button>
      {/* </Link> */}
      {/* <Link to="/login" className={classes.anchor}> */}
      <IconButton color="primary" onClick={()=>window.location.href = '/login'}>
      <IoIosLogIn />
      </IconButton>
      {/* </Link> */}
      {/* <Link to="/cart" className={classes.anchor}> */}
      <IconButton color="primary" onClick={()=>window.location.href = '/cart'}>
      <Badge badgeContent={state.cart.length} color="secondary">
      <FaShoppingCart />
      </Badge>
      </IconButton>
      {/* </Link> */}
      </div>
      ):(
        (state.user.role === 'user')  && (
          <div>
          {/* <Link to="/notification" className={classes.anchor}> */}
          <IconButton color="primary" onClick={()=>window.location.href = '/notification'}>
          <FaBell />
          </IconButton>
          {/* </Link> */}
          {/* <Link to="/user-profile" className={classes.anchor}> */}
          <IconButton color="primary" onClick={()=>window.location.href = '/user-profile'}>
          <IoIosPerson />
          </IconButton>
          {/* </Link> */}
          <IconButton color="primary" onClick={()=>window.location.href = '/cart'}>
      <Badge badgeContent={state.cart.length} color="secondary">
      <FaShoppingCart />
      </Badge>
      </IconButton>
          <Link className={classes.anchor} onClick={handleLogout}>
          <IconButton color="primary">
          <IoIosLogOut />
          </IconButton>
          </Link>
          </div>
          ) || state.user.role === 'seller' &&(
            <div>
            <Link to="/notification" className={classes.anchor}>
            <IconButton color="primary">
            <FaBell />
            </IconButton>
            </Link>
            <Link to="/seller-dashboard" className={classes.anchor}>
            <IconButton color="primary">
            Dashboard
            </IconButton>
            </Link>
            <Link className={classes.anchor} onClick={handleLogout}>
            <IconButton color="primary">
            <IoIosLogOut />
            </IconButton>
            </Link>
            </div>
            ) || state.user.role === 'admin' &&(
              <div>
              <Link to="/notification" className={classes.anchor}>
              <IconButton color="primary">
              <FaBell />
              </IconButton>
              </Link>
              <Link to="/admin-dashboard" className={classes.anchor}>
              <IconButton color="primary">
              Dashboard
              </IconButton>
              </Link>
              <Link className={classes.anchor} onClick={handleLogout}>
              <IconButton color="primary">
              <IoIosLogOut />
              </IconButton>
              </Link>
              </div>
              )  || state.user.role === 'deliveryperson' &&(
                <div>
                <Link to="/notification" className={classes.anchor}>
                <IconButton color="primary">
                <FaBell />
                </IconButton>
                </Link>
                <Link to="/delivery-dashboard" className={classes.anchor}>
                <IconButton color="primary">
                Dashboard
                </IconButton>
                </Link>
                <Link className={classes.anchor} onClick={handleLogout}>
                <IconButton color="primary">
                <IoIosLogOut />
                </IconButton>
                </Link>
                </div>
                )
                )}
                {/* end code for navigation for unauthorized users */}


                </Toolbar>
                </AppBar>
                </HideOnScroll>
                <main className={classes.content}>
                <div className={classes.toolbar} />
                <MainRoute />
                </main>
                <br />
                <Footer />
                </div>
                );
              }

              function HideOnScroll(props) {
                const { children, window } = props;
                const trigger = useScrollTrigger({ target: window ? window() : undefined });

                return (
                  <Slide appear={false} direction="down" in={!trigger}>
                  {children}
                  </Slide>
                  );
                }

                HideOnScroll.propTypes = {
                  children: PropTypes.node.isRequired,
                  window: PropTypes.func
                };
                export default App;
