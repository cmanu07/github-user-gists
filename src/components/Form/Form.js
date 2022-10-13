import React, { useState } from 'react'

import './Form.css'

import { Octokit } from "@octokit/core"


const Form = () => {

  const [userName, setUserName] = useState(() => "")
  const [userToShow, setUserToShow] = useState(() => "")
  const [avatarToShow, setAvatarToShow] = useState(() => "")
  const [descrToShow, setDescrToShow] = useState(() => "")

  const [gists, setGists] = useState(() => null)

  const showInfo = async () => {

    const octokit = new Octokit({
      auth: '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'
    })   
    const response = await octokit.request('GET /users/{username}/gists', {
      username: userName,
      avatar: 'owner/avatar_url'
    });
    setUserToShow(userName)
    setAvatarToShow(response.data.at(0).owner.avatar_url)
    setDescrToShow(response.data.at(0).description)
    setGists(response.data)
    
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
                        {avatarToShow ? <img src={avatarToShow} alt="missing avatar..."/> : ""}
                        {userToShow ? <p>UserName: {userToShow}</p> : ""}
                        {descrToShow ? <p>Description: {descrToShow}</p> : ""}
                      </section>
          <ol>{userName ? <span>List of public gists:</span> : ""}
          {
            gists && gists.map(gist => {
                        return <li key={gist.id}>
                                      <a href={gist.url}>
                                      {gist.url}
                                      </a>
                                      <p>Date of creation: {(gist.created_at).slice(0,10)}</p>
                                      <p>Language: <span style={{color: '#FF9677'}}>{gist.files.language}</span></p>
                                      <p>Forks: {}</p>
                                      <p>Users who fork: </p>
                              </li>
            })
          }
          </ol>
        </div>
        </>)
}

export default Form