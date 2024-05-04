import React from 'react';
import styled from 'styled-components';

class Headers extends React.Component {
  handleClick = newGroup => {
    this.props.onGroupChange(newGroup);
  };

  render() {
    return (
      <List>
        <ListEl>
          <Button onClick={() => this.handleClick('W1')}>W1</Button>
        </ListEl>
        <ListEl>
          <Button onClick={() => this.handleClick('W2')}>W2</Button>
        </ListEl>
        <ListEl>
          <Button onClick={() => this.handleClick('So')}>So</Button>
        </ListEl>
        <ListEl>
          <Button onClick={() => this.handleClick('Costa')}>Costa</Button>
        </ListEl>
      </List>
    );
  }
}

const List = styled.ul`
  width: 100vw;
  display: flex;
  justify-content: space-between;
  background-color: blueviolet;
  padding: 0;
  list-style-type: none;
`;
const ListEl = styled.li`
  font-size: 32px;
  font-weight: 700;
  flex-grow: 1;
  margin: 10px;
  color: #ff8c00;
  background-color: aquamarine;
  display: flex;
  justify-content: center;
`;
const Button = styled.button`
  width: 100%;
  background-color: #ff7fc5;
`;

export default Headers;
