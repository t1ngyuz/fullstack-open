const Person = ({ person, toggleAppear }) => {
  return (
    <li>{person.name} {person.number}
    <button onClick={toggleAppear}>delete</button>
    </li>
  )
}

export default Person
