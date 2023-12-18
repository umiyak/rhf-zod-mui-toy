import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

const schema = z.object({
  name: z.string().min(1, { message: 'Required' }),
  age: z.number().min(10),
});

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <Box component="form" onSubmit={handleSubmit((d) => console.log(d))} noValidate sx={{ mt: 1 }}>
      <TextField
        required
        margin="normal"
        fullWidth
        id="name"
        label="Name"
        autoFocus
        {...register('name')}
        error={Boolean(errors.name)}
        helperText={errors.name?.message?.toString()}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        margin="normal"
        fullWidth
        id="age"
        label="Age"
        type="number"
        {...register('age', { valueAsNumber: true })}
        error={Boolean(errors.age)}
        helperText={errors.age?.message?.toString()}
        InputLabelProps={{ shrink: true }}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>
    </Box>
  );
}
