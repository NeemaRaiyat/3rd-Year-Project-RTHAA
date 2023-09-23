import { Box, useTheme, TextField } from "@mui/material";
import { tokens } from "../theme";

const Transcript = ( { transcript } ) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box
            gridColumn="span 15"
            gridRow="span 3"
            backgroundColor={colors.primary[400]}
            borderRadius={2}
        >
            <Box
                mr="40px"
            >

                <TextField 
                    defaultValue="Press Start and begin speaking..."
                    rows="13"
                    sx={{margin: "20px 20px 20px 20px"}} 
                    multiline 
                    id="outlined-basic" 
                    fullWidth
                    color="secondary"
                    label="Transcript"
                    variant="outlined" 
                    value={transcript}
                />
            </Box>
        </Box>
    )
}

export default Transcript