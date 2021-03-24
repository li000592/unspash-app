import ReactDOM from "react-dom"
import React, { Fragment, useEffect, useState } from "react"
import "./style.css"
import { createApi } from "unsplash-js"

const api = createApi({
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

const Body = () => {
  const [data, setPhotosResponse] = useState(null)

  useEffect(() => {
    api.search
      .getPhotos({ query: "dance", orientation: "landscape" })
      .then((result) => {
        setPhotosResponse(result)
      })
      .catch(() => {
        console.log("something went wrong!")
      })
  }, [])

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
      <div className="feed">
        <ul className="columnUl">
          {data.response.results.map((photo) => (
            <li key={photo.id} className="li">
              <PhotoComp photo={photo} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const Home = () => {
  return (
    <main className="root">
      <Body />
    </main>
  )
}

ReactDOM.render(<Home />, document.getElementById("root"))
