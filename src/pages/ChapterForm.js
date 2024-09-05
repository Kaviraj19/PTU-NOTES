import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase'; // Ensure you have this import

function ChapterForm() {
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [newChapter, setNewChapter] = useState({ name: '', document: null });
  const [chapterError, setChapterError] = useState(null);
  const [subjects, setSubjects] = useState([]);

  // Fetch subjects when the component mounts
  useEffect(() => {
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

  const handleDocumentChange = (event) => {
    const file = event.target.files[0];
    setNewChapter({ ...newChapter, document: file });
  };

  const handleAddChapter = () => {
    setChapters([...chapters, newChapter]);
    setNewChapter({ name: '', document: null });
  };

  const handleChapterSubmit = async (event) => {
    event.preventDefault();
    setChapterError(null);
  
    if (!selectedSubjectId) {
      setChapterError('Please select a subject');
      return;
    }
  
    try {
      // Upload documents to Supabase Storage and get URLs
      const uploadPromises = chapters.map(async (chapter) => {
        if (chapter.document) {
          const sanitizedFileName = sanitizeFileName(chapter.document.name);
          const filePath = `documents/${sanitizedFileName}`;
          
          // Upload the file
          const { error: uploadError } = await supabase.storage
            .from('notes-bucket')
            .upload(filePath, chapter.document);
  
          if (uploadError) {
            throw new Error('Document upload failed: ' + uploadError.message);
          }
          const projectId = 'clquzhsqxcfjejojzfug';
          const bucket = 'notes-bucket';
          const assetName = `documents/${sanitizedFileName}`; // Add file extension
          // Get the public URL of the uploaded document
          // this is which i got through my dashboard... https://clquzhsqxcfjejojzfug.supabase.co/storage/v1/object/public/notes-bucket/documents/sign.png
         //this through my table which is through log... https://clquzhsqxcfjejojzfug.supabase.co/storage/v1/object/public/notes-bucket/documents/sign.png
          const publicUrl = `https://${projectId}.supabase.co/storage/v1/object/public/${bucket}/${assetName}`;
          console.log(publicUrl);
  
          return { name: chapter.name, link: publicUrl }; // Use publicUrl instead of publicURL
        }
        return null;
      });
  
      // Wait for all uploads to finish
      const uploadedChapters = await Promise.all(uploadPromises);
  
      // Filter out null results and prepare insert data
      const insertChapters = uploadedChapters
        .filter(chapter => chapter !== null)
        .map(chapter => ({
          subject_id: selectedSubjectId,
          chapter_name: chapter.name || '',
          document_link: chapter.link || '',
        }));
  
      const { error } = await supabase.from('chapters').insert(insertChapters);
  
      if (error) {
        throw new Error('Chapter insertion failed: ' + error.message);
      }
  
      console.log('Chapters inserted successfully:', insertChapters);
      setChapters([]);
      setNewChapter({ name: '', document: null });
    } catch (error) {
      console.error('Unexpected error:', error.message);
      setChapterError('Chapter submission failed');
    }
  };
  
  const sanitizeFileName = (fileName) => {
    return fileName.replace(/[^a-zA-Z0-9.]/g, '_');
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Add Chapters</h2>
      </div>
      <div className="card-body">
        <form onSubmit={handleChapterSubmit}>
          <div className="form-group">
            <label>
              Select Subject:
              <select className="form-control" value={selectedSubjectId || ''} onChange={(e) => setSelectedSubjectId(e.target.value)}>
                <option value="">Select a Subject</option>
                {subjects.length > 0 ? (
                  subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>{subject.subject_name}</option>
                  ))
                ) : (
                  <option value="">No subjects available</option>
                )}
              </select>
            </label>
          </div>
          <br />
          <h2>Chapters:</h2>
          <ul className="list-group">
            {chapters.map((chapter, index) => (
              <li key={index} className="list-group-item">
                {chapter.name || 'Untitled'} - {chapter.document ? chapter.document.name : 'No file selected'}
              </li>
            ))}
          </ul>
          <div className="form-group">
            <label>
              Add Chapter:
              <input type="text" className="form-control" value={newChapter.name} onChange={(e) => setNewChapter({ ...newChapter, name: e.target.value })} />
              <input type="file" className="form-control" onChange={handleDocumentChange} />
              <button type="button" className="btn btn-primary mt-2" onClick={handleAddChapter}>Add Chapter</button>
            </label>
          </div>
          <br />
          <button type="submit" className="btn btn-primary">Submit Chapters</button>
          {chapterError && <p style={{ color: 'red' }}>{chapterError}</p>}
        </form>
      </div>
    </div>
  );
}

export default ChapterForm;
