// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import { useState } from "react";

// function UserDetailView({ activeArticle }) {
//   const [isEdit, setIsEdit] = useState(false);
//   const [state, setState] = useState({
//     image: activeArticle.image,
//     title: activeArticle.title,
//     body: activeArticle.body,
//     category: activeArticle.category,
//   });

//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setState((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const nonEditHTML = (
//     <>
//       <img className="highlight-img" src={activeArticle.image} alt="news article image" />
//       <h2 className="highlight-title">{activeArticle.title}</h2>
//       <p className="highlight-body">{activeArticle.body}</p>
//       {activeArticle.status === "DR" && (
//         <>
//           <Button>Submit</Button>
//           <Button onClick={() => setIsEdit(true)}>Edit</Button>
//         </>
//       )}
//     </>
//   );

//   const editHTML = (
//     <>
//       <img className="highlight-img" src={activeArticle.image} alt="news article image" />
//       <Form>
//         <Form.Group className="mb-3" controlId="title">
//           <Form.Label>Article Title</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Title"
//             name="title"
//             value={state.title}
//             onChange={handleInput}
//           />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="body">
//           <Form.Label>Article Body</Form.Label>
//           <textarea
//             rows="3"
//             class="form-control"
//             placeholder="Body..."
//             name="body"
//             value={state.body}
//             onChange={handleInput}
//           />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="category">
//           <Form.Label>Choose Category</Form.Label>
//           <Form.Select name="category" value={state.category} onChange={handleInput}>
//             <option value="GR">General</option>
//             <option value="SP">Sports</option>
//             <option value="GM">Gaming</option>
//             <option value="FD">Food</option>
//           </Form.Select>
//         </Form.Group>
//       </Form>
//       <Button>Save</Button>
//     </>
//   );

//   return <article className="highlight-article">{isEdit ? editHTML : nonEditHTML}</article>;
// }

// export default UserDetailView;

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditArticle from "./EditArticle";

function UserDetailView() {
  const [state, setState] = useState();

  const { id } = useParams();

  const handleError = (err) => {
    console.warn(err);
  };

  useEffect(() => {
    const getArticle = async (id) => {
      const response = await fetch(`/api/v1/articles/${id}`).catch(handleError);
      if (!response.ok) {
        throw new Error("Network response was not ok!");
      }

      const data = await response.json();
      setState(data);
    };

    getArticle(id);
  }, []);

  return <article className="highlight-article">{state && <EditArticle state={state} />}</article>;
}

export default UserDetailView;
