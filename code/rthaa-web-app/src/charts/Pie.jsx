import { useTheme } from "@mui/material";
import { ResponsivePie } from '@nivo/pie'
import { tokens } from "../theme";

const Pie = ( { averageEmotionDict } ) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    let data = [
        {
            "id": "Neutral",
            "label": "Neutral",
            "value": Math.round((averageEmotionDict["Neutral"] / averageEmotionDict['Total']) * 100),
        },
        {
            "id": "Disgust",
            "label": "Disgust",
            "value": Math.round((averageEmotionDict["Disgust"] / averageEmotionDict['Total']) * 100),
        },
        {
            "id": "Surprise",
            "label": "Surprise",
            "value": Math.round((averageEmotionDict["Surprise"] / averageEmotionDict['Total']) * 100),
        },
        {
            "id": "Angry",
            "label": "Angry",
            "value": Math.round((averageEmotionDict["Angry"] / averageEmotionDict['Total']) * 100),
        },
        {
            "id": "Sad",
            "label": "Sad",
            "value": Math.round((averageEmotionDict["Sad"] / averageEmotionDict['Total']) * 100),
        },
        {
            "id": "Fear",
            "label": "Fear",
            "value": Math.round((averageEmotionDict["Fear"] / averageEmotionDict['Total']) * 100),
        },
        {
            "id": "Happy",
            "label": "Happy",
            "value": Math.round((averageEmotionDict["Happy"] / averageEmotionDict['Total']) * 100),
        },
    ]

    return (
        <ResponsivePie
            data={data}
            margin={{ top: 25, right: 80, bottom: 30, left: 0 }}
            innerRadius={0.5}
            padAngle={1.75}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={{ scheme: 'set3' }}
            borderWidth={0}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.5
                    ]
                ]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor={colors.grey[100]}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLinkLabelsDiagonalLength={8}
            arcLinkLabelsStraightLength={10}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        6
                    ]
                ]
            }}
            defs={[
                {
                    id: 'dotsss',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'liness',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 3,
                    spacing: 10
                },
                {
                    id: 'dotss',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
            ]}
            fill={[
                {
                    match: {
                        id: 'Disgust'
                    },
                    id: 'dotsss'
                },
                {
                    match: {
                        id: 'Happy'
                    },
                    id: 'dotss'
                },
                {
                    match: {
                        id: 'Fear'
                    },
                    id: 'dotss'
                },
                {
                    match: {
                        id: 'Sad'
                    },
                    id: 'dotss'
                },
                {
                    match: {
                        id: 'Angry'
                    },
                    id: 'dotss'
                },
                {
                    match: {
                        id: 'Neutral'
                    },
                    id: 'dotss'
                },
                {
                    match: {
                        id: 'Surprise'
                    },
                    id: 'liness'
                },
            ]}
            motionConfig="wobbly"
            legends={[
                {
                    anchor: 'right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: -14,
                    itemsSpacing: 7,
                    itemWidth: 105,
                    itemHeight: 18,
                    itemTextColor: colors.grey[100],
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 16,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: colors.greenAccent[200],
                                symbolSize: 18,
                            }
                        }
                    ]
                }
            ]}
        />
    )
}

export default Pie