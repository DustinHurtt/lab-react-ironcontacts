import { useState } from 'react';

import data from './contacts.json'
import './App.css';

function App() {

 const [ shownContacts, setShownContacts ] = useState(data.slice(0,5))

 console.log(shownContacts)

 const addRandom = () => {

    let remainingContacts = data.filter((contact) => {
      return !shownContacts.includes(contact)}
      )

    // let remainingContacts = data.filter((contact) => {
    //   return !shownContacts.some((remainingContact) => remainingContact.id === contact.id)
    // })

    let newContacts = [...shownContacts]

    let randomIndex = Math.floor(Math.random() * remainingContacts.length)

    newContacts.push(remainingContacts[randomIndex])
    
    if (remainingContacts.length > 0) {
      setShownContacts(newContacts)
    } else {
      setShownContacts(shownContacts)
    }

    console.log(remainingContacts)

 }

 const sortByPopularity = () => {

  let sorted = [...shownContacts].sort((a,b) => b.popularity - a.popularity)
  
  setShownContacts(sorted)

 }

 const sortByName = () => {

  let sorted = [...shownContacts].sort((a,b) => a.name.localeCompare(b.name))
  setShownContacts(sorted)

 }

 const deleteContact = (id) => {
  let filtered = [...shownContacts].filter((element) => {
    return element.id !== id
  })
  setShownContacts(filtered)
 }

  return (
    <div >

    <h1>IronContacts</h1>
    <button onClick={addRandom}>Add Random Contact</button>
    <button onClick={sortByPopularity}>Sort by Popularity</button>
    <button onClick={sortByName}>Sort by Name</button>
    <table>
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won Oscar</th>
          <th>Won Emmy</th>
        </tr>
      </thead>
      <tbody>
        {shownContacts.map((element) => {
          return (
            <tr key={element.id}>
              <td><img src={element.pictureUrl} alt='contact'/></td>
              <td>{element.name}</td>
              <td>{element.popularity.toFixed(2)}</td>
              <td>{element.wonOscar && <p>🏆</p>}</td>
              <td>{element.wonEmmy && <p>🏆</p>}</td>
              <td><button onClick={()=>deleteContact(element.id)}>Delete Contact</button></td>
            </tr>
          )
        })}
      </tbody>
    </table>

    </div>
  );
}

export default App;
