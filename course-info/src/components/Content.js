const Content = ({parts}) => {
    const total = parts.reduce((i, part) => i + part.exercises, 0);
    return(
        <>
            {parts.map(({id, name, exercises}) =>
                (<div key={id}>{name} {exercises}</div>)
            )}
            
            <div><strong>total of {total} exercises</strong></div>
        </>
    )
}

export default Content;