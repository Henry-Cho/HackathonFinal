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
                    data: [300, 300 * 2, 300 * 3, 300 * 4, 300 * 5, 300 * 6, 300 * 7, 300 * 8, 300 * 9],
                    borderColor: 'blue'
                },
                {
                    id: 2,
                    label: 'Car',
                    data: [200, 200 * 2, 200 * 3, 200 * 4, 200 * 5, 200 * 6, 200 * 7, 200 * 8, 200 * 9],
                    borderColor: 'red'
                },
                {
                    id: 3,
                    label: 'School',
                    data: [75, 75 * 2, 75 * 3, 75 * 4, 75 * 5, 75 * 6, 75 * 7, 75 * 8, 75 * 9],
                    borderColor: 'green'
                },
                {
                    id: 4,
                    label: 'Emergency',
                    data: [50, 50 * 2, 50 * 3, 50 * 4, 50 * 5, 50 * 6, 50 * 7, 50 * 8, 50 * 9],
                    borderColor: 'pink'
                },
                ],
            }}
            />
        </>
    );
}