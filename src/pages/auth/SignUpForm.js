import React, { useState } from 'react';
import { Container, Card, Row, Col, Image, Form, Button } from 'react-bootstrap';
import styles from '../../styles/SignInUpForm.module.css';
import btnStyles from '../../styles/Button.module.css';
import logo from '../../assets/logo.png';
import signUphero from '../../assets/signUphero.jpg';

function SignUpForm() {
  const [signUpData, setSignUpData] = useState({
    username: '',
    password1: '',
    password2: '',
  });
  const { username, password1, password2 } = signUpData;

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Container className="my-5">
      <Card>
        <Row className={`${styles.Row} g-0 text-center`}>
          <Col md={6} className="d-none d-md-block">
            <Image className={styles.heroImage} src={signUphero} alt="Signup form image" />
          </Col>
          <Col md={6}>
            <Card.Body className="d-flex flex-column">
              <div className="d-flex flex-row mt-2">
                <img src={logo} height="50" className="me-3" alt='logo' />
                <span className={`${styles.Header} h1 fw-bold`}>Sign Up</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>
                Create a new account
              </h5>

              <Form>
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

                <Form.Group className="mb-4" controlId="password1">
                  <Form.Control
                    className={styles.Input}
                    size="lg"
                    type="password"
                    placeholder="Password"
                    name="password1"
                    value={password1}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="password2">
                  <Form.Control
                    className={styles.Input}
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    size="lg"
                    value={password2}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button className={`${btnStyles.Wide} mb-4 px-5`} variant="dark" size="lg">
                  Register
                </Button>
              </Form>

              <a className="small text-muted" href="#!">
                Forgot password?
              </a>
              <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                Already have an account?{' '}
                <a href="#!" style={{ color: '#393f81' }}>
                  Sign in
                </a>
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

export default SignUpForm;
