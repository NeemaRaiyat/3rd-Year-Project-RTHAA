import { Box, TextField, useTheme } from "@mui/material";
import { tokens } from "../theme";

const PosNegWords = ( { sentimentScore } ) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    let positiveWords = ''
    let negativeWords = ''

    if (sentimentScore !== null) {
        if (sentimentScore.positive.length !== 0) {
            positiveWords = sentimentScore.positive.reduce((acc, curr) => {
                return acc + ', ' + curr
            })
        }
        if (sentimentScore.negative.length !== 0) {
            negativeWords = sentimentScore.negative.reduce((acc, curr) => {
                return acc + ', ' + curr
            })
        }
    }

    return (
        <Box
            gridColumn="span 12"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            borderRadius={2}
        >
            <Box
                mr="40px"
            >

                <TextField 
                    defaultValue="Press Start and begin speaking..."
                    rows="2.3"
                    sx={{margin: "20px 20px 0px 20px"}} 
                    multiline 
                    id="outlined-basic" 
                    fullWidth
                    size="large"
                    color="success"
                    label="Positive Words"
                    variant="outlined" 
                    value={positiveWords}
                />
                <TextField 
                    defaultValue="Press Start and begin speaking..."
                    rows="2.3"
                    sx={{margin: "20px 20px 20px 20px"}} 
                    multiline 
                    id="outlined-basic" 
                    fullWidth
                    color="error"
                    label="Negative Words"
                    variant="outlined" 
                    value={negativeWords}
                />
            </Box>
        </Box>
    )
}

export default PosNegWords