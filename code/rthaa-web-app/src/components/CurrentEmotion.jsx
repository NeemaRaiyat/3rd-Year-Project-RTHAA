import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

import Bar from "../charts/Bar";

const CurrentEmotion = ( { emotion, neutral, happy, surprise, angry, sad, fear, disgust } ) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box
            gridColumn="span 15"
            gridRow="span 3"
            backgroundColor={colors.primary[400]}
            alignItems="center"
            justifyContent="center"
            borderRadius={2}
        >
            <Typography
                variant="h3"
                fontWeight="600"
                sx={{ padding: "20px 30px 15px 30px" }}
            >
                Current Emotion: &nbsp;    

                <Typography
                    variant="h3"
                    fontWeight="600"
                    color={colors.greenAccent[500]}
                    display="inline"
                >
                    {
                        emotion
                    }
                </Typography>

            </Typography>
            <Box height="282px" width="100%" mt="-20px">
                <Bar
                    neutral={neutral}
                    happy={happy}
                    surprise={surprise}
                    angry={angry}
                    sad={sad}
                    fear={fear}
                    disgust={disgust}
                />
            </Box>
        </Box>
    )
}

export default CurrentEmotion