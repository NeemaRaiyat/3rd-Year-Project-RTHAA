import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const Gender = ( { gender } ) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // Default color is green
    let color = colors.greenAccent[500]
    let icon = '-'

    if (gender === "male") {
        icon = (<MaleIcon fontSize="70px" />)
    }
    if (gender === "female") {
        icon = (<FemaleIcon fontSize="70px" />)
    }

    return (
        <Box
            gridColumn="span 5"
            gridRow="span 1"
            backgroundColor={colors.primary[400]}
            alignItems="center"
            justifyContent="center"
            borderRadius={2}
        >   
            <Box
                alignItems="center"
                justifyContent="center"
                display="flex"
            >
                <Typography
                    variant="hx2"
                    fontWeight="600"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ padding: "3px 0px 0px 0px" }}
                >
                    Sex:    
                </Typography>
            </Box>
            <Box 
                alignItems="center"
                justifyContent="center"
                display="flex"
            >
                <Box
                    alignItems="center"
                    justifyContent="center"
                >
                    <Box 
                        alignItems="center"
                        justifyContent="center"
                        display="flex"
                    >
                        <Typography
                            variant="h1"
                            color={color}
                            alignItems="center"
                            justifyContent="center"
                            mb="-13px"
                            mr="-5px"
                            mt="-3px"
                        >
                            {
                                icon
                            }
                        </Typography>
                    </Box>
                    

                    <Box 
                        alignItems="center"
                        justifyContent="center"
                        display="flex"
                    >
                        <Typography
                            variant="h4"
                            fontWeight="600"
                            color={color}
                            alignItems="center"
                            justifyContent="center"
                        >
                            {
                                gender === "male" ? (
                                    "Male"
                                )
                                :
                                (
                                    gender === "female" ? (
                                        "Female"
                                    )
                                    :
                                    (
                                        ""
                                    )
                                )
                            }
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Gender
