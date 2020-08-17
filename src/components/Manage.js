import React, {useState, useEffect} from "react"
import axios from 'axios'

const Manage = () => {
  const [daftarMovie, setDaftarMovie] = useState(null)
  const [input, setInput] = useState({ title: "", rating: 1, duration: 0, genre: "", year: 0, description: "", image_url: "" })
  const [statusForm, setStatusForm] = useState("create")
  const [selectedId, setSelectedId]  =  useState(0)

  useEffect( () => {
    if(daftarMovie === null){
      axios.get(`http://backendexample.sanbercloud.com/api/movies`)
        .then(res => {
          console.log(res)
          console.log(res.data)
          setDaftarMovie(res.data.map(el=>{return {id: el.id, title: el.title, rating:el.rating, duration:el.duration, genre:el.genre, year:el.year, description: el.description , image_url: el.image_url}}))
        })
    }
  },[daftarMovie])

  const handleEdit = (event) => {
    // let idBuah = parseInt(event.target.value)
    let idMovie = parseInt(event.target.value)
    console.log(idMovie)

    let dataMovie = daftarMovie.find(x => x.id === idMovie)
    console.log(dataMovie)

    setInput({title: dataMovie.title, rating: dataMovie.rating, genre: dataMovie.genre, duration: dataMovie.duration, year: dataMovie.year, description: dataMovie.description, image_url: dataMovie.image_url})
    setSelectedId(idMovie)
    setStatusForm("edit")
  }

  const handleDelete = (event) => {
    let idMovie = parseInt(event.target.value)

    let newDaftarMovie = daftarMovie.filter(el => el.id != idMovie)

    axios.delete(`http://backendexample.sanbercloud.com/api/movies/${idMovie}`)
    .then(res => {
      console.log(res)
    })
          
    setDaftarMovie([...newDaftarMovie])
    
  }

  const handleChange = (event) =>{
    let typeOfInput = event.target.name

    switch (typeOfInput){
      case "title":
      {
        setInput({...input, title: event.target.value});
        break
      }
      case "rating":
      {
        setInput({...input, rating: event.target.value});
        break
      }
      case "duration":
      {
        setInput({...input, duration: event.target.value});
        break
      }
      case "genre":
      {
        setInput({...input, genre: event.target.value});
        break
      }
      case "year":
      {
        setInput({...input, year: event.target.value});
        break
      }
      case "description":
      {
        setInput({...input, description: event.target.value});
        break
      }
      case "image_url":
      {
        setInput({...input, image_url: event.target.value});
        break
      }
    default:
      {break;}
    }
  }

  const handleSubmit = (event) => {
    // menahan submit
    event.preventDefault()

    let title = input.title
    let rating = input.rating.toString()
    let duration = input.duration.toString()
    let genre = input.genre
    let year = input.year.toString()
    let description = input.description
    let image_url = input.image_url

    if (title.replace(/\s/g,'') !== "" && rating.replace(/\s/g,'') !== "" && duration .replace(/\s/g,'') !== "" && genre.replace(/\s/g,'') !== "" && year.replace(/\s/g,'') !== "" && description.replace(/\s/g,'') !== "" && image_url.replace(/\s/g,'') !== "") {
      if (statusForm === "create") {
        axios.post(`http://backendexample.sanbercloud.com/api/movies`, {title, rating, duration, genre, year, description, image_url})
          .then(res => {
            setDaftarMovie([...daftarMovie, {id: res.data.id, title: title, rating: rating, duration: duration, genre: genre, year: year, description: description, image_url: image_url }])
          })
      } else if (statusForm === "edit") {
        axios.put(`http://backendexample.sanbercloud.com/api/movies/${selectedId}`, {title: input.title, rating: input.rating, duration: input.duration, genre: input.genre, year: input.year, description: input.description, image_url: input.image_url})
          .then(res => {
            console.log(res)
            }
          )
      }
      
      setStatusForm("create")
      setInput({ title: "", rating: 0, duration: 0, genre: "", year: 0, description: "", image_url: "" })
    }

  }


  return (
    <React.Fragment>
      <div className="container">
      <section>
      <h1 className="text-center">Daftar Movie</h1>
      <table class="table table-bordered table-dark">
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Year</th>
            <th>Duration</th>
            <th>Genre</th>
            <th>Rating</th>
            <th>Description</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
            {
              daftarMovie !== null && daftarMovie.map((item, index)=>{
                return(
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.title}</td>
                    <td>{item.year}</td>
                    <td>{item.duration}</td>
                    <td>{item.genre}</td>
                    <td style={{ textAlign: "center" }}>{item.rating}</td>
                    <td>
                        {item.description}
                    </td>
                    <td>
                      {/* <button value={item.id}>Edit</button> */}
                      <button  className="btn btn-info" onClick={handleEdit} value={item.id}>Edit</button>
                      {/* <button value={item.id}>Delete</button> */}
                      <button  className="btn btn-danger" onClick={handleDelete} value={item.id}>Delete</button>
                    </td>
                  </tr>
                )
              })
            }
        </tbody>
      </table>
      {/* Form */}
      <h1 className="text-center">Form Daftar Movie</h1>
      <div style={{width: "50%", margin: "0 auto", display: "block"}}>
        <div style={{border: "1px solid #aaa", padding: "20px"}}>
          {/* <form> */}
          <form onSubmit={handleSubmit}>
            <div class="form-group">
            <label style={{float: "left"}}>Title:</label>
            {/* <input style={{float: "right"}} type="text" name="title"/> */}
            <input style={{float: "right"}} type="text" name="title" value={input.title} onChange={handleChange}/>
            </div>
            <br/>
            <br/>
            <label style={{float: "left"}}>Year:</label>
            {/* <input style={{float: "right"}} type="number" name="year" /> */}
            <input style={{float: "right"}} type="number" name="year" value={input.year} onChange={handleChange}/>
            <br/>
            <br/>
            <label style={{float: "left"}}>Duration (in minutes):</label>
            {/* <input style={{float: "right"}} type="number" name="duration" /> */}
            <input style={{float: "right"}} type="number" name="duration" value={input.duration} onChange={handleChange}/>
            <br/>
            <br/>
            <label style={{float: "left"}}>Genre:</label>
            {/* <input style={{float: "right"}} type="text" name="genre" /> */}
            <input style={{float: "right"}} type="text" name="genre" value={input.genre} onChange={handleChange}/>
            <br/>
            <br/>
            <label style={{float: "left"}}>Rating (1 sampai 10):</label>
            {/* <input style={{float: "right"}} type="number" name="rating" /> */}
            <input min="1" max="10" style={{float: "right"}} type="number" name="rating" value={input.rating} onChange={handleChange} />
            <br/>
            <br/>
            <label style={{float: "left"}}>Description:</label>
            {/* <textarea style={{float: "right"}} type="text" name="description" /> */}
            <textarea style={{float: "right"}} type="text" name="description" value={input.description} onChange={handleChange} />
            <br/>
            <br/>
            <br/>
            <br/>
            <label style={{float: "left"}}>Link Gambar:</label>
            {/* <textarea style={{float: "right"}} type="text" name="description" /> */}
            <textarea style={{float: "right"}} type="text" name="image_url" value={input.image_url} onChange={handleChange} />
            <br/>
            <br/>
            <br/>
            <div style={{width: "100%", paddingBottom: "20px"}}>
            <button type="submit" class="btn btn-primary" style={{ float: "right"}}>Submit</button>
            </div>
          </form>
        </div>
      </div>
      </section>
      </div>
    </React.Fragment>
  )
}
export default Manage