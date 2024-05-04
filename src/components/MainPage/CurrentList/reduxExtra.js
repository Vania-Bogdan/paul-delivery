import { connect } from 'react-redux';
import { editContact } from 'api/apiServise';
import CurrentList from "./CurrentList";



const mapDispatchToProps = dispatch => ({
    onEditProduct: payload => dispatch(editContact(payload)),
});

export default connect(null, mapDispatchToProps)(CurrentList);