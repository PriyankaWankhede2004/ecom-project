import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const fonts = [
  { name: 'Arial', label: 'Font1' },
  { name: 'Georgia', label: 'Font2' },
  { name: 'Courier New', label: 'Font3' },
  { name: 'Verdana', label: 'Font4' },
  { name: 'Tahoma', label: 'Font5' },
  { name: 'Times New Roman', label: 'Font6' },
];

const Mysettings = ({ theme, setTheme, font, setFont }) => {
  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4 mt-5">Settings</h2>
      <hr />

      <br />
      {/* Theme  */}
      <h4 className="mb-3 text-start">Select Themes</h4>

      <Row className="mb-5">
        <Col md={6}>
          <Card bg="dark" text="white" className="text-center">
            <Card.Body>
              <Card.Title>Dark Theme</Card.Title>
              <Button variant="light" onClick={() => setTheme('dark')}>Apply</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card bg="light" text="dark" className="text-center">
            <Card.Body>
              <Card.Title>Light Theme</Card.Title>
              <Button variant="dark" onClick={() => setTheme('light')}>Apply</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <hr />

      <br />

      {/* Font  */}
      <h4 className="mb-3 text-start">Select Fonts</h4>
      <Row>
        {fonts.map((f, index) => (
          <Col md={4} className="mb-4" key={index}>
            <Card className="text-center" style={{ fontFamily: f.name }}>
              <Card.Body>
                <Card.Title>{f.label}</Card.Title>
                <p style={{ fontSize: '1.1rem' }}>{f.name}</p>
                <Button
                  variant={font === f.name ? 'primary' : 'secondary'}
                  onClick={() => setFont(f.name)}
                >
                  Apply
                </Button>
              </Card.Body>
            </Card>
            <br />
          </Col>
        ))}
      </Row>
      <br /><hr />

    </Container>
  );
};

export default Mysettings;