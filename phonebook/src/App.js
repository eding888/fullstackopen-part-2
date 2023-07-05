import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '704-423-3094' }
  ]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const updateText = (event, setFunction) => 
    setFunction(event.target.value);



  const addPerson = (event) => {
    event.preventDefault();
    const nameExists = persons.reduce((exists, person) => person.name === newName, false);

    if(!nameExists){
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(newPerson));
    }
    else alert(`${newName} is already in the phonebook.`)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit = {addPerson}>
        <div>
          name: <input 
            value = {newName}
            onChange= {event => updateText(event, setNewName)}
            required
          />
        </div>
        <div>
          number: <input
            value = {newNumber}
            onChange= {event => updateText(event, setNewNumber)}
            pattern= "(\d{3}([\-]?)\d{3}([\-]?)\d{4})"
            required
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
          <div>
            {person.name} {person.number}
          </div>)}
        </div>
    </div>
  )
}

export default App