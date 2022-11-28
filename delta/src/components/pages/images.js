// import Unsplash, { toJson } from 'unsplash-js';
import { createApi, search } from 'unsplash-js';
import React, { useState, useEffect } from "react";

function SearchImages() {
    const[image, setImage] = useState("");
    const [res, setRes] = useState([]);

    function HandleClick() {
        const searchElement = document.getElementById('search').value;
        console.log(searchElement);
        unsplash.search.getPhotos({
            query: searchElement,
            page: 1,
            perPage: 10
          }).then(imageObj => {
            const smallImg = imageObj.response.results[0].urls.small;
            setImage(smallImg);
          });
    }

    /*
    const serverApi = createApi({
        accessKey: 'qcUUfkIE6ckQyfsfpMcdCkPDPwD06w89UOZIZQmQVjM'
      });
    */
    const browserApi = createApi({
        apiUrl: 'https://mywebsite.com/unsplash-proxy'
    });

    const unsplash = createApi({
        accessKey: 'qcUUfkIE6ckQyfsfpMcdCkPDPwD06w89UOZIZQmQVjM',
        // headers: { 'X-Custom-Header': 'foo' },
      });

  return (
    <div>
        <input 
            id='search'
            type="text"
        />
        <button type="button" onClick={HandleClick}>Search</button>
        <img src={image}></img>
    </div>
  );
}

/*
const unsplash = new Unsplash({
  applicationId: "qcUUfkIE6ckQyfsfpMcdCkPDPwD06w89UOZIZQmQVjM",
  secret: "QJ-iFW0XxUocomXIwCw1DoGhew4R4iy8-hYMi0053V8"
});

function searchImages() {
    unsplash.search.photos("cats", 1)
  .then(toJson)
  .then(json => {
    console.log("Image Object: ");
    console.log(json);
  });
}
*/

export default SearchImages;