import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap'; // Import Bootstrap Table component

function App() {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetchData(); // Initial data fetch
    const intervalId = setInterval(fetchData, 1000); // Fetch data every second

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  const fetchData = () => {
    fetch('https://followers-ba029-default-rtdb.firebaseio.com/entries.json')
      .then(response => response.json())
      .then(data => {
        if (data) { // Check if data is not null or undefined
          const entriesArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          setDetails(entriesArray);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const deleteEntry = (id) => {
    fetch(`https://followers-ba029-default-rtdb.firebaseio.com/entries/${id}.json`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          setDetails(details.filter(detail => detail.id !== id));
          console.log('Entry deleted successfully');
        } else {
          console.error('Failed to delete entry');
        }
      })
      .catch(error => {
        console.error('Error deleting entry:', error);
      });
  };

  const deleteAllData = () => {
    fetch('https://followers-ba029-default-rtdb.firebaseio.com/entries.json', {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          setDetails([]);
          console.log('All data deleted successfully');
        } else {
          console.error('Failed to delete all data');
        }
      })
      .catch(error => {
        console.error('Error deleting all data:', error);
      });
  };

  return (
    <body className="welcome">
      <span id="splash-overlay" className=""></span>
      <span id="welcome" className="z-depth-4"></span>
      <main className="valign-wrapper">
        <span className="container grey-text text-lighten-1 ">

          <div className='enb'>
            <h1>Details</h1>
            <button className='btn soace' onClick={deleteAllData}>Delete All Data</button>
            <span className='soace'><br/></span>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Current Time</th>
                  <th>User Location</th>
                  <th>System OS</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {details.map(detail => (
                  <tr key={detail.id}>
                    <td><b>{detail.name}</b></td>
                    <td>{detail.currentTime}</td>
                    <td>{detail.userLocation}</td>
                    <td>{detail.systemOS}</td>
                    <td><button className='btn' onClick={() => deleteEntry(detail.id)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </span>
      </main>
    </body>
  );
}

export default App;
