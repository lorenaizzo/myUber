import React from 'react';
import './App.css';
import DriverForm from './components/driver-form/Driverform';

function App() {
  return (
    <React.Fragment>
      <div className="container-app">
        <header>
          <h1>My Uber</h1>
        </header>
        <main>
            <DriverForm/>
        </main>
        <footer>
          <div className="containter-footer">
          <p>Desarrollado por Lorena Roxana Izzo</p>
          <div className="socialMedia">
            <a href="https://github.com/lorenaizzo"><i className="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/lorena-roxana-izzo/"><i className="fab fa-linkedin"></i></a>
            <a href="mailto:lore_izzo@yahoo.com.ar"><i className="fas fa-at"></i></a>
          </div>
          </div>
        </footer>
      </div>
      <div className="container-body">
        <div className="back-left"></div>
        <div className="back-right"></div>
      </div>
    </React.Fragment>
  );
}

export default App;
