import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

// import notes from '../assets/data'

const NotePage = () => {

  let params = useParams();
  let navigate = useNavigate();
  let noteId = params.id;


  let [note, setNote] = useState(null)

  useEffect ( () => {
    getNote()
  }, [noteId])

  let getNote = async() => {
    if (noteId === 'new') return
    let response = await fetch(`/api/notes/${noteId}`)
    let data = await response.json()
    setNote(data)
  }

  let createNote = async () => {
    await fetch(`/api/notes/create/`, {
      method: 'POST', 
      headers: {
        'Content-Type':'application/json'
      }, 
      body: JSON.stringify({...note, 'updated': new Date()})
    })

    // navigate('/')
  }

  let updateNote = async () => {
      await fetch(`/api/notes/${noteId}/update/`, {
        method: 'PUT', 
        headers: {
          'Content-Type':'application/json'
        }, 
        body: JSON.stringify(note)
      })
  }

  let deleteNote = async () => {
    await fetch(`/api/notes/${noteId}/delete/`, {
      method: 'DELETE', 
      headers: {
        'Content-Type':'application/json'
      }, 
      body: JSON.stringify(note)
    })
    navigate('/')
  }

  let handleSubmit = () => {

    if (noteId !== 'new' && !note.body) {
      deleteNote()  
      return 
    } else if (noteId !== 'new') {
      updateNote()
    } else if (noteId === 'new' && note !== null) {
      createNote()
    }

    navigate('/')
  }

  return (
    <div className='note'>
      <div className="note-header">
        <div>
          <h3>
            <Link to='/'>
              <ArrowLeft onClick={handleSubmit} />
            </Link>
          </h3>
        </div>
        <div>
            {noteId !== 'new' ? (
              <button onClick={deleteNote}>Delete</button>
            ) : (
              <button onClick={handleSubmit}>Done</button>
            )}
            
        </div>

      </div>
      <textarea onChange={(e) => {setNote({...note, 'body': e.target.value})}} value={note?.body} ></textarea>
    </div>
  )
}

export default NotePage