import React, { useEffect, useState } from "react";

export default function Search() {
  const [universities, setUniversities] = useState([]);

  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [favNames, setFavNames] = useState([]);

  useEffect(() => {
    async function getUniversities() {
      const resp = await fetch("http://localhost:8000", {
        method: "GET",
        credentials: "include",
      });

      const data = await resp.json();
      // console.log("data => ", data)
    }
    getUniversities();


    async function getFavs() {
        const resp = await fetch("http://localhost:8000/get-fav", {
          method: "GET",
          credentials: "include",
        });
  
        const data = await resp.json();
        console.log("favs => ", data)
        const favnamesList = [];
        if(data){
            data.data.forEach((element) => {
                favnamesList.push(element.name);
            })
        }

        setFavNames([...favnamesList]);
      }
      getFavs();


  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    async function getUniversities() {
      const resp = await fetch(
        `http://localhost:8000?name=${name}&country=${country}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await resp.json();
      if (data) {
        const actualData = data.data;
        setUniversities([...actualData]);
      }
    }
    getUniversities();
  };

  const addToFavs = (e, name) => {
    async function setFavs(){
        const resp = await fetch("http://localhost:8000/set-fav", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({name}),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await resp.json();
        console.log("data ", data);

    }

    setFavs();
  }

  return (
    <div>
      <div>
        <form>
          <label className="form-label">
            Name
            <input
              onChange={handleNameChange}
              className="form-control"
              type="text"
              placeholder="Enter name"
            />
          </label>

          <label className="form-label">
            Country
            <input
              onChange={handleCountryChange}
              className="form-control"
              type="text"
              placeholder="Enter Country"
            />
          </label>

          <button onClick={handleFormSubmit} className="btn btn-primary">
            Submit
          </button>
        </form>

        <div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Add to Fav</th>
              </tr>
            </thead>
            <tbody>
              {universities.map((university,index) => {
                return (
                       <>
                            <th scope="row">{index}</th>
                            <td>{university.name}</td>
                            <td><button onClick={(e) => addToFavs(e, university.name)} className="btn btn-primary" disabled = {favNames.includes(university.name)}>
                                {favNames.includes(university.name) ? "Added To Favs" : "Add to Favs"}

                            </button></td>
                       </> 
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
