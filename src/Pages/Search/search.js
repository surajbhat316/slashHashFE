import React, { useEffect, useState } from "react";

export default function Search() {
  const [universities, setUniversities] = useState([]);

  const [name, setName] = useState("");
  const [country, setCountry] = useState("");

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
                            <td><button className="btn btn-primary">Add to fav</button></td>
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
