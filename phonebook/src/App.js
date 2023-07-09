import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import server from './services/serverActions'
import Notification from './components/Notification'
const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [searchTarget, setSearchTarget] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationStyle, setNotificationStyle] = useState({
    backgroundColor: "silver",
    color: "lime",
    borderRadius: 5,
    border: "5px solid",
    borderColor: "lime",
    fontSize: "2rem",
    padding: "1rem",
  })
  const messageType = {
    GOOD: "good",
    BAD: "bad",
  }

  let searching = searchEnabled;
  let target = searchTarget;

  useEffect(() => {
    console.log("hi");
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data);
      });
    }, [])

  const updateNotification = (message, type) => {
    let notificationStyleTemp = {...notificationStyle}
    switch(type){
      case "good":
        notificationStyleTemp.color = notificationStyleTemp.borderColor = "lime";
        break;
      case "bad":
        notificationStyleTemp.color = notificationStyleTemp.borderColor = "red";
        break;
    }
    setNotificationStyle(notificationStyleTemp);
    setNotificationMessage(message);
    setTimeout(
      () => { setNotificationMessage('') },
      5000
    )
  }
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
    const nameMatch = persons.find(person => person.name === newName);
    const newPerson = {
      name: newName,
      number: newNumber,
      id: new Date().getTime(),
    };

    if(nameMatch === undefined){
      server
        .create(newPerson)
        .then(createdPerson => setPersons(persons.concat(createdPerson)));
      updateNotification("Person created successfully.", messageType.GOOD);
    }
    else{
      if(nameMatch.number !== newNumber){
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
          const updatedItemID = nameMatch.id;
          newPerson.id = updatedItemID;
          console.log(updatedItemID);
          server
            .update(updatedItemID, newPerson)
            .then(updatedPerson => setPersons(persons.map(person => person.id === updatedPerson.id ? newPerson : person)))
            .catch(error => updateNotification(`Information of ${newName} has already been removed from the server.`, messageType.BAD)); 
            updateNotification("Person updated successfully.", messageType.GOOD);
            
        }
      }
      else alert(`${newName} is already in the phonebook.`)
    }
  }

  const removePerson = (event, id) => {
    event.preventDefault();
    if(window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)){
      server
        .remove(id)
        .then(removedPerson => 
          setPersons(persons.filter(person => person.id !== id)));
        updateNotification("Person removed successfully.", messageType.GOOD);
    }
  }
  const peopleToShow = searching ? persons.filter(person => person.name.toLowerCase().includes(target.toLowerCase())) : persons;
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message= {notificationMessage}
        style = {notificationStyle}
      />
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
        handleDeletion={removePerson}
      />
    </div>
  )
}

export default App