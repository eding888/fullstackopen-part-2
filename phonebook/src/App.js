import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const updateNameText = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {name: newName};
    setPersons(persons.concat(newPerson));
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input 
           value = {newName}
           onChange= {updateNameText}
          />
        </div>
        <div>
          <button onClick = {addPerson} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
          <div>
            {person.name}
          </div>)}
        </div>
    </div>
  )
}

export default App