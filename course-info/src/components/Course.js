import Header from './Header'
import Content from './Content'
const Course = ({course: {id, name, parts}}) => {
    return(
        <>
            <Header text={name}/>
            <Content parts={parts}/>
        </>
    )
}

export default Course;