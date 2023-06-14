import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'


const App = () => {
  const initialPersons = [];

  const [persons, setPersons] = useState(initialPersons);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState([])

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const submitInfo = (event) => {
    event.preventDefault()
    const namesArray = persons.map((i) => i.name)
    const alreadyIn = namesArray.includes(newName)
    if (alreadyIn) {
      alert(`${newName} is already added the phonebook`)
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons([...persons, personObject])
    }
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    const filter = event.target.value;
    setFilterValue(filter);
    const filteredObject = persons.map((person) => (
      {
      ...person,
      filterMatch: person.name.toLowerCase().includes(filter.toLowerCase())
    }));
    setPersons(filteredObject);
  };


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handle={handleFilter}/>

      <h3>Add new</h3>

      <PersonForm 
        handleSubmit={submitInfo} 
        handleChange={handleChange} 
        handleChangeNumber={handleChangeNumber} 
        newName={newName} 
        newNumber={newNumber}
      />

      <h3>Numbers</h3>

      <Persons persons={persons}/>
    </div>
  )
}

export default App