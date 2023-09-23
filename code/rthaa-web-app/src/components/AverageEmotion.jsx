import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

import Pie from "../charts/Pie";

const AverageEmotion = ( { averageEmotionDict } ) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box
            gridColumn="span 12"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            alignItems="center"
            justifyContent="center"
            borderRadius={2}
        >
            <Typography
                variant="h4"
                fontWeight="600"
                sx={{ padding: "8px 10px 12px 16px" }}
            >
                Average Emotions <Typography display="inline" variant="h6">(%)</Typography> :    
            </Typography>

            <Box height="200px" width="95%" mt="-20px">

                <Pie averageEmotionDict={averageEmotionDict} />
                    
            </Box>

        </Box>
    )
}

export default AverageEmotion