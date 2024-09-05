import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase'; // Import your Supabase client

function DepartmentForm() {
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState(0);
  const [subjectName, setSubjectName] = useState('');
  const [subjectError, setSubjectError] = useState(null);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    // Fetch subjects when component mounts
    const fetchSubjects = async () => {
      const { data, error } = await supabase.from('subjects').select('*');
      if (error) {
        console.error('Error fetching subjects:', error.message);
      } else {
        setSubjects(data || []);
      }
    };

    fetchSubjects();
  }, []);

  const handleSubjectSubmit = async (event) => {
    event.preventDefault();
    setSubjectError(null);

    try {
      const { data, error } = await supabase
        .from('subjects')
        .insert([{ department, year, subject_name: subjectName }])
        .single();

      if (error) {
        throw new Error('Subject insertion failed: ' + error.message);
      }

      console.log("Subject Insert Response:", data);

      // Fetch updated subjects after insertion
      const { data: updatedData, error: fetchError } = await supabase.from('subjects').select('*');
      if (fetchError) {
        throw new Error('Error fetching updated subjects: ' + fetchError.message);
      }

      setSubjects(updatedData || []);
      setDepartment('');
      setYear(0);
      setSubjectName('');
    } catch (error) {
      console.error('Unexpected error:', error.message);
      setSubjectError('Subject submission failed');
    }
  };

  return (
    <div className="container">
      <div className="card mb-4">
        <div className="card-header">
          <h2>Add Subject</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubjectSubmit}>
            <div className="form-group">
              <label>
                Department:
                <input type="text" className="form-control" value={department} onChange={(e) => setDepartment(e.target.value)} />
              </label>
            </div>
            <br />
            <div className="form-group">
              <label>
                Year:
                <input type="number" className="form-control" value={year} onChange={(e) => setYear(Number(e.target.value))} />
              </label>
            </div>
            <br />
            <div className="form-group">
              <label>
                Subject Name:
                <input type="text" className="form-control" value={subjectName} onChange={(e) => setSubjectName(e.target.value)} />
              </label>
              
            </div>
            <br />
            <button type="submit" className="btn btn-primary">Submit Subject</button>
            {subjectError && <p style={{ color: 'red' }}>{subjectError}</p>}
            <a href='/Chapter'>add chapters</a> 
          </form>
        </div>
      </div>

      {/* Display subjects */}
      <div className="card mt-4">
        <div className="card-header">
          <h2>Subjects List</h2>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {subjects.map(subject => (
              <li key={subject.id} className="list-group-item">
                {subject.subject_name} - {subject.department} ({subject.year})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DepartmentForm;
