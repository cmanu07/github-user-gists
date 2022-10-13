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
      auth: ''    // <-- your token here
    })   
    const response = await octokit.request('GET /users/{username}/gists', {
      username: userName,
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
                        {userToShow ? <p><em>UserName:</em> {userToShow}</p> : ""}
                        {userToShow ? <p><em>Description:</em> {descrToShow}</p> : ""}
                      </section>
          <ol>{userToShow ? <span className='ol-list'>List of public gists:</span> : ""}
          {
            gists && gists.map(gist => {
                          const {id, created_at, url} = gist;
                          // aici nu am reusit sa obtin mai multe info si sa le mapez mai jos
                        return <li key={id}>
                                      <a href={url} target="_blank" rel="noreferrer">
                                      {url}
                                      </a>
                                      <p><em>Date of creation:</em> {(created_at).slice(0,10)}</p>
                                      <p><em>Programming language:</em> <span style={{color: '#FF9677'}}>{}</span></p>
                                      <p><em>Forks:</em> {}</p>
                                      <p><em>Users who fork:</em> {}</p>
                              </li>
            })
          }
          </ol>
        </div>
        </>)
}

export default Form