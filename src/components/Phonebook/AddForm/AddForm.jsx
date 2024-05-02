import React from 'react';
import styled from 'styled-components';

class AddForm extends React.Component {
  state = {
    name: '',
    number: '',
  };
  onInputChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };
  onSubmitForm = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.clearInput();
  };
  clearInput = () => {
    this.setState({ name: '', number: '' });
  };
  render() {
    return (
      <Form onSubmit={this.onSubmitForm}>
        <div>
          <label>
            <H3>Name</H3>
            <Input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={this.state.name}
              onChange={this.onInputChange}
            />
          </label>
          <label>
            <H3>Number</H3>
            <Input
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={this.state.number}
              onChange={this.onInputChange}
            />
          </label>
        </div>
        <Button type="submit">+</Button>
      </Form>
    );
  }
}

const Form = styled.form`
  border: 4px solid black;
  border-radius: 20px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;
const H3 = styled.h3`
  margin: 10px;
`;
const Input = styled.input`
  border-radius: 5px;
  width: 200px;
  height: 30px;
  margin: 10px;
  font-size: 22px;
`;
const Button = styled.button`
  font-size: 90px;
  width: 200px;
  margin: 10px;
  background-color: #83fff5;
  border: 5px solid #ff5b5b;
  border-radius: 20px;
  :hover {
    background: rgb(0, 255, 100);
  }
`;

export default AddForm;
