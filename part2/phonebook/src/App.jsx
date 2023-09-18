import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Person from './components/Person'
import './index.css'

const PersonForm = ( {name, number, nameChange, numberChange, addInfo}) => {
  return(
    <form onSubmit={addInfo}>
      <div>
        name: <input value={name} onChange={nameChange}/>
      </div>
      <div>
        number: <input value={number} onChange={numberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ( {persons, toggleAppear} ) => {

  return (
    persons.map(person =>
      <Person person={person} toggleAppear={() => toggleAppear(person.id)} />
    )
  )
}

const Notification = ( {message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className='notif'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const addInfo = (event) => {
    event.preventDefault()
    const nameList = persons.map(person => person.name)
    if (nameList.includes(newName)){
      alert(`${newName} is already added to phonebook`)
    } else{
      const newObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(newObject)
        .then(returnedObject => {
          setPersons(persons.concat(returnedObject))
          setNewName('')
          setNewNumber('')
          setMessage(
            `Added ${newName} to phonebook`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const toggleAppearOf = (id) => {
    const person = persons.find(p => p.id === id)
    const url = `http://localhost:3001/persons/${id}`
    const newList = persons.filter(p => p.id !== id)

    if (window.confirm(`Delete ${person.name}?`)) {
      axios.delete(url).then(response => {(response.data)
      })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <h2>Add New Contact</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        nameChange={handleNameChange}
        numberChange={handleNumberChange}
        addInfo={addInfo}/>
      <h2>Numbers</h2>
      <Persons persons={persons} toggleAppear={toggleAppearOf}/>
    </div>
  )
}

export default App
