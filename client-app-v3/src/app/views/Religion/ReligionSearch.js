import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { FormControl } from "@material-ui/core";

const styles = {
    container: {
        display: "flex",
    },
    button: {
        borderBottomRightRadius: "4px",
        borderTopRightRadius: "4px",
        borderBottomLeftRadius: "0",
        borderTopLeftRadius: "0",
        boxShadow: "none",
    },
};

export default function ReligionSearch(props) {
    const [keywords, setKeywords] = useState("");

    return (
        <div style={styles.container}>
            <TextField
                style={styles.input}
                id="outlined-size-small"
                size="small"
                fullWidth
                label="Nhập từ khóa..."
                onChange={(e) => setKeywords(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        var searchObject = {};
                        searchObject.keyword = keywords;
                        props.search(searchObject);
                    }
                }}
            />
            <Button
                style={styles.button}
                variant="contained"
                onClick={() => {
                    var searchObject = {};
                    searchObject.keyword = keywords;
                    props.search(searchObject);
                }}
            >
                <SearchIcon />
            </Button>
        </div>
    );
}
