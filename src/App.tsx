import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { TextField } from "./components/TextField";
import { SelectField } from "./components/SelectField";
import { RadioGroup } from "./components/RadioGroup";
import { Fragment } from "react";

const schema = z.object({
  name: z.string().min(1, { message: "Required" }),
  age: z.number().min(0, { message: "Required" }),
  gender: z.string().min(1, { message: "Required" }),
  nationality: z.string().min(1, { message: "Required" }),
  hobbies: z.array(
    z.object({
      hobby: z.string().min(1, { message: "Required" }),
    })
  ),
});
type FormValues = z.infer<typeof schema>;

export default function App() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "hobbies",
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit((d) => console.log(d))}
      noValidate
      sx={{ mt: 1 }}
    >
      <TextField
        required
        label="Name"
        error={errors.name}
        registration={register("name")}
      />
      <TextField
        required
        label="Age"
        error={errors.age}
        registration={register("age", { valueAsNumber: true })}
      />

      <RadioGroup
        row
        label="Gender"
        error={errors.gender}
        registration={register("gender")}
        defaultValue={"male"}
        options={[
          { label: "male", value: "male" },
          { label: "female", value: "female" },
          { label: "other", value: "other" },
        ]}
      />

      <SelectField
        required
        label="Nationality"
        error={errors.nationality}
        registration={register("nationality")}
        options={[
          { label: "United States", value: "US" },
          { label: "Canada", value: "CA" },
          { label: "Mexico", value: "MX" },
        ]}
      />

      <h3>Hobbies</h3>

      {fields.map((item, index) => {
        return (
          <Fragment key={item.id}>
            <TextField
              required
              label={`hobby ${index}`}
              error={errors.hobbies?.[index]?.hobby}
              registration={register(`hobbies.${index}.hobby`)}
            />
            <button type="button" onClick={() => remove(index)}>
              Delete
            </button>
          </Fragment>
        );
      })}
      <button
        type="button"
        onClick={() => {
          append({ hobby: "" });
        }}
      >
        append
      </button>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>
    </Box>
  );
}
