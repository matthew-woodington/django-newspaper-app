import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Cookies from 'js-cookie'

function CreateArticle() {
    const [state, setState] = useState({
        image: null,
        title: '', 
        body: '',
        category: '',
    });

    const handleError = (err) => {
        console.warn(err);
      };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    };

    const handleImage = (e) => {
        const file = e.target.files[0]
        setState({
            ...state,
            image: file,
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();

        formData.append('image', state.image);
        formData.append('title', state.title);
        formData.append('body', state.body);
        formData.append('category', state.category);
        formData.append('status', e.target.value);

        const options = {
            method: 'POST',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: formData,
        }

        const response = await fetch('/api/v1/articles/', options).catch(handleError);
        if (!response.ok) {
            throw new Error("Network response was not OK");
        } else {
            const data = await response.json();
            console.log(data)
            setState({
                image: null,
                title: '', 
                body: '',
                category: '',
            })
        }
    }

    return(
    <Form>
        <h1>Create New Article</h1>
        <input 
            type="file"
            class="form-control-file" 
            name='image'
            onChange={handleImage}
            />
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Article Title</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Title"
            name='title'
            value={state.title}
            onChange={handleInput}
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="body">
          <Form.Label>Article Body</Form.Label>
            <textarea
                rows='3'
                class="form-control" 
                placeholder='Body...'
                name="body" 
                value={state.body}
                onChange={handleInput}
                />
        </Form.Group>
        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Choose Category</Form.Label>
          <Form.Select 
            name='category'
            value={state.category}
            onChange={handleInput}>
                <option value='GR'>General</option>
                <option value='SP'>Sports</option>
                <option value='GM'>Gaming</option>
                <option value='FD'>Food</option>
            </Form.Select>
        </Form.Group>
        <Button 
            variant="dark" 
            type="submit"
            value="DR"
            onClick={handleSubmit}
            >
          Save
        </Button>
        <Button 
            variant="dark" 
            type="submit"
            value="SM"
            onClick={handleSubmit}
            >
          Submit
        </Button>
    </Form>
    )
}

export default CreateArticle;