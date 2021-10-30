import React from "react";
import personService from '../services/persons'

const PersonForm = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber, setNotif}) => {

    const add = persons.find(person => person.name === `${newName}`)

    const addContact = (event) => {
        event.preventDefault()
        if(newNumber === "" || newName === "" ){
          alert('Please put something')
        }
        else if(add === undefined) {
          const newContact = {
            name: newName,
            number: newNumber,
          }
          personService
            .create(newContact)
            .then(returnedPerson => {
              setNotif(`Added ${newContact.name}`)
              setTimeout(() => {
                setNotif(null)
              }, 2000)
              setPersons(persons.concat(returnedPerson))
              setNewName('')
              setNewNumber('')
            })
        }
        else if(add !== undefined) {
          
          if(add.number !== `${newNumber}`) {
            const changedNumber = {...add, number: `${newNumber}`}
            if(window.confirm(`${changedNumber.name} already exists. Replace old number with the new one?`))
              personService
                .update(changedNumber.id, changedNumber)
                .then(returnedPerson => {
                  setPersons(persons.map(person => person.id !== changedNumber.id ? person : returnedPerson))
                  setNotif(`Updated ${changedNumber.name}`)
                  setTimeout(() => {
                    setNotif(null)
                  }, 2000)
                  setNewName('')
                  setNewNumber('')
                })
                .catch(error => {
                  setNotif(
                    `Invalid(1): Information of ${changedNumber.name} has already been removed from the server`
                  )
                  setTimeout(() => {
                    setNotif(null)
                  }, 2000)
                  setPersons(persons.filter(person => person.name !== `${changedNumber.name}`))
                })
          }
          else{
            alert(`This contact already exists!`)
          }
        }
      }
    
      const handleNewName = (event) => {
        setNewName(event.target.value)
      }
    
      const handleNewNumber = (event) => {
        setNewNumber(event.target.value)
      }

      return (
          <div>
              <form onSubmit={addContact}>
                <div>
                Name: <br/>
                <input 
                value={newName}
                onChange={handleNewName}
                />
                </div> <br/>
                <div>
                Number: <br/>
                <input
                value={newNumber}
                onChange={handleNewNumber}
                />
                </div> <br/>
                <div>
                <button type="submit">ADD</button>
                </div>
            </form>
          </div>
      )
}

export default PersonForm;