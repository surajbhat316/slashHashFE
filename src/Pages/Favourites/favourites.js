import React, { useEffect, useState } from "react";

export default function Favourites() {
  const [favNames, setFavNames] = useState([]);

  useEffect(() => {
    async function getFavs() {
      const resp = await fetch("http://localhost:8000/get-fav", {
        method: "GET",
        credentials: "include",
      });

      const data = await resp.json();
      console.log("favs One  => ", data);
      const favnamesList = [];
      if (data) {
        data.data.forEach((element) => {
          favnamesList.push(element.name);
        });
      }

      setFavNames([...favnamesList]);
    }
    getFavs();
  }, []);

  return (
    <>
      <h1>favourites</h1>

      <ul>
        {favNames.map((fav) => {
            return (
                <li>{fav}</li>
            )
        })}
      </ul>
    </>
  );
}
