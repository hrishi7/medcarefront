import React, { Fragment, useContext, useEffect, useState } from "react";

import { makeStyles, Paper, Container, IconButton, Grid, Chip, Divider, Typography } from "@material-ui/core/";
import { FaMapMarkerAlt, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import { removeFromCartAction } from "../redux";
const useStyles = makeStyles(theme => ({
  cart: {
    padding: "10px"
  },
  itemImg: {
    width: "135px",
    height: "126px",
    borderRadius: 10
  }
}));

export default function Cart() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let state = useSelector(state=>state)
  useEffect(() => {
    totalSum();
  }, [state.cart]);
  const [itemPrice, setItemPrice] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(50);
  const [total, setTotal] = useState(0);

  const totalSum = () => {
    let price = 0;
    let item = state.cart;
    item.map(i => (price += +i.discountedPrice));
    if (price > 500) {
      setDeliveryFee(0);
    }
    setItemPrice(price);
    setTotal(price + deliveryFee);
  };
  const handleRemove = (id, j) => {
    if (id) {
      dispatch(removeFromCartAction(id))
    }
  };

  const handleOrder = ()=>{
    alert('Ordered');
  }

  return (
    <Fragment>
      <br />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <Paper className={classes.cart}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Chip variant="outlined" color="primary" label={`My Cart (${state.cart.length})`} />
                </Grid>
                <Grid item xs={8}>
                  <Typography align="right" color="primary">
                    <FaMapMarkerAlt /> Deliver to : "45, Tollygunge, Kolkata-40"
                  </Typography>
                </Grid>
              </Grid>
              {state.cart.map((i, j) => (
                <Grid container spacing={2} key={j}>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <img src={i.photo} className={classes.itemImg} alt="Item" />
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <Typography color="primary">{i.name}</Typography>
                    {/* <Typography color="textPrimary" gutterBottom variant="body2">
                      {i.subheader}
                    </Typography> */}
                    {/* <Typography variant="caption" gutterBottom>
                      {i.desc}
                    </Typography> */}
                    <Typography variant="body2" color="primary">
                      {`${i.discountPercent} % Off`}
                    </Typography>
                    <Chip size="small" label={`₹ ${i.discountedPrice}`} color="primary" />
                    <IconButton color="secondary" style={{ float: "right" }} aria-label="delete" size="small" onClick={() => handleRemove(i._id, j)}>
                      <FaTrashAlt />
                    </IconButton>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    {/* <Typography variant="body2"> Delivered till 30 December 19</Typography> */}
                    <Typography variant="caption"> 10 Days of Replacement</Typography>
                  </Grid>
                </Grid>
              ))}
              <br />
              <center>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Chip label="Continue Shoping" variant="outlined" />
                </Link>
              </center>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper className={classes.cart}>
              <Typography variant="subtitle2">PRICE DETAILS</Typography>
              <br />
              <Divider />
              <br />
              <Grid container>
                <Grid item xs={6}>
                  <Typography color="primary">Subtotal ({state.cart.length} item) :</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right" color="secondary">
                    {`₹ ${itemPrice}`}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography color="primary">Delivery Fee :</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right" color="secondary">
                    {`₹ ${deliveryFee}`}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <br />
                  <Divider />
                  <br />
                </Grid>
                <Grid item xs={6}>
                  <Typography color="primary">Total Payable :</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right" color="secondary">
                    {`₹ ${total}`}
                  </Typography>
                </Grid>
              </Grid>
              <br />
              <center>
                {/* <Link style={{ textDecoration: "none" }} to='/' onClick={handleOrder}> */}
                  <Chip label="Pay Now" color="primary" onClick={handleOrder} />
                {/* </Link> */}
              </center>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}



