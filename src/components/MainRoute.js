import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../Website/Login";
import Home from "../Website/Home";
import Cart from "../Website/Cart";
import OrderPlaced from "../Website/OrderPlaced";
import MyOrder from "../Website/MyOrder";
import Register from "./Register";
import SellerDashboard from "./privateComponents/SellerDashboard";
import AdminDashboard from "./privateComponents/AdminDashboard";
import DeliveryPersonDashboard from "./privateComponents/DeliveryPersonDashboard";
import UserProfile from "./privateComponents/UserProfile";

import PrivateRouteSeller from './privateRoutes/PrivateRouteSeller';
import PrivateRouteUser from './privateRoutes/PrivateRouteUser';
import PrivateRouteDelivery from './privateRoutes/PrivateRouteDelivery';
import PrivateRouteAdmin from './privateRoutes/PrivateRouteAdmin';

function MainRoute() {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/cart" component={Cart} />
    <Switch>
      <PrivateRouteSeller exact path="/seller-dashboard" component={SellerDashboard} />
      </Switch>
      <Switch>
      <PrivateRouteAdmin exact path="/admin-dashboard" component={AdminDashboard} />
      </Switch>
      <Switch>
      <PrivateRouteDelivery exact path="/delivery-dashboard" component={DeliveryPersonDashboard} />
      </Switch>
      <Switch>
      <PrivateRouteUser exact path="/user-profile" component={UserProfile} />
      </Switch>
      <Switch>
      <PrivateRouteUser exact path="/payment-complete" component={OrderPlaced} />
      </Switch>
      <Switch>
      <PrivateRouteUser exact path="/myorder" component={MyOrder} />
      </Switch>

    </div>
  );
}
export default MainRoute;
