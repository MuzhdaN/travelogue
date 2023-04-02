import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { Container, Card, Row, Col, Image, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

import styles from '../../styles/SignInUpForm.module.css';
import btnStyles from '../../styles/Button.module.css';
import logo from '../../assets/logo.png';
import signUphero from '../../assets/signUphero.jpg';
import { useSetCurrentUser } from '../../contexts/CurrentUserContext';


function SignInForm() {
  const setCurrentUser = useSetCurrentUser();

  const [signInData, setSignInData] = useState({
    username: '',
    password: '',
  });
  const { username, password } = signInData;

  const [errors, setErrors] = useState({});

  const history = useHistory();
  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {data} = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      history.push("/");
    } catch (err) {
      setErrors(err.response?.data);
      console.log("data cant add");
    }
  };

  return (
    <Container className="my-5">
      <Card>
        <Row className={`${styles.Row} g-0 text-center`}>
          <Col md={6} className="d-none d-md-block">
            <Image className={styles.heroImage} src={signUphero} alt="Signin form image" />
          </Col>
          <Col md={6}>
            <Card.Body className="d-flex flex-column">
              <div className="d-flex flex-row mt-2">
                <img src={logo} height="50" className="me-3" alt='logo' />
                <span className={`${styles.Header} h1 fw-bold`}>Sign In</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>
                Welcome Back! Please enter your details.
              </h5>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="username">
                  <Form.Control
                    className={styles.Input}
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={username}
                    size="lg"
                    onChange={handleChange}
                  />
                </Form.Group>
                {errors.username?.map((message, idx) => (
                    <Alert key={idx} variant="warning">
                        {message}
                    </Alert>
                ))}

                <Form.Group className="mb-4" controlId="password1">
                  <Form.Control
                    className={styles.Input}
                    size="lg"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                  />
                </Form.Group>
                {errors.password?.map((message, idx) => (
                    <Alert key={idx} variant="warning">
                        {message}
                    </Alert>
                ))}

                <Button 
                  className={`${btnStyles.Wide} mb-4 px-5`} 
                  variant="dark" 
                  size="lg"
                  type='submit'
                >
                  Sign in
                </Button>
                {errors.non_field_errors?.map((message, idx) => (
                  <Alert key={idx} variant="warning" className="mt-3">
                    {message}
                  </Alert>
                ))}
              </Form>

              <a className="small text-muted" href="#!">
                Forgot password?
              </a>
              <p className="mb-5 pb-lg-2">
                <Link className={styles.Link} to="/signup">
                  Don't have an account? <span>Sign up</span>
                </Link>
              </p>

              <div className="d-flex flex-row justify-content-start">
                <a href="#!" className="small text-muted me-1">
                  Terms of use.
                </a>
                <a href="#!" className="small text-muted">
                  Privacy policy
                </a>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default SignInForm;
