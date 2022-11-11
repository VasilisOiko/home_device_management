import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

function GridExample() {
  return (
    <Row xs={1} md={1} className="g-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Col>
          <Card
          bg={'Light'.toLowerCase()}
          key={'Light'}
          text={'Light'.toLowerCase() === 'light' ? 'dark' : 'white'}
          style={{ width: '14rem' }}
          className="mb-2"
          >
            <Card.Body>
              <Card.Title>Scene</Card.Title>
              <Button variant="primary">Show Devices</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default GridExample;