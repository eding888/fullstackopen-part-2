const Persons = ({people}) => {
    return(
        <div>
            {people.map(person =>
                <div>
                    {person.name} {person.number}
                </div>)}
        </div>
    )
}
export default Persons;