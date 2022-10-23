import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

function EditArticle({ state }) {
  const [isEdit, setIsEdit] = useState(false);
  const [article, setArticle] = useState({
    ...state,
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setArticle((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const nonEditHTML = (
    <>
      <img className="highlight-img" src={state.image} alt="news article image" />
      <h2 className="highlight-title">{state.title}</h2>
      <p className="highlight-body">{state.body}</p>
      {state.status === "DR" && (
        <>
          <Button>Submit</Button>
          <Button onClick={() => setIsEdit(true)}>Edit</Button>
        </>
      )}
    </>
  );

  const editHTML = (
    <>
      <img className="highlight-img" src={article.image} alt="news article image" />
      <Form>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Article Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            name="title"
            value={article.title}
            onChange={handleInput}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="body">
          <Form.Label>Article Body</Form.Label>
          <textarea
            rows="3"
            class="form-control"
            placeholder="Body..."
            name="body"
            value={article.body}
            onChange={handleInput}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Choose Category</Form.Label>
          <Form.Select name="category" value={article.category} onChange={handleInput}>
            <option value="GR">General</option>
            <option value="SP">Sports</option>
            <option value="GM">Gaming</option>
            <option value="FD">Food</option>
          </Form.Select>
        </Form.Group>
      </Form>
      <Button>Save</Button>
    </>
  );

  return <>{isEdit ? editHTML : nonEditHTML}</>;
}

export default EditArticle;
