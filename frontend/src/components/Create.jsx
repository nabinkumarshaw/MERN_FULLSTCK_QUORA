import React, { useState } from 'react';

const Create = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  const [error, setError] = useState('');

  console.log(name, email, age);

  const handlesubmit = async (e) => {
    e.preventDefault();

    const addUser = { name, email, age };

    const response = await fetch('http://localhost:5000', {
      method: 'POST',
      body: JSON.stringify(addUser),
      headers: {
        'Content-Type': 'application/json', // Fixed casing
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.error(result.error || 'Something went wrong');
      setError(result.error || 'Something went wrong');
    } else {
      console.log(result);
      setError('');
      setName('');
      setEmail('');
      setAge(0);
    }
  };

  return (
    <div className="container my-2">
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="text-center">Enter the data</h2>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(Number(e.target.value) || 0)}
          />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" />
          <label className="form-check-label">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
