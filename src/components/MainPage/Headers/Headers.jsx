import React from 'react';
import styled from 'styled-components';

class Headers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      h: 'W1',
    };
  }

  handleClick = newGroup => {
    this.setState({ h: newGroup });
    this.props.onGroupChange(newGroup);
  };

  render() {
    return (
      <List>
        <ListEl>
          {this.state.h === 'W1' ? (
            <ActiveButton onClick={() => this.handleClick('W1')}>
              W1
            </ActiveButton>
          ) : (
            <Button onClick={() => this.handleClick('W1')}>W1</Button>
          )}
        </ListEl>
        <ListEl>
          {this.state.h === 'W2' ? (
            <ActiveButton onClick={() => this.handleClick('W2')}>
              W2
            </ActiveButton>
          ) : (
            <Button onClick={() => this.handleClick('W2')}>W2</Button>
          )}
        </ListEl>
        <ListEl>
          {this.state.h === 'So' ? (
            <ActiveButton onClick={() => this.handleClick('So')}>
              So
            </ActiveButton>
          ) : (
            <Button onClick={() => this.handleClick('So')}>So</Button>
          )}
        </ListEl>
        <ListEl>
          {this.state.h === 'Costa' ? (
            <ActiveButton onClick={() => this.handleClick('Costa')}>
              Costa
            </ActiveButton>
          ) : (
            <Button onClick={() => this.handleClick('Costa')}>Costa</Button>
          )}
        </ListEl>
      </List>
    );
  }
}

const List = styled.ul`
  display: flex;
  justify-content: space-between;
  background-color: #f7f7f7;
  padding: 0;
  list-style-type: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 0;
  /* box-shadow: 0 6px 20px 0px rgba(0, 0, 0); */
`;
const ListEl = styled.li`
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;
const Button = styled.button`
  font-size: 30px;
  font-weight: 500;
  width: 100%;
  height: 40px;
  border: 0;
  background-color: #1c1c1c;
  color: #f7f7f7;
  box-shadow: 0 0px 20px -5px rgba(0, 0, 0);
`;
const ActiveButton = styled.button`
  z-index: 2;
  font-size: 30px;
  font-weight: 500;
  width: 100%;
  height: 40px;
  border: 0;
  background-color: #f7f7f7;
  color: #1c1c1c;
`;

export default Headers;
