import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import { Line } from 'react-chartjs-2';

export default function Charts(props) {
    return(
        <>
            <Line
            datasetIdKey='id'
            data={{
                labels: ['04/2022', '05/2022', '06/2022', '06/2022', '07/2022', '08/2022', '09/2022', '10/2022', '11/2022'],
                datasets: [
                {
                    id: 1,
                    label: 'House',
                    data: [null, null, null, null, null, null, 0, 300, 300 * 2],
                    borderColor: 'blue'
                },
                {
                    id: 2,
                    label: 'Car',
                    data: [null, null, null, null, null, null, 0, 200, 200 * 2],
                    borderColor: 'red'
                },
                {
                    id: 3,
                    label: 'School',
                    data: [null, null, null, null, null, null, 0, 75, 75 * 2],
                    borderColor: 'green'
                },
                {
                    id: 4,
                    label: 'Emergency',
                    data: [null, null, null, null, null, null, 0, 50, 50 * 2],
                    borderColor: 'pink'
                },
                ],
            }}
            />
        </>
    );
}