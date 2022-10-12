import React, { useState } from 'react'

import './Form.css'
import '../Results/Results.css'


const Form = () => {

  const [userName, setUserName] = useState(() => "")

  const [gists, setGists] = useState(() => null)

  const showInfo = () => {
    const newUser = {userName}
    fetch(`https://api.github.com/users/${newUser.userName}/gists`, {
      method: 'GET',
    }).then((response) => response.json())
    .then((users) => setGists(users))
    .catch((error) => console.log(error))
  }

  return (<>
        <form method='GET'>
            <label>
                <input placeholder="GitHub username" type="text" value={userName} id="username" name="username"
                onChange={e => setUserName(e.target.value)} required/>
            </label>
            <button type="button" onClick={showInfo}>Show Info</button>
        </form>
        <div className="results">
                      <section>
                        <img src={""} alt="missing avatar..."/>
                        <p>UserName: </p>
                        <p>Description: </p>
                      </section>
          <ol>List of public gists:
          {
            gists && gists.map(gist => {
                        return <li key={gist.id}>
                                  <a href={gist.url}>{gist.url}</a>
                              </li>
            })
          }
          </ol>
        </div>
        </>)
}

export default Form