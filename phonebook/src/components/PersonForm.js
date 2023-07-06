const PersonForm = ({nameEvent, numberEvent, submitEvent, nameValue, numberValue}) => {
    return(
        <form onSubmit = {submitEvent}>
            <div>
                name: <input 
                value = {nameValue}
                onChange= {nameEvent}
                required
                />
            </div>
            <div>
                number: <input
                value = {numberValue}
                onChange= {numberEvent}
                pattern= "(\d{3}([\-]?)\d{3}([\-]?)\d{4})"
                required
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm