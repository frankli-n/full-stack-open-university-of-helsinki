import React, { useState, useEffect } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import backendComms from './services/backendComms';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [notification, setNotification] = useState('')

  useEffect(() => {
    console.log("useEffect");
    refreshPersons();
  }, []);

  const refreshPersons = () => {
    backendComms.getAll()
    .then((response) => {
      setPersons(response.data);
      const allp = persons.map((i )=> {
      })

    });
  };

  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilterValue(event.target.value);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      backendComms.dlt(id).then(() => {
        refreshPersons();
      });
    }
  };

  const submitInfo = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);
    console.log('existingPerson', existingPerson);
    const existingPersonId = existingPerson ? existingPerson._id : null;
    console.log('existingPersonId',existingPersonId);
    const alreadyIn = !!existingPerson;
    console.log('alreadyIn',alreadyIn);

    if (alreadyIn) {
      const updatedPerson = {
        name: newName,
        number: newNumber,
        id: existingPersonId,
      }

      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        console.log('61 app.js ')
        backendComms
          .update(existingPersonId, updatedPerson)
          .then(() => {
            console.log(' 65 app.js ')
            setNewName('');
            setNewNumber('');
            refreshPersons();
            })
          .catch(error => {
            console.log(error);
            setNotification(error.message)
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
      }

    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: Date.now().toString(36),
      };
      backendComms
        .create(newPerson)
        .then(() => {
          setNewName('');
          setNewNumber('');
          refreshPersons();
          setNotification(`Added ${newName}`)
          setTimeout(() => {
            setNotification(null)
          }, 3000)
          })
        .catch(error => {
          console.log('error',error.response.data.error);
          setTimeout(() => {
            setNotification(error.response.data.error)
          }, 1)
        })
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification}/>
      <Filter handle={handleFilter} />

      <h3>Add new</h3>

      <PersonForm
        handleSubmit={submitInfo}
        handleChange={handleChange}
        handleChangeNumber={handleChangeNumber}
        newName={newName}
        newNumber={newNumber}
      />

      <h3>Numbers</h3>

      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
