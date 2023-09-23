import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Age = ( { age } ) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const convertToAgeRange = (a) => {
        if (a <= 10) {return '1 - 10'}
        if (a <= 15) {return '11 - 15'}
        if (a <= 20) {return '16 - 20'}
        if (a <= 25) {return '21 - 25'}
        if (a <= 30) {return '26 - 30'}
        if (a <= 35) {return '31 - 35'}
        if (a <= 40) {return '36 - 40'}
        if (a <= 45) {return '41 - 45'}
        if (a <= 50) {return '46 - 50'}
        if (a <= 55) {return '51 - 55'}
        if (a <= 60) {return '56 - 60'}
        return '61+'
    }

    return (
        <Box
            gridColumn="span 10"
            gridRow="span 1"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius={2}
        >
            <Typography
                variant="hx1"
                fontWeight="600"
            >
                Age Range: &nbsp;    

                <Typography
                    variant="hx1"
                    color={colors.greenAccent[500]}
                    display="inline"
                >
                    {
                        age === '' ? (
                            '-/-'
                        )
                        :
                        (
                            convertToAgeRange(age)
                        )
                    }
                </Typography>

            </Typography>
        </Box>
    )
}

export default Age