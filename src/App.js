import React from 'react';
import { Router, Route, Link, Switch } from "react-router-dom";
import "office-ui-fabric-react/dist/css/fabric.min.css";

import { Fabric, mergeStyles, Nav } from 'office-ui-fabric-react/lib/index';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import logo from './logo.svg';
import './App.css';

import Base from './components/Base';
import AppDispatcher from './actions/AppDispatcher';
import { history } from './util/Util';

const X = () => (<p>Holder</p>);

export default class App extends Base {

  render() {
    return (
      <Fabric className="layout-row layout-justify-center">
        <Router history={ history }>
          <ToastContainer position={toast.POSITION.TOP_RIGHT} id="toast-container" style={{ zIndex: 20000000 }}/>
          <Nav
            onRenderGroupHeader={this.groupHeader}
            onLinkClick={this.onLinkClick}
            linkAs={(a) => { return (<Link to={a.href}>{a.title}</Link>); }}
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
                    name: 'Larry',
                    url: '/larry',
                    linkAs: (<Link to="/larry">Larry</Link>)
                  },
                  {
                    name: 'Moe',
                    url: '/moe',
                    linkAs: (<Link to="/moe">Moe</Link>)
                  },
                  {
                    name: 'Curly',
                    url: '/curly'
                  },
                  {
                    name: 'Shemp',
                    url: '/shemp'
                  }
                ]
              },
            ]}
          />
          <div className="pad10 center-pane layout-scrollable height90">
            <Switch>
              <Route path="/" exact component={X}/>
              <Route path="/larry" component={X}/>
              <Route path="/moe" component={X}/>
              <Route path="/curly" component={X}/>
              <Route path="/shemp" component={X}/>
            </Switch>
          </div>
        </Router>
      </Fabric>
    );   
  }
  
  renderX() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }    
}
