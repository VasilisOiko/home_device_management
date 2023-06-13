import React, { useState } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';


// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <Form.Control
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value),
          )}
        </ul>
      </div>
    );
  },
);


function sceneSelector(spaces, eventKey, setSelectedSpace)
{
  let id

  id = parseInt(eventKey)

  for(let space of spaces) 
  {
    if (space.id === id)
    {
      setSelectedSpace(space)
      break
    }
  }

}

function SpaceSelection(props)
{


  const getSpaces =       /* list all the names */
  (
    props.spaces.map((space, key) =>(
      <Dropdown.Item
        key={key}
        eventKey={space.id}
        active = {space.id === props.selectedSpace.id? true : false}>
        {space.name}
      </Dropdown.Item>
      )
    )
  )

  return (
    <Dropdown
    onSelect={(eventKey) => sceneSelector(props.spaces, eventKey, props.setSelectedSpace)}
    autoClose={"outside"}>
      <Dropdown.Toggle id="dropdown-custom-components">
        Scenes
      </Dropdown.Toggle>
      <Dropdown.Menu as={CustomMenu}>
        {getSpaces}
      </Dropdown.Menu>
    </Dropdown>
  )

}

export default SpaceSelection;