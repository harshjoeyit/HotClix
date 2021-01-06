import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { createGallery } from '../../../helpers/request'

function CreateGallery() {

    const history = useHistory();
    const initState = {
        name: '',
        error: ''
    }

    // STATE
    const [state, setState] = useState(initState)

    const handleChange = (e) => {
        setState(pr => ({
            ...pr,
            name: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(state.name === '') {
            setState(pr => ({
                ...pr, 
                error: 'Please provide a name'
            }))
            return;
        }

        createGallery({ name: state.name })
            .then(res => {
                let error;
                if(res.response) {
                    error = res.response.data.error
                }
                if(error) {
                    setState(pr => ({
                        ...pr, 
                        error
                    }))
                }
                else {
                    setTimeout(() => {
                        history.push("/upload")
                        window.location.reload()
                    }, 100);
                }
            })
            .catch(console.log)
    }

    return (
        <div className="form-container gallery-form-container">
            <form onSubmit={handleSubmit}>
                <h1>New Gallery</h1>
                {
                    (state.error.length > 0) 
                    ? <div className="error">{ state.error }</div> 
                    : ''
                }
                <div className="input-container"> 
                    <input
                        required
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                    />
                </div>

                <div className="form-btn-container">
                    <button type="submit">Create</button>
                </div>
            </form>
        
        </div>
    )
}

export default CreateGallery
