import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Searchbar from '../Components/Searchbar';
import { SearchContext } from '../Context/SerachProvider';
import { useContext } from 'react';
import { supabase } from '../supabase'; // Import as a named import
import './Notes.css'; // import the notes.css file

function Notes() {
  const { searchParams } = useContext(SearchContext);
  const [notesData, setNotesData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      let subjectQuery = supabase
        .from('subjects')
        .select('id, department, year, subject_name, chapters (chapter_name, document_link)'); // Fetch related chapters

      // Apply filters based on searchParams
      if (searchParams.branch) {
        subjectQuery = subjectQuery.eq('department', searchParams.branch);
      }
      if (searchParams.year) {
        subjectQuery = subjectQuery.eq('year', searchParams.year);
      }
      if (searchParams.subject) {
        subjectQuery = subjectQuery.ilike('subject_name', `%${searchParams.subject}%`);
      }

      const { data, error } = await subjectQuery;

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setNotesData(data);
      }

      setLoading(false);
    };

    fetchData();
  }, [searchParams]);

  return (
    <div>
      <Header />
      <Searchbar />
      <div>
        <h2>
          {searchParams.branch && searchParams.year && searchParams.subject
            ? "Notes for " + searchParams.branch + " " + searchParams.year + " " + searchParams.subject
            : searchParams.branch && searchParams.year
              ? "Notes for " + searchParams.branch + " " + searchParams.year + "Yr"
              : searchParams.branch && searchParams.subject
                ? "Notes for " + searchParams.branch + " " + searchParams.subject
                : searchParams.year && searchParams.subject
                  ? "Notes for " + searchParams.year + "Yr " + searchParams.subject
                  : searchParams.branch
                    ? "Notes for " + searchParams.branch
                    : searchParams.year
                      ? "Notes for " + searchParams.year + "Yr"
                      : searchParams.subject
                        ? "Notes for " + searchParams.subject
                        : 'All Notes'
          }
        </h2>
      </div>
      <div className="content-section">
        {loading ? (
          // Show spinner under header and search bar
          <div className="text-center mt-4">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : notesData.length === 0 ? (
          // Show "No data found" card if no data is found
          <div className="text-center mt-4">
            <div className="card p-4">
              <h5 className="card-title">Sorry, no data found</h5>
            </div>
          </div>
        ) : (
          // Render notes data
          <ul className="card-list">
            {notesData.map((item) => (
              <li key={item.id} className="card-item">
                <div className="card">
                  <div className="card-header">
                    <h3>{item.subject_name}</h3>
                  </div>
                  <ul className="list-group list-group-flush">
                    {item.chapters.map((chapter) => (
                      <li key={chapter.chapter_name} className="list-group-item">
                        <a href={chapter.document_link} target="_blank" rel="noopener noreferrer">
                          {chapter.chapter_name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-md-12 text-center" >
       <a href="/" className="btn btn-outline-danger"> back to Home</a>
      </div>
    </div>
  );
}

export default Notes;
