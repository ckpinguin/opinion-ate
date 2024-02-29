import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export function NewRestaurantForm({createRestaurant}) {
  return (
    <form
      onSubmit={() => {
        createRestaurant();
      }}
    >
      <TextField placeholder="Add Restaurant" fullWidth variant="filled" />
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </form>
  );
}

export default NewRestaurantForm;
