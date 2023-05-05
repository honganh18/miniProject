import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    code: yup
        .string('Enter country code')
        .min(2, 'Code should be of minimum 2 characters length')
        .required('Code is required'),
    name: yup
        .string('Enter country name')
        .min(2, 'Name should be of minimum 2 characters length')
        .required('Name is required'),
    description: yup
        .string('Enter country description')
        .min(2, 'Description should be of minimum 2 characters length')
        .required('Description is required'),
});

export default function CountryModal(props) {

    const [country, setCountry] = useState({})
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: country.id,
            code: country.code,
            name: country.name,
            description: country.description,
        },
        validationSchema: validationSchema,
        onSubmit: (country) => {
            if (country.id.length === 0) {
                props.handleAdd(country)
            } else {
                props.handleUpdate(country)
            }
        },
    });
    <input placeholder="Nhập từ khóa" type="text" style="border-top: 2px solid rgb(228, 228, 228); border-left: 2px solid rgb(228, 228, 228); border-bottom: 2px solid rgb(228, 228, 228); border-right: none; outline: none; padding: 6px; width: 280px; border-bottom-left-radius: 4px; border-top-left-radius: 4px;"></input>

    useEffect(() => {
        if (props.country) setCountry(props.country)
    }, [props.country])

    let button = ""
    if (props.country.id) {
        button = (<Button type='submit'>Update</Button>)
    } else {
        button = (<Button type='submit'>Add</Button>)
    }

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
            >
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle>{props.country.id ? 'UPDATE COUNTRY' : 'ADD NEW COUNTRY'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            id="code"
                            name="code"
                            label="Code"
                            autoFocus
                            margin="dense"
                            value={formik.values.code}
                            onChange={formik.handleChange}
                            error={formik.touched.code && Boolean(formik.errors.code)}
                            helperText={formik.touched.code && formik.errors.code}
                        />
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Name"
                            margin="dense"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField
                            fullWidth
                            id="description"
                            name="description"
                            label="Description"
                            margin="dense"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.handleClose}>Cancel</Button>
                        {button}
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}