import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
// import MyTextField from "../TextField/MyTextField";
import { useFormikContext } from "formik";

const useStyles = makeStyles((theme) => ({
    formControl: {
        // margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SelectInput({ name, label, value, ...props }) {
    const classes = useStyles();
    const [gender, setGender] = React.useState(value);
    const { setFieldValue, values } = useFormikContext();

    const handleChange = (event) => {
        setGender(event.target.value);
        console.log(event.target.value);
    };

    useEffect(() => {
        setFieldValue(name, gender);
    }, [gender, name, setFieldValue]);

    return (
        <div>
            <FormControl
                size="small"
                fullWidth
                variant="outlined"
                className={classes.formControl}
            >
                <InputLabel id="gender">{label}</InputLabel>
                <Select
                    labelId="gender"
                    name={name}
                    id="gender"
                    // value={values?.gender || ""}
                    value={value || null}
                    onChange={handleChange}
                    // className={classes.selectEmpty}
                    label={label}
                >
                    <MenuItem value="">
                        <em>-----</em>
                    </MenuItem>
                    <MenuItem value="M">Nam</MenuItem>
                    <MenuItem value="F">Nữ</MenuItem>
                    <MenuItem value="U">Không xác định</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
