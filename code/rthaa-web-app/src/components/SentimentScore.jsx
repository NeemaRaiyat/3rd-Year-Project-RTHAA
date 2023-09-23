import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const SentimentScore = ( { sentimentScore } ) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    let color = colors.greenAccent[500]
    let score = ''

    if (sentimentScore !== null) {
        if (sentimentScore.score < 0) {

            if (theme.palette.mode === "dark") {
                color = "#ff4046"
            }
            else {
                color = "#ff0000"
            }
            score = sentimentScore.score.toString()
        }
        if (sentimentScore.score > 0) {
            score = '+' + sentimentScore.score.toString()
        }
        if (sentimentScore.score === 0) {
            score = sentimentScore.score.toString()
        }
    }

    return (
        <Box
            gridColumn="span 15"
            gridRow="span 1"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius={2}
        >
            <Typography
                variant="h1"
                fontWeight="600"
            >

            Sentiment Score:&nbsp;
                <Typography 
                    display="inline"
                    color={color}
                    variant="h1"
                    fontWeight="600"
                >
                    {
                        sentimentScore !== null ? score : ''
                    }
                </Typography>
            </Typography>
        </Box>
    )
}

export default SentimentScore