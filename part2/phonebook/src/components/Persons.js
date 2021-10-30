import React from "react";

const Persons = ({persons, filters, setFilters, setPersons, newName, setNewName, newNumber, setNewNumber, deletePerson}) => {
    return (
        <div>
            <ul>
                {persons.filter(person => person.name.match(new RegExp(filters, 'i'))).map(filtered =>{
                    return (
                        <li key={filtered.name}>
                            {filtered.name} {filtered.number}
                            <button onClick={() => deletePerson(filtered.id)}>delete</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Persons;