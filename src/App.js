import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

// Routes & redirect:
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';

// Redux:
import {connect} from 'react-redux';

// Additional:
import Auxiliary from './hoc/Auxiliary/Auxiliary';
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

// Containers & Components:
import Layout from './hoc/Layout/Layout';
// import Students from "./containers/Students";


// Lazy Containers & Components:
const Students = asyncComponent(() => import("./containers/Students"));

class App extends Component {

  render() {
      let routes = (
          <Switch>
              <Route path={"/students"} component={Students}/>
              {/*<Route path={"/"} exact component={Students}/>*/}
              {/*<Redirect to={"/"}/>*/}
          </Switch>
      );

    return (
        <Auxiliary>
            <Layout>
                {routes}
                {/*<Switch>*/}
                {/*    <Route path={"/checkout"} component={Checkout}/>*/}
                {/*    <Route path={"/orders"} component={Orders}/>*/}
                {/*    <Route path={"/auth"} component={Auth}/>*/}
                {/*    <Route path={"/logout"} component={Logout}/>*/}
                {/*    <Route path={"/"} component={BurgerBuilder}/>*/}
                {/*</Switch>*/}
            </Layout>
        </Auxiliary>
    );
  }

}

// export default App;

export default withRouter(connect(null, null)(App));
