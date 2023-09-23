import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Graph from "../charts/Graph";

const EmotionTime = ( { emotionsOverTime, lastNseconds } ) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box
            gridColumn="span 24"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            alignItems="center"
            justifyContent="center"
            borderRadius={2}
        >
            <Typography
                variant="h4"
                fontWeight="600"
                sx={{ padding: "8px 10px 0px 16px" }}
            >
                Emotion-Time Graph:    
            </Typography>
            <Box height="205px" width="95%" mt="-20px">
                <Graph data={emotionsOverTime} lastNseconds={lastNseconds} />
            </Box>
        </Box>
    )
}

export default EmotionTime