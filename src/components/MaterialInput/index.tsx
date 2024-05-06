import { TextField, TextFieldProps } from "@mui/material";

type Props = TextFieldProps;

export const MaterialInput = (props: Props) => {
  return (
    <TextField
      margin="dense"
      size="small"
      InputLabelProps={{
        style: {
          fontWeight: 700,
          fontFamily: "Raleway",
          fontSize: 14,
        },
      }}
      FormHelperTextProps={{
        style: {
          fontFamily: "Raleway",
        },
      }}
      sx={{
        "& .MuiInputLabel-standard": {
          color: "#00000070",
        },
      }}
      {...props}
    />
  );
};
