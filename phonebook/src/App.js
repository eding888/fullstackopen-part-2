import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import server from './services/serverActions'

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [searchTarget, setSearchTarget] = useState('');
  let searching = searchEnabled;
  let target = searchTarget;

  useEffect(() => {
    console.log("effect");
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data);
      });
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value);
    updateSearching(event);
  }

  const handleName = (event) =>
    setNewName(event.target.value);

  const handleNumber = (event) =>
    setNewNumber(event.target.value);

  const updateSearching = (event) =>{
    if(event.target.value.length > 0) searching = true;
    else searching = false;
    setSearchEnabled(searching);

    target = event.target.value;
    setSearchTarget(target);
  }
  
  
  const addPerson = (event) => {
    event.preventDefault();
    const nameMatches = persons.reduce((matches, person) =>{
      if(person.name === newName) return (matches + 1);
      else return matches;
    }, 0);

    if(nameMatches === 0){
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      server
        .create(newPerson)
        .then(createdPerson => setPersons(persons.concat(createdPerson)));
      
    }
    else alert(`${newName} is already in the phonebook.`)
  }

  const peopleToShow = searching ? persons.filter(person => person.name.toLowerCase().includes(target.toLowerCase())) : persons;
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        searchValue= {search} 
        searchEvent= {handleSearch}
      />
      <h2>add a new</h2>
      <PersonForm
        nameValue= {newName}
        numberValue= {newNumber}
        nameEvent= {handleName}
        numberEvent= {handleNumber}
        submitEvent= {addPerson}
      />
      <h2>Numbers</h2>
      <Persons
        people={peopleToShow}
      />
    </div>
  )
}

export default App