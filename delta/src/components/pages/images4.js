// import Unsplash, { toJson } from 'unsplash-js';
import { createApi, search } from 'unsplash-js';
import React, { useState, useEffect } from "react";
import './images.css';

function SearchImages4() {
    const[image, setImage] = useState([]);

    function HandleClick() {
        const searchElement = document.getElementById('search').value;
        console.log(searchElement);
        unsplash.search.getPhotos({
            query: searchElement,
            page: 1,
            perPage: 20,
            orientation: 'landscape'
          }).then(imageObj => {
            let temp = [];
            if (imageObj.response.results.length === 0) {
                setImage(temp);
                return;
            }
            for (let i = 0; i < 20; i++) {
                if (imageObj.response.results.length === i) {
                    break;
                }
                temp.push(imageObj.response.results[i].urls.small);
            }
            setImage(temp);
          });
    }

    function BackToDashboard() {
        window.location.assign('/board');
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
        {image.map((val) => {
            return(
                <button className='imageBox' id='boxed-image' onClick={BackToDashboard}><img src={val}></img></button>
            );
        })}
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

export default SearchImages4;