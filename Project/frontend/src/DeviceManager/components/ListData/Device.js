import React from 'react'

import Card from 'react-bootstrap/Card';

function Device({device}) {

  return (
    <Card key={device.id} bg={'light'} text={'dark'}>
        <Card.Header>
            {device.alias}
        </Card.Header>

        <Card.Body>
            <Card.Text>
                Buttons and other components
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Device