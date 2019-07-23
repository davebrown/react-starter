import React from 'react';
import { Router, Route, Link, Switch } from "react-router-dom";
import "office-ui-fabric-react/dist/css/fabric.min.css";
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

import { Fabric, Nav } from 'office-ui-fabric-react/lib/index';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

import Base from './components/Base';
import { history } from './util/Util';
import { ErrorBoundary } from './components/Error';
import Stooges from './components/Stooges';
import Fruits from './components/Fruits';

initializeIcons();

const Home = () => (<div className="layout-column">
  <Link to="/stooges">Stooges</Link>
  <Link to="/fruits">Fruits</Link>
</div>);
export default class App extends Base {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null
    }
  }
  render() {
    const { error, errorInfo } = this.state;
    return (
      <Fabric className="layout-row layout-justify-center">
        <Router history={ history }>
          <ToastContainer position={toast.POSITION.TOP_RIGHT} id="toast-container" style={{ zIndex: 20000000 }}/>
          <Nav
            linkAs={(a) => { return (<Link to={a.href}>{a.title}</Link>); }}
            className="App-nav"
            style={{ width: '900px'}}
            groups={[
              {
                name: 'Home',
                url: '/',
                links: [
                  {
                    name: 'Home',
                    url: '/',
                    linkAs: (<Link to="/">Home</Link>)
                  },
                  {
                    name: 'Stooges',
                    url: '/stooges',
                    linkAs: (<Link to="/stooges">Stooges</Link>)
                  },
                  {
                    name: 'Fruits',
                    url: '/fruits',
                    linkAs: (<Link to="/fruits">Fruits</Link>)
                  },
                ]
              },
            ]}
          />
          <div className="App-center-pane layout-scrollable">
            <ErrorBoundary error={error} info={errorInfo} 
            onClear={() => {this.setState({error: null, errorInfo: null})}}
            >
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/stooges" component={Stooges}/>
              <Route path="/fruits" component={Fruits}/>
            </Switch>
            </ErrorBoundary>
          </div>
        </Router>
      </Fabric>
    );   
  }

  componentDidCatch(err, info) {
    console.log("App.componentDidCatch", err, info);
    this.setState({
      err: err,
      errorInfo: info
    });
  }

}
