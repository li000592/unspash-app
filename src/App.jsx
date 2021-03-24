import logo from "./logo.svg"
import "./App.css"
import React, { Fragment, useEffect, useState } from "react"
import { createApi } from "unsplash-js"
import searchIcon from "./searchIcon.svg"

const api = createApi({
  // Don't forget to set your access token here!
  // See https://unsplash.com/developers
  accessKey: "vtMyMpkVNPQTwn8S1Kjk4zHvtLwux87C2-9rbFSYzZc",
})
const PhotoComp = ({ photo }) => {
  const { user, urls } = photo
  return (
    <Fragment>
      <img className="img" src={urls.regular} />
      <a className="credit" target="_blank" href={`https://unsplash.com/@${user.username}`}>
        {user.name}
      </a>
    </Fragment>
  )
}
function App() {
  const [data, setPhotosResponse] = useState(null)
  const [query, setQuery] = useState("dance")
  useEffect(() => {
    api.search
      .getPhotos({ query: query, orientation: "landscape" })
      .then((result) => {
        setPhotosResponse(result)
      })
      .catch(() => {
        console.log("something went wrong!")
      })
  }, [query])

  if (data === null) {
    return <div>Loading...</div>
  } else if (data.errors) {
    return (
      <div>
        <div>{data.errors[0]}</div>
        <div>PS: Make sure to set your access token!</div>
      </div>
    )
  } else {
    return (
      <>
        <div className="search-container">
          <form className="search">
            <input
              className="searchInput"
              type="text"
              name="searchCountry"
              placeholder="Search"
              onChange={(ev) => setQuery(ev.target.value)}
            />
            <img src={searchIcon} className="searchIcon" alt="searchIcon" />
          </form>
        </div>

        <div className="feed">
          <ul className="columnUl">
            {data.response.results.map((photo) => (
              <li key={photo.id} className="li">
                <PhotoComp photo={photo} />
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }
}

export default App
