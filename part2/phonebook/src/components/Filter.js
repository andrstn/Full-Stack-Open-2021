import React from "react"

const Filter = ({persons, filters, setFilters, setPersons, newName, setNewName, newNumber, setNewNumber}) => {
    
    const handleFilter = (event) => {
        setFilters(event.target.value)
    }

    return (
        <div>
            <form>
                <div>
                    filter shown with
                    <input 
                    value={filters}
                    onChange={handleFilter}
                    />
                </div>
            </form>
        </div>
    )
}

export default Filter;