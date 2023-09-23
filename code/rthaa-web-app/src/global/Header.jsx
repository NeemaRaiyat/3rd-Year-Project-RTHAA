import { Box, IconButton, Typography, useTheme, Button } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import MicOffOutlinedIcon from '@mui/icons-material/MicOffOutlined';

const Header = ( { averageEmotionDict, emotionsOverTime, transcript, sentimentScore, lighting, processing, hasBeenAlerted, lastNseconds } ) => {

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(ColorModeContext)

    // -------------------------------------------------------------------------------- //
    // ------------------------------------- VIEW ------------------------------------- //
    // -------------------------------------------------------------------------------- //
    return (
        <Box display="flex" justifyContent="space-between" className="header">
            
            <Box
                alignItems="center"
                justifyContent="center"
            >
                <Typography
                    variant="h2"
                    sx={{ padding: "20px 10px 20px 0px" }}
                >
                    <Typography 
                        variant="h2" 
                        color={colors.greenAccent[500]} 
                        fontWeight="600"
                        display="inline"
                    >
                        Real-Time&nbsp;
                    </Typography>
                    Human Attribute Analysis (
                    <Typography 
                        display="inline" 
                        variant="h2"
                        fontWeight="600" 
                        color={colors.greenAccent[500]}
                    >RT
                    </Typography>HAA)
                </Typography>
            </Box>

            <Box 
                sx={{ padding: "0px 0px 0px 0px" }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"

            >
                {
                    // USER IS INFORMED IF THEIR BROWSER ISN'T SUPPORTED , i.e. it's NON-CHROMIUM-BASED 
                    hasBeenAlerted ? (
                        <Button 
                            variant="outlined" 
                            color="err"
                            sx={{
                                width: "300px",
                                padding: "0x 20px 0px 20px",
                                margin: "0px 10px 0px 0px",
                                fontWeight: "700",
                                borderWidth: "3px",
                            }}
                            endIcon={<MicOffOutlinedIcon />}
                            startIcon={<MicOffOutlinedIcon />}
                        >
                            &nbsp;&nbsp;&nbsp;Microphone Disabled&nbsp;&nbsp;&nbsp;
                        </Button>
                    )
                    :
                    (
                        ''
                    )
                }
                {
                    processing ? (
                        lighting === '' ? (
                            ('')
                        )
                        :
                        (
                            lighting ? (
                                <Button 
                                    variant="outlined" 
                                    color="secondary"
                                    sx={{
                                        width: "300px",
                                        padding: "0x 20px 0px 20px",
                                        margin: "0px 10px 0px 0px",
                                        fontWeight: "700",
                                        borderWidth: "3px",
    
                                    }}
                                    endIcon={<LightModeOutlinedIcon />}
                                    startIcon={<LightModeOutlinedIcon />}
                                >
                                    &nbsp;&nbsp;&nbsp;Good Lighting&nbsp;&nbsp;&nbsp;
                                </Button>
                            )
                            :
                            (
                                <Button 
                                    variant="outlined" 
                                    color="err"
                                    sx={{
                                        width: "300px",
                                        padding: "0x 20px 0px 20px",
                                        margin: "0px 10px 0px 0px",
                                        fontWeight: "700",
                                        borderWidth: "3px",
                                    }}
                                    endIcon={<WarningAmberOutlinedIcon />}
                                    startIcon={<WarningAmberOutlinedIcon />}
                                >
                                    &nbsp;&nbsp;&nbsp;Poor Lighting&nbsp;&nbsp;&nbsp;
                                </Button>
                            )
                        )

                    )
                    :
                    (
                        ''
                    )
                }

                <IconButton onClick={colorMode.toggleColorMode}>

                    {theme.palette.mode === "dark" ? (
                            <LightModeOutlinedIcon />
                        ) : (
                            <DarkModeOutlinedIcon />
                    )}

                </IconButton>

                <IconButton>

                    <HelpOutlineIcon />

                </IconButton>

                <IconButton 
                    onClick={() => {
                        console.log(
                            {
                                "averageEmotionDict": averageEmotionDict,
                                "emotionsOverTime": emotionsOverTime,
                                "transcript": transcript,
                                "sentiment": sentimentScore,
                            }
                        )
                    }}
                >

                    <LocalPrintshopOutlinedIcon />     

                </IconButton>
            </Box>
        </Box>
    )
}

export default Header