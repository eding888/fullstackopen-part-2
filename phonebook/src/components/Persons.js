const Persons = ({people, handleDeletion}) => {
    return(
        <div>
            {people.map(person =>
                <table>
                    
                    <tr key = {person.id}>
                        <td><div>{person.name}</div> <div>{person.number}</div></td>
                        <td><button onClick= {(event) => handleDeletion(event, person.id)}>delete</button></td>
                    </tr>
                    
                </table>
            )}
                
        </div>
    )
}
export default Persons;