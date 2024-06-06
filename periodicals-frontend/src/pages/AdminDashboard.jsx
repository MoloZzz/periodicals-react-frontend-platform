import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AdminDashboard = () => {
  const [publications, setPublications] = useState([]);
  const [newPublication, setNewPublication] = useState({ title: '', description: '', price: '' });
  const [editPublication, setEditPublication] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      const response = await api.get('/publications');
      setPublications(response.data);
    } catch (error) {
      setError('Failed to fetch publications.');
    }
  };

  const handleAddPublication = async (e) => {
    e.preventDefault();
    try {
      await api.post('/publications', newPublication);
      fetchPublications();
      setNewPublication({ title: '', description: '', price: '' });
    } catch (error) {
      setError('Failed to add publication.');
    }
  };

  const handleEditPublication = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/publications/${editPublication.id}`, editPublication);
      fetchPublications();
      setEditPublication(null);
    } catch (error) {
      setError('Failed to edit publication.');
    }
  };

  const handleDeletePublication = async (id) => {
    try {
      await api.delete(`/publications?id=${id}`);
      fetchPublications();
    } catch (error) {
      setError('Failed to delete publication.');
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Manage Publications</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Add New Publication</h5>
          <form onSubmit={handleAddPublication}>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                value={newPublication.title}
                onChange={(e) => setNewPublication({ ...newPublication, title: e.target.value })}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                value={newPublication.description}
                onChange={(e) => setNewPublication({ ...newPublication, description: e.target.value })}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={newPublication.price}
                onChange={(e) => setNewPublication({ ...newPublication, price: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Add Publication</button>
          </form>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Edit Publication</h5>
          {editPublication && (
            <form onSubmit={handleEditPublication}>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  value={editPublication.title}
                  onChange={(e) => setEditPublication({ ...editPublication, title: e.target.value })}
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  value={editPublication.description}
                  onChange={(e) => setEditPublication({ ...editPublication, description: e.target.value })}
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  value={editPublication.price}
                  onChange={(e) => setEditPublication({ ...editPublication, price: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">Update Publication</button>
              <button type="button" className="btn btn-secondary btn-block" onClick={() => setEditPublication(null)}>Cancel</button>
            </form>
          )}
        </div>
      </div>

      <h5 className="mb-3">Publications List</h5>
      <ul className="list-group">
        {publications.map((publication) => (
          <li key={publication.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h6>{publication.title}</h6>
              <p>{publication.description}</p>
              <p><strong>Price:</strong> {publication.price}</p>
            </div>
            <div>
              <button
                className="btn btn-sm btn-warning mr-2"
                onClick={() => setEditPublication(publication)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDeletePublication(publication.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
