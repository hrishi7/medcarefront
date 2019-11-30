import React, {Fragment,useEffect} from 'react'
import { makeStyles, Paper, Container, Grid, Chip, Divider, Typography } from "@material-ui/core/";

import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import {getOrdersAction} from '../redux'

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

const MyOrder = () => {
    const classes = useStyles();

    const state = useSelector(state=>state);
    const dispatch = useDispatch();
    useEffect(async()=>{
        //get orders from backend api
        if(state.user.isAuthenticated && state.user.role ==='user'){}
        let user = jwt_decode(state.user.token)
        let orders = await axios.get(`http://localhost:5000/api/v1/orders/${user.email}`);
        dispatch(getOrdersAction(orders.data));
    },[])
  return (
    <>
      <center>List Out all Orders</center>
      <Fragment>
      <br />
      <Container>
        <Grid container spacing={2}>

          <Grid item xs={12} md={12}>
            <Paper className={classes.cart}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Chip variant="outlined" color="primary" label={`My Orders (${state.orders.length})`} />
                </Grid>
              </Grid>
              {state.orders.map((i, j) => (
                <Grid container spacing={2} key={j}>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  <Grid item xs={12} md={7}>
                    <Typography color="primary">{i.purpose}</Typography>

                    <Typography variant="body2" color="primary">
                      {`${i.items.length} items`}
                    </Typography>
                    <Chip size="small" label={`₹ ${i.amount}`} color="primary" />
                    <br/><br/>
                    <Typography variant="caption">Delivery Address:  {i.deliveryLocation}</Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                      <Typography variant="caption"> 10 Days of Replacement</Typography>
                      <br/>
                      <Typography variant="caption"> will be Deliver {i.delivery}</Typography>
                      <br/><br/>
                      <Link onClick={()=>alert('cancelation is currently not working')} style={{ textDecoration: "none" }}>
                        <Chip label="Cancel" variant="outlined" />
                    </Link>
                  </Grid>
                </Grid>
              ))}
              <br />

            </Paper>
          </Grid>

        </Grid>
      </Container>
    </Fragment>
    </>
  )
}

export default MyOrder;
