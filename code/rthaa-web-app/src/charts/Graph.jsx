import { useTheme } from "@mui/material";
import { ResponsiveLine } from '@nivo/line'
import { tokens } from "../theme";

const Graph = ( { data, lastNseconds } ) => {


    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const areaBlendMode = theme.palette.mode === "dark" ? (
        "difference"
    )
    :
    (
        "multiply"
    )

    return (
        <ResponsiveLine
            data={data}
            theme={{
                axis: {
                    domain: {
                        line: {
                            stroke: colors.grey[100],
                        },
                    },
                    legend: {
                        text: {
                            fill: colors.grey[100],
                        },
                    },
                    ticks: {
                        line: {
                            stroke: colors.grey[100],
                            strokeWidth: 1,
                        },
                        text: {
                            fill: colors.grey[100],
                        },
                    },
                },
                legends: {
                    text: {
                        fill: colors.grey[100],
                    },
                },
                tooltip: {
                    container: {
                        color: colors.primary[500],
                    },
                },
                crosshair: {
                    line: {
                        strokeWidth: 1,
                        strokeOpacity: 0.6,
                        color: colors.grey[100],                        
                    },
                }
            }}
            margin={{ top: 40, right: 17, bottom: 42, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: false,
                reverse: false
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 3,
                tickRotation: 0,
                legend: 'Time',
                legendOffset: 27,
                legendPosition: 'middle'
            }}
            axisLeft={{
                orient: 'left',
                tickValues: 5,
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Predicted (%)',
                legendOffset: -43,
                legendPosition: 'middle'
            }}
            enableGridX={false}
            enableGridY={false}
            colors={{ scheme: 'set3' }}
            lineWidth={3}
            enablePoints={true}
            enableArea={true}
            areaBlendMode={areaBlendMode}

            curve="catmullRom"
            motionConfig="stiff"
            animate={data[0]['data'].length < lastNseconds}

            crosshairType="cross"
            pointSize={4}
            pointBorderWidth={3}
            pointColor={{ theme: 'background' }}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
                {
                    anchor: 'top-right',
                    direction: 'row',
                    justify: false,
                    translateX: 25,
                    translateY: -41,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 71,
                    itemHeight: 20,
                    itemOpacity: 1,
                    symbolSize: 14,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: colors.greenAccent[200],
                                symbolSize: 16,
                            }
                        }
                    ]
                }
            ]}
        />
    )
}

export default Graph