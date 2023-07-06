import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '704-423-3094' }
  ]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [searchTarget, setSearchTarget] = useState('');
  let searching = searchEnabled;
  let target = searchTarget;

  const updateText = (event, setFunction) => 
    setFunction(event.target.value);

  const updateSearching = (event) =>{
    if(event.target.value.length > 0) searching = true;
    else searching = false;
    setSearchEnabled(searching);

    target = event.target.value;
    setSearchTarget(target);
  }
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
  const peopleToShow = searching ? persons.filter(person => person.name.toLowerCase().includes(target.toLowerCase())) : persons;
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with <input 
            value = {search}
            onChange = {event => {
              updateText(event, setSearch);
              updateSearching(event);
            }}
            />
        </div>
      </form>
      <h2>add a new</h2>
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
        {peopleToShow.map(person =>
          <div>
            {person.name} {person.number}
          </div>)}
        </div>
    </div>
  )
}

export default App