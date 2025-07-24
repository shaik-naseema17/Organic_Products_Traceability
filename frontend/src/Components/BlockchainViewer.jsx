import React, { useState } from 'react';
import axios from 'axios';

function BlockchainViewer() {
  const [vegId, setVegId] = useState('');
  const [chain, setChain] = useState([]);

  const fetchChain = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/blockchain/${vegId}`);
      setChain(res.data.chain);
    } catch {
      alert("Invalid ID or Chain broken");
    }
  };

  return (
    <div style={{ marginTop: '100px', padding: '20px', textAlign: 'center' }}>
      <h2>Blockchain Viewer</h2>
      <input
        value={vegId}
        onChange={e => setVegId(e.target.value)}
        placeholder="Enter Vegetable ID"
        style={{
          padding: '10px',
          width: '250px',
          marginRight: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc'
        }}
      />
      <button
        onClick={fetchChain}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Fetch Chain
      </button>

     <ul style={{ listStyle: 'none', padding: 0, marginTop: '30px' }}>
  {chain.map((block, i) => (
    <li
      key={i}
      style={{
        marginBottom: '20px',
        border: '1px solid #ccc',
        padding: '15px',
        borderRadius: '6px'
      }}
    >
      <p><strong>{block.action}</strong> | {block.fromRole} → {block.toRole}</p>
      <p>Hash: {block.currentHash.slice(0, 10)}... | Prev: {block.previousHash.slice(0, 10)}...</p>
      <p><strong>Timestamp:</strong> {new Date(block.timestamp).toLocaleString()}</p>
  {block.latitude && block.longitude && (
  <div style={{ marginTop: '10px', textAlign: 'center' }}>
    <p><strong>Location</strong></p>
    <p>
      <strong>Latitude:</strong> {block.latitude.toFixed(4)}<br />
      <strong>Longitude:</strong> {block.longitude.toFixed(4)}
    </p>
  </div>
)}


      {block.imageUrl && (
  <div style={{ marginTop: '10px' }}>
    <img
      src={block.imageUrl}
      alt="Vegetable"
      style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }}
    />
  </div>
)}

    </li>
  ))}
</ul>


    </div>
  );
}

export default BlockchainViewer;
