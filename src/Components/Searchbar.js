import React, { useContext } from 'react';
import { SearchContext } from '../Context/SerachProvider';
import './Searchbar.css'
import { Link } from 'react-router-dom';
function Searchbar() {
  const { searchParams, setSearchParams } = useContext(SearchContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchParams({
      branch: event.target.branch.value,
      year: event.target.year.value,
      subject: event.target.subject.value,
    });
  };

  return (
    <div className="search-container container-fluid">
      <form onSubmit={handleSubmit} className="row g-3 justify-content-center">
      
        <div className="col-md-4">
          <label className="form-label">Branch Name:</label>
          <select
            name="branch"
            value={searchParams.branch}
            onChange={(event) =>
              setSearchParams({ ...searchParams, branch: event.target.value })
            }
            className="form-select"
          >
            <option value="">ALL</option>
            <option value="CSE">Computer Science and Engineering</option>
            <option value="ECE">Electronics and Communication Engineering</option>
            <option value="MECH">Mechanical Engineering</option>
            <option value="CIVIL">Civil Engineering</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Year:</label>
          <select
            name="year"
            value={searchParams.year}
            onChange={(event) =>
              setSearchParams({ ...searchParams, year: event.target.value })
            }
            className="form-select"
          >
            <option value="">ALL</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Subject Name:</label>
          <input
            type="text"
            name="subject"
            value={searchParams.subject}
            onChange={(event) =>
              setSearchParams({ ...searchParams, subject: event.target.value })
            }
            placeholder="Enter Subject Name"
            className="form-control"
          />
        </div>
        <div className="col-md-12 text-center">
          <button type="submit" className="btn btn-danger">
            <Link to="/notes" className="text-white text-decoration-none">
              Get Notes
            </Link>
          </button>
        </div>
        
      </form>
    </div>
  );
}

export default Searchbar;