import React from 'react'

import { ResponsiveCalendar } from '@nivo/calendar'

const NivoCalendar = ({ data }) => (

    <ResponsiveCalendar
        data={data}
        from="2020-03-01"
        to="2021-07-12"
        emptyColor="#eeeeee"
        colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
        margin={{ top: 10, right: 0, bottom: 10, left: 0 }}
        yearSpacing={40}
        monthBorderColor="#Blue"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'row',
                translateY: 20,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: 'right-to-left'
            }
        ]}
    />
)

export default NivoCalendar