import React from 'react';
import Header from '../Components/Header';
import './Home.css'

function Home() {
  return (
    <div>
      <Header />

      <div className="card text-center card-lg">
  <div className="card-header">
    Notes and Question Paper
  </div>
  <div className="card-body">
    <h5 className="card-title">PTU NOTES</h5>
    <p className="card-text">get your notes and question paper for the university exams and cat </p>
    <a href="/Notes" className="btn btn-outline-danger">GET IT</a>
  </div>
  <div className="card-footer">
    bla bla bla
  </div>
</div>
    </div>
  );
}

export default Home;