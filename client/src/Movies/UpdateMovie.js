import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import {
  Input,
  Label,
  FormGroup,
  Form,
  Button
} from 'reactstrap'

const UpdateMovie = (props) => {
  const { id } = useParams()
  const { push } = useHistory()
  const [movie, setMovie] = useState(null)
  const [actorToAdd, setActorToAdd] = useState('')

  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.error(err))
  }, [id])

  const handleSetMovieChange = e => setMovie({...movie, [e.target.name]: e.target.value })
  const handleActorToAddChange = e => setActorToAdd(e.target.value)

  const removeStar = starToRemove => {
    const newStars = movie.stars.filter(star => star !== starToRemove)
    setMovie({...movie, stars: newStars })
  }

  const addStar = () => {
    setMovie({...movie, stars: [...movie.stars, actorToAdd] })
    setActorToAdd('')
  }

  const deleteMovie = () => {
    axios.delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {console.log(res); push('/')})
      .catch(err => console.error(err)) 
  }

  const addMovie = () => {
    axios.put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        console.log(res); 
        push('/')
        
      })
      .catch(err => console.error(err))
  }

  if(!movie) {
    return <p>Loading...</p>
  }

  return(
    <>
    {console.log(movie)}
    <Form>
      <div className="update-movie">
        <Label>Movie Title:</Label>
        <Input type="text" name="title" value={movie.title} onChange={handleSetMovieChange} />

        <Label>Movie Director:</Label>
        <Input type="text" name="director" value={movie.director} onChange={handleSetMovieChange} />

        <Label>Movie Metascore:</Label>
        <Input type="text" name="metascore" value={movie.metascore} onChange={handleSetMovieChange} />

        <Label>Actors:</Label>
        {movie.stars.map(actor => {
          return <div key={actor}>
            <Button color="danger" onClick={e => {e.preventDefault(); removeStar(actor)}}>X</Button>
            <Label>{actor}</Label>
          </div>
        })}
        <Input type="text" placeholder="Add Actor Here" value={actorToAdd} onChange={handleActorToAddChange} />
        <FormGroup>
          <Button color="primary" onClick={addStar}>Add</Button>
        </FormGroup>
        <Button color="success" onClick={addMovie}>Submit</Button>
        <Button color="danger" onClick={deleteMovie}>Delete</Button>
      </div>
    </Form>
    </>
  )
}

export default UpdateMovie