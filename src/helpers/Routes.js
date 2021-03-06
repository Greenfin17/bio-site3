import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from '../views/Home';
import NotFound from '../views/NotFound';
import SignIn from '../components/SignIn';
import EditProjects from '../views/EditProjects';
import AddProject from '../views/AddProject';
import EditTech from '../views/EditTech';
import AddTech from '../views/AddTech';
import ContactModal from '../components/cards/ContactModal';

const AdminRoute = ({ component: Component, user, ...rest }) => {
  const routeChecker = (items) => (user
    ? (<Component {...items} user={user} />)
    : (<Redirect to={{ pathname: '/', state: { from: items.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

AdminRoute.propTypes = {
  component: PropTypes.func,
  user: PropTypes.any
};
export default function Routes({
  user,
  isAdmin,
  projects,
  setProjects,
  techArr,
  setTechArr
}) {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={() => <Home
          projects={projects} techArr={techArr} /> } />
        <Route exact path='/contact'
          component={() => <ContactModal /> } />
        <Route exact path='/admin_admin' component={() => <SignIn
          isAdmin={isAdmin} /> }
        />
        <AdminRoute
          exact
          path='/add-tech'
          user={user}
          component={() => <AddTech
            setTechArr={setTechArr}/>}
        />
        <AdminRoute
          exact
          path='/edit-tech'
          user={user}
          component={() => <EditTech
            techArr={techArr}
            setTechArr={setTechArr}/>}
        />
        <AdminRoute
          exact
          path='/edit-projects'
          user={user}
          component={() => <EditProjects
            projects={projects}
            setProjects={setProjects}/>}
        />
        <AdminRoute
          exact
          path='/add-project'
          user={user}
          component={() => <AddProject
            setProjects={setProjects}/>}
        />
        <Route exact path='/not-found' component={NotFound} />
        <Route path='*' component={NotFound} />
      </Switch>
    </div>
  );
}

Routes.propTypes = {
  user: PropTypes.any,
  isAdmin: PropTypes.bool,
  projects: PropTypes.array,
  setProjects: PropTypes.func,
  techArr: PropTypes.array,
  setTechArr: PropTypes.func
};
