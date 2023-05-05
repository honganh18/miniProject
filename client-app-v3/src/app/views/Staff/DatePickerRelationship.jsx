import "date-fns";
import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import { useFormikContext } from "formik";

export default function DatePickerRelationship({
    name,
    label,
    index,
    value,
    ...props
}) {
    const [selectedDate, setSelectedDate] = React.useState(value);
    const { setFieldValue, values } = useFormikContext();

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    useEffect(() => {
        setFieldValue(name, selectedDate);
    }, [name, selectedDate, setFieldValue]);

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="space-around">
                <KeyboardDatePicker
                    id={name}
                    inputVariant="outlined"
                    label={label}
                    format="dd/MM/yyyy"
                    value={value || null}
                    name={name}
                    onChange={handleDateChange}
                    fullWidth
                    size="small"
                    KeyboardButtonProps={{
                        "aria-label": "change date",
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
}
