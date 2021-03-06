import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import PrivateRoute from './Routes/PrivateRoute'
import AuthenticatedRoute from './Routes/AuthenticatedRoute'
import './main.css'

// components
import Header from './components/Utils/Nav/Header'
import App from './App'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
import Logout from './components/Auth/Logout'
import Profile from './components/UserProfile/Profile'
import GalleryHome from './components/Gallery/GalleryHome'
import UploadHome from './components/Upload/UploadHome/UploadHome'
import CreateGallery from './components/Gallery/CreateGallery/CreateGallery';
import ImageDetail from './components/ImageGallery/ImageDetail/ImageDetail';
import NotFound from './components/Error/NotFound'


const routing = (
  <Router>
    <Header />
    <Switch>
      <AuthenticatedRoute
        exact
        path='/register'
        component={Register}
      />
      <AuthenticatedRoute
        exact
        path='/login'
        component={Login}
      />

      <PrivateRoute
        exact
        path='/logout'
        component={Logout}
      />
      <PrivateRoute
        exact
        path='/upload'
        component={UploadHome}
      />
      <PrivateRoute
        exact
        path='/create-gallery'
        component={CreateGallery}
      />

      <Route
        exact
        path='/profile/:userId'
        component={Profile}
      />
      <Route
        exact
        path='/image/:imageId'
        component={ImageDetail}
      />
      <Route
        exact
        path='/gallery/:galleryId'
        component={GalleryHome}
      />
      <Route
        exact path='/'
        component={App}>
      </Route>
      <Route
        path='*'
        component={NotFound}
      />

    </Switch>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));