import React from 'react'

import './Form.css'

const Form = () => {
  return (
    <>
        <form>
            <label>
                <input placeholder="GitHub username" type="text" id="username" name="username" required/>
            </label>
            <button>Show Info</button>
        </form>
    </>
  )
}

export default Form