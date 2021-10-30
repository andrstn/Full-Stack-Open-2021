import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'

const Notification = ({value}) => {
  const notifStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  if(value === null){
    return null
  }
  else if(value.split(" ")[0] === 'Added') {
    notifStyle.color = 'green'
    return (
      <div style={notifStyle}>
        {value}
      </div>
    )
  }
  else if(value.split(" ")[0] === 'Deleted'){
    notifStyle.color = 'red'
    return (
      <div style={notifStyle}>
        {value}
      </div>
    )
  }
  else if(value.split(" ")[0] === 'Updated'){
    notifStyle.color = 'green'
    return (
      <div style={notifStyle}>
        {value}
      </div>
    )
  }
  else if(value.split(" ")[0] === 'Invalid(1):'){
    notifStyle.color = 'red'
    return (
      <div style={notifStyle}>
        {value}
      </div>
    )
  }
  else if(value.split(" ")[0] === 'Invalid(2):'){
    notifStyle.color = 'red'
    return (
      <div style={notifStyle}>
        {value}
      </div>
    )
  }
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filters, setFilters] = useState('')
  const [notif, setNotif] = useState(null)


  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])

  const deletePerson = (id) => {
    const p = persons.find(person => person.id === id)
    if(window.confirm(`Delete ${p.name}?`))
      personService
        .remove(id)
        .then(returnedPerson => {
          setPersons(persons.filter(person => person.id !== id))
          setNotif(`Deleted ${p.name}`)
          setTimeout(() => {
            setNotif(null)
          }, 2000) 
        })
        .catch(error => {
          setNotif(
            `Invalid(2): ${p.name} doesn't exist. Perhaps it was already deleted before the re-render`
          )
          setTimeout(() => {
            setNotif(null)
          }, 2000)
          setPersons(persons.filter(person => person.name !== `${p.name}`))
        })
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification value={notif} />
      
      <Filter persons={persons} setPersons={setPersons} 
      newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber}
      filters={filters} setFilters={setFilters} />

      <h3>Add a new contact</h3>

      <PersonForm persons={persons} setPersons={setPersons} 
      newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} setNotif={setNotif}/>

      <h3>Persons</h3>
      
      <Persons persons={persons} setPersons={setPersons} 
      newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} 
      filters={filters} setFilters={setFilters} deletePerson={deletePerson}/>

    </div>
  )
}

export default App