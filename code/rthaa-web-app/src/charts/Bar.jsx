import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";

const Bar = ( { neutral, happy, surprise, angry, sad, fear, disgust } ) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    let data = [
        {
            "Emotion": "Happy",
            "Happy": happy * 100,
        },
        {
            "Emotion": "Fear",
            "Fear": fear * 100,
        },
        {
            "Emotion": "Sad",
            "Sad": sad * 100,
        },
        {
            "Emotion": "Angry",
            "Angry": angry * 100,
        },
        {
            "Emotion": "Surprise",
            "Surprise": surprise * 100,
        },
        {
            "Emotion": "Disgust",
            "Disgust": disgust * 100,
        },
        {
            "Emotion": "Neutral",
            "Neutral": neutral * 100,
        },
    ]

    return (
        <ResponsiveBar
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
            }}
            keys={[
                'Neutral',
                'Disgust',
                'Surprise',
                'Angry',
                'Sad',
                'Fear',
                'Happy',
            ]}
            indexBy="Emotion"
            margin={{ top: 20, right: 110, bottom: 46, left: 70 }}
            padding={0.3}
            layout="horizontal"
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'set3' }}            
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 3,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'Disgust',
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'Surprise'
                    },
                    id: 'lines'
                }
            ]}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        '1.6'
                    ]
                ]
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickValues: 5,
                tickPadding: 4,
                tickRotation: 0,
                legend: 'Predicted (%)',
                legendPosition: 'middle',
                legendOffset: 34
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            enableLabel={false}
            labelSkipWidth={17}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 115,
                    translateY: 0,
                    itemsSpacing: 4,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: colors.greenAccent[200],
                                symbolSize: 20,
                            }
                        }
                    ]
                }
            ]}
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in emotion: "+e.indexValue}}
        />
    )
}

export default Bar