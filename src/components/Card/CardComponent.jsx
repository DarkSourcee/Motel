import React from 'react';

const CardComponent = () => {
  return (
    <div className="container mt-4">
      <h2>Motel Exôtico</h2>
      <div className="row">
        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <div className="card text-white bg-primary">
            <div className="card-body">
              Card 1
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <div className="card text-white bg-success">
            <div className="card-body">
              Card 2
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <div className="card text-white bg-warning">
            <div className="card-body">
              Card 3
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <div className="card text-white bg-danger">
            <div className="card-body">
              Card 4
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
