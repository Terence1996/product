import React, { useState } from 'react';
import './App.css';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [schemaOptions, setSchemaOptions] = useState([
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' }
  ]);

  const [dropdownValues, setDropdownValues] = useState([]);

  const handleSaveSegment = () => {
    setShowPopup(true);
  };

  const handleSegmentNameChange = (e) => {
    setSegmentName(e.target.value);
  };

  const handleSchemaChange = (index, value) => {
    const newDropdownValues = [...dropdownValues];
    newDropdownValues[index] = value;
    setDropdownValues(newDropdownValues);
  };

  

  const handleSubmitSegment = () => {
    const schema = dropdownValues.map(value => {
      const label = schemaOptions.find(option => option.value === value).label;
      return { [value]: label };
    });

    const data = {
      segment_name: segmentName,
      schema: schema
    };

    console.log('Data to send:', data);

    // Send data to server via fetch or axios (e.g., fetch('/api/segment', { method: 'POST', body: JSON.stringify(data) }))
    setShowPopup(false);
  };

  return (
    <div className="App">
      <button onClick={handleSaveSegment}>Save Segment</button>
      
      {showPopup && (
        <div className="popup">
          <h2>Create Segment</h2>
          
          <div>
            <label>Segment Name: </label>
            <input type="text" value={segmentName} onChange={handleSegmentNameChange} />
          </div>
          
          <div>
            <label>Add schema to segment:</label>
            <select 
              onChange={(e) => handleSchemaChange(dropdownValues.length, e.target.value)}
              value=""
            >
              <option value="" disabled>Select schema</option>
              {schemaOptions
                .filter(option => !dropdownValues.includes(option.value))
                .map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </select>
            
          </div>
          <a href='https://webhook.site/#!/view/f1471d7c-e066-4aa9-83f6-a2674f7e4ab2'>+Add new Schema</a>
          <div className="blue-box">
            {dropdownValues.map((value, index) => (
              <div key={index}>
                <select 
                  value={value}
                  onChange={(e) => handleSchemaChange(index, e.target.value)}
                >
                  {schemaOptions
                    .filter(option => 
                      !dropdownValues.includes(option.value) || option.value === value
                    )
                    .map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                </select>
              </div>
            ))}
          </div>

          <button onClick={handleSubmitSegment}>Save the Segment</button>
        </div>
      )}
    </div>
  );
}

export default App;
