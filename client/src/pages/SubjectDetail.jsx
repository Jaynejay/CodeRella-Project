// src/pages/SubjectDetail.jsx
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function SubjectDetail() {
  const { id } = useParams(); // assumes route is like /subjects/:id

  useEffect(() => {
    // POST to /api/recent-subjects/:id to mark as accessed
    axios.post(`http://localhost:8080/api/recent-subjects/${id}`)
      .catch(err => console.error('Failed to mark subject as accessed:', err));
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pt-20">
      <div className="container mx-auto px-4 py-10 text-center text-gray-600">
        <h1 className="text-2xl font-semibold mb-4">Subject Details</h1>
        <p>This page is under construction. Details will appear here soon.</p>
      </div>
    </div>
  );
}
