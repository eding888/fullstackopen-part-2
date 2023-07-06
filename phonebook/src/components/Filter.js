
const Filter = ({searchValue, searchEvent}) => {
    return(
        <form>
            <div>
                filter shown with <input 
                value = {searchValue}
                onChange = {searchEvent}
                />
            </div>
        </form>
    )
}
export default Filter