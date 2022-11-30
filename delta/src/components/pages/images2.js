import { createApi, search } from 'unsplash-js';
import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import {addDoc, collection, getDocs, query, where, updateDoc, getFirestore, doc} from 'firebase/firestore';
import {database, author} from '../../firebase';
import '../../styles/images.css';

function SearchImages2() {
    const[image, setImage] = useState([]);

    if (performance.getEntriesByType("navigation")[0].type === "reload")
    {
        window.location.assign("/");
    }

    function HandleClick() {
        const searchElement = document.getElementById('search').value;
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
                const imageAndAuthor = {
                  image: imageObj.response.results[i].urls.small,
                  authorName: imageObj.response.results[i].user.name
                }
                temp.push(imageAndAuthor);
            }
            setImage(temp);
          });
    }

    async function saveImageData(imageToSave, authorToSave)
    {
      const user = author.currentUser.uid;
      const imageQ = query(collection(database, "imageData"), where("authorID", "==", user));
      const imageQRes = await getDocs(imageQ);
      if (imageQRes.docs.length !== 0)
      {
        const imageID = imageQRes.docs[0].id;
        const imageToUpdate = doc(getFirestore(), "imageData", imageID);
        await updateDoc(imageToUpdate, {box2: imageToSave, author2: authorToSave});
      }
      else
      {
        await addDoc (collection(database, "imageData"), {
          authorName: author.currentUser.displayName,
          authorID: author.currentUser.uid,
          box1: "",
          author1: "",
          box2: imageToSave,
          author2: authorToSave,
          box3: "",
          author3: "",
          box4: "",
          author4: ""
        }
        );
      }
    }

    async function BackToDashboard(i) {
      const imageSrc = document.getElementById("imageInsideBox" + i).src;
      const authName = image[i].authorName;
      if (authName === null)
      {
        authName = "Anonymous";
      }
      await saveImageData(imageSrc, authName);
        window.location.assign('/board');
    }

    const browserApi = createApi({
        apiUrl: 'https://mywebsite.com/unsplash-proxy'
    });

    const unsplash = createApi({
        accessKey: 'qcUUfkIE6ckQyfsfpMcdCkPDPwD06w89UOZIZQmQVjM',
      });

      return (
        <div className='imageWrapper'>
            <div className='imageTitle'>
              &ensp;&ensp;&ensp;IMAGE SEARCH&ensp;&ensp;&ensp;
            </div>
            <input className='inputText'
                id='search'
                type="text"
            />
            <button type="button" onClick={HandleClick} className='buttonSearch'>Search</button>
            <br></br>
            Images from Unsplash
            <br></br>
            <Link className='imageLink' to="/board">Go back</Link>
            {image.map((val, i) => {
                return(
                  <div>
                    <button className='imageBox' id='boxed-image' onClick={() => BackToDashboard(i)}>
                      <img id={"imageInsideBox" + i} src={val.image}></img>
                    </button>
                    <br></br>
                    <small className='author'>Author: {val.authorName}</small>
                    <br></br>
                  </div>
                );
            })}
        </div>
      );
}

export default SearchImages2;