import React from "react";

const Search = ({value, onChange}) => {
    return(
        <div>
            <form>
                find countries
                <input 
                value={value}
                onChange={onChange}
                />
            </form>
            <br/>
            <br/>
        </div>
    )
}

export default Search