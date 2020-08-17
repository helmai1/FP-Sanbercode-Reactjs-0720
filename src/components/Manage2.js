import React, {useState, useEffect} from "react"
import axios from 'axios'

const Manage2 = () => {
  const [daftarGame, setDaftarGame] = useState(null)
  const [input, setInput] = useState({ name: "", singlePlayer: 1, multiplayer: 0, genre: "", release: 0, platform: "", image_url: "" })
  const [statusForm, setStatusForm] = useState("create")
  const [selectedId, setSelectedId]  =  useState(0)

  useEffect( () => {
    if(daftarGame === null){
      axios.get(`https://backendexample.sanbersy.com/api/games`)
        .then(res => {
          console.log(res)
          console.log(res.data)
          setDaftarGame(res.data.map(el=>{return {id: el.id, name: el.name, singlePlayer:el.singlePlayer, multiplayer:el.multiplayer, genre:el.genre, release:el.release, platform: el.platform , image_url: el.image_url}}))
        })
    }
  },[daftarGame])

  const handleEdit = (event) => {
    // let idBuah = parseInt(event.target.value)
    let idGame = parseInt(event.target.value)
    console.log(idGame)

    let dataGame = daftarGame.find(x => x.id === idGame)
    console.log(dataGame)

    setInput({name: dataGame.name, singlePlayer: dataGame.singlePlayer, multiplayer: dataGame.multiplayer, genre: dataGame.genre, release: dataGame.release, platform: dataGame.platform, image_url: dataGame.image_url})
    setSelectedId(idGame)
    setStatusForm("edit")
  }

  const handleDelete = (event) => {
    let idGame = parseInt(event.target.value)

    let newDaftarGame = daftarGame.filter(el => el.id != idGame)

    axios.delete(`https://backendexample.sanbersy.com/api/games/${idGame}`)
    .then(res => {
      console.log(res)
    })
          
    setDaftarGame([...newDaftarGame])
    
  }

  const handleChange = (event) =>{
    let typeOfInput = event.target.name

    switch (typeOfInput){
      case "name":
      {
        setInput({...input, name: event.target.value});
        break
      }
      case "genre":
      {
        setInput({...input, genre: event.target.value});
        break
      }
      case "singlePlayer":
      {
        setInput({...input, singlePlayer: event.target.value});
        break
      }
      case "multiplayer":
      {
        setInput({...input, multiplayer: event.target.value});
        break
      }
      case "platform":
      {
        setInput({...input, platform: event.target.value});
        break
      }
      case "release":
      {
        setInput({...input, release: event.target.value});
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

    let name = input.name
    let singlePlayer = input.singlePlayer.toString()
    let multiplayer = input.multiplayer.toString()
    let genre = input.genre
    let release= input.release.toString()
    let platform = input.platform
    let image_url = input.image_url

    if (name.replace(/\s/g,'') !== "" && singlePlayer.replace(/\s/g,'') !== "" && multiplayer .replace(/\s/g,'') !== "" && genre.replace(/\s/g,'') !== "" && release.replace(/\s/g,'') !== "" && platform.replace(/\s/g,'') !== "" && image_url.replace(/\s/g,'') !== "") {
      if (statusForm === "create") {
        axios.post(`https://backendexample.sanbersy.com/api/games`, {name, singlePlayer, multiplayer, genre, release, platform, image_url})
          .then(res => {
            setDaftarGame([...daftarGame, {id: res.data.id, name: name, singlePlayer: singlePlayer, multiplayer: multiplayer, genre: genre, release: release, platform: platform, image_url: image_url }])
          })
      } else if (statusForm === "edit") {
        axios.put(`https://backendexample.sanbersy.com/api/games/${selectedId}`, {name: input.name, singlePlayer: input.singlePlayer, multiplayer: input.multiplayer, genre: input.genre, release: input.release, platform: input.platform, image_url: input.image_url})
          .then(res => {
            console.log(res)
            }
          )
      }
      
      setStatusForm("create")
      setInput({ name: "", singlePlayer: 0, multiplayer: 0, genre: "", release: 0, platform: "", image_url: "" })
    }

  }


  return (
    <React.Fragment>
      <div className="container">
        <section>
      <h1 className="text-center">Daftar Game</h1>
      <table class="table table-bordered table-dark">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Genre</th>
            <th>Platform</th>
            <th>Release</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
            {
              daftarGame !== null && daftarGame.map((item, index)=>{
                return(
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>{item.genre}</td>
                    <td>{item.platform}</td>
                    <td>{item.release}</td>   
                    <td>
                      {/* <button value={item.id}>Edit</button> */}
                      <button className="btn btn-info" onClick={handleEdit} value={item.id}>Edit</button>
                      &nbsp;
                      {/* <button value={item.id}>Delete</button> */}
                      <button className="btn btn-danger" onClick={handleDelete} value={item.id}>Delete</button>
                    </td>
                  </tr>
                )
              })
            }
        </tbody>
      </table>
      {/* Form */}
      <h1 className="text-center">Form Daftar Game</h1>
      <div style={{width: "50%", margin: "0 auto", display: "block"}}>
        <div style={{border: "1px solid #aaa", padding: "20px"}}>
          {/* <form> */}
          <form onSubmit={handleSubmit}>
            <label style={{float: "left"}}>Name:</label>
            {/* <input style={{float: "right"}} type="text" name="title"/> */}
            <input style={{float: "right"}} type="text" name="name" value={input.name} onChange={handleChange}/>
            <br/>
            <br/>
            <label style={{float: "left"}}>Genre:</label>
            {/* <input style={{float: "right"}} type="text" name="title"/> */}
            <input style={{float: "right"}} type="text" name="genre" value={input.genre} onChange={handleChange}/>
            <br/>
            <br/>
            <label style={{float: "left"}}>Release:</label>
            {/* <input style={{float: "right"}} type="number" name="year" /> */}
            <input style={{float: "right"}} type="number" name="release" value={input.release} onChange={handleChange}/>
            <br/>
            <br/>
            <label style={{float: "left"}}>Single Player:</label>
            {/* <input style={{float: "right"}} type="number" name="duration" /> */}
            <input style={{float: "right"}} type="number" name="singlePlayer" value={input.singlePlayer} onChange={handleChange}/>
            <br/>
            <br/>
            <label style={{float: "left"}}>Multiplayer:</label>
            {/* <input style={{float: "right"}} type="number" name="rating" /> */}
            <input min="1" max="10" style={{float: "right"}} type="number" name="multiplayer" value={input.multiplayer} onChange={handleChange} />
            <br/>
            <br/>
            <label style={{float: "left"}}>Platform:</label>
            {/* <input style={{float: "right"}} type="text" name="title"/> */}
            <input style={{float: "right"}} type="text" name="platform" value={input.platform} onChange={handleChange}/>
            <br/>
            <br/>
            <label style={{float: "left"}}>Link Gambar:</label>
            {/* <textarea style={{float: "right"}} type="text" name="description" /> */}
            <textarea style={{float: "right"}} type="text" name="image_url" value={input.image_url} onChange={handleChange} />
            <br/>
            <br/>
            <br/>
            <div style={{width: "100%", paddingBottom: "20px"}}>
              <button type="submit" className="btn btn-primary" style={{ float: "right"}}>Submit</button>
            </div>
          </form>
        </div>
      </div>
      </section>
      </div>
    </React.Fragment>
  )
}
export default Manage2