import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase';
import firebaseConfig from '../helpers/apiKeys';
import Routes from '../helpers/Routes';
import PageTop from '../components/PageTop';
import { getProjects } from '../helpers/data/projects';
import { getTechnologies } from '../helpers/data/technologies';

function App() {
  const [projects, setProjects] = useState([]);
  const [techArr, setTechArr] = useState([]);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const adminUid = firebaseConfig.admin;

  useEffect(() => {
    getProjects().then((response) => setProjects(response));
    getTechnologies().then((response) => setTechArr(response));
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed && authed.uid === adminUid) {
        const userInfoObj = {
          fullName: authed.displayName,
          profileImage: authed.photoURL,
          uid: authed.uid,
          username: authed.email.split('@')[0]
        };
        setUser(userInfoObj);
        setIsAdmin(true);
      } else if (user || user === null) {
        setUser(false);
        setIsAdmin(false);
      }
    });
  }, []);

  return (
    <>
      <Router>
        <PageTop user={user}
          isAdmin={isAdmin}
          projects={projects}
          setProject={setProjects}
        />
        <Routes user={user}
          isAdmin={isAdmin}
          projects={projects}
          setProjects={setProjects}
          techArr={techArr}
          setTechArr={setTechArr}
           />
      </Router>
    </>
  );
}

export default App;
