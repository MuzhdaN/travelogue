import React, { useRef, useState } from 'react';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import Upload from "../../assets/upload.png";
// import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset"
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { axiosReq } from "../../api/axiosDefaults";



const CreateArticleForm = () => {
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    location: '',
    budget: '',
    tripDuration: '',
    place: '',
    image: '',
  });

  const {title, content, location, budget, tripDuration, place, image} = formData;

  const imageInput = useRef(null);
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
;
  const handleImageChange = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setFormData({
        ...formData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("location", location);
    formData.append("budget", budget);
    formData.append("tripDuration", tripDuration);
    formData.append("place", place);
    formData.append("image", imageInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/posts/", formData);
      history.push(`/posts/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Container>
      <h1 className="text-center mb-4">Write...</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBudget">
              <Form.Label>Budget</Form.Label>
              <Form.Control
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formTripDuration">
              <Form.Label>Trip Duration (in days)</Form.Label>
              <Form.Control
                type="number"
                name="tripDuration"
                value={formData.tripDuration}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPlace">
              <Form.Label>Place</Form.Label>
              <Form.Control
                type="text"
                name="place"
                value={formData.place}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={8}
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Container  className={` ${appStyles.container} ${appStyles.Content} d-flex flex-column justify-content-center`}>
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleImageChange}
                ref={imageInput}
              />
            </Form.Group>
            </Container>
          </Col>
        </Row>
  
      <Row className="justify-content-center">
        <Col  className="text-center">
          <Button className={`${btnStyles.Button} ${btnStyles.Blue} `} type="submit">
            Submit
          </Button>
          <Button
            className={`${btnStyles.Button} ${btnStyles.Blue}`}
            onClick={() => {}}
          >
            Cancel
          </Button>
        </Col>
      </Row>
    </Form>
  </Container>
  );
};

export default CreateArticleForm;