import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useState} from 'react';
import {connect} from 'react-redux';
import {createRestaurant} from '../store/restaurants/actions';
import Alert from '@mui/material/Alert';

export function NewRestaurantForm({createRestaurant}) {
  const [name, setName] = useState('');
  const [validationError, setValidationError] = useState(false);
  const [serverError, setServerError] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (name) {
      setValidationError(false);
      setServerError(false);
      try {
        await createRestaurant(name); // Needs to finish before continuing
        setName('');
      } catch {
        setServerError(true);
      }
    } else {
      setValidationError(true);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {serverError && (
        <Alert severity="error">
          The restaurant could not be saved. Please try again.
        </Alert>
      )}
      {validationError && <Alert severity="error">Name is required</Alert>}
      <TextField
        placeholder="Add Restaurant"
        value={name}
        fullWidth
        variant="filled"
        onChange={e => setName(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </form>
  );
}
// Separate the connected component (default export) from the named export
const mapStateToProps = null;
const mapDispatchToProps = {createRestaurant};
export default connect(mapStateToProps, mapDispatchToProps)(NewRestaurantForm);
