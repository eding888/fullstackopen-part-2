const Content = ({parts}) => {
    return(
        <>
            {parts.map(({id, name, exercises}) =>
                (<div key={id}>{name} {exercises}</div>)
            )}
        </>
    )
}

export default Content;