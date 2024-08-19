import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Widget({ widget }) {
    const renderWidgetContent = () => {
        switch (widget?.type) {
            case 'doughnut':
                const doughnutData = {
                    labels: widget.data.labels,
                    datasets: [
                        {
                            data: widget.data.value,
                            backgroundColor: ['#d32f2f', '#FFEB3B', '#E0E0E0', '#388E3C'],
                            borderWidth: 0,
                            hoverOffset: 5
                        }
                    ]
                };

                const doughnutOptions = {
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            enabled: true,
                        }
                    },
                    cutout: "70%", // Controls the size of the center hole
                };

                return (
                    <div className="flex items-center justify-between w-[100%]">
                        <div className="relative" style={{ width: "160px", height: "160px" }}>
                            <Doughnut data={doughnutData} options={doughnutOptions} />
                            <div
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    color: "#000000",
                                    textAlign: "center",
                                }}
                            >
                                {widget.data.total}<br />
                                Total
                            </div>
                        </div>
                        <div className="mt-4 mr-4">
                            <ul className="text-xs">
                                {widget.data.labels.map((label, index) => (
                                    <li className="flex items-center mb-1" key={index}>
                                        <span className="inline-block w-3 h-3 mr-2 rounded-sm" style={{ backgroundColor: ['#d32f2f', '#FFEB3B', '#E0E0E0', '#388E3C'][index] }}></span> 
                                        {label} ({widget.data.value[index]})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                );

            case 'progress':
                return (
                    <div>
                        <h3>{widget.name}</h3>
                        <ul className="text-xs">
                            {widget.data.labels.map((label, index) => (
                                <li key={index}>
                                    <strong>{label}:</strong> {widget.data.value[index]} ({((widget.data.value[index] / widget.data.total) * 100).toFixed(2)}%)
                                </li>
                            ))}
                        </ul>
                    </div>
                );

            default:
                return <div>No data available</div>;
        }
    };

    return (
        <div className="bg-white p-4 py-10 rounded-lg shadow-lg w-[360px] flex flex-col">
            <h6 className="text-sm font-bold mb-2">{widget?.name}</h6>
            {renderWidgetContent()}
        </div>
    );
}

export default Widget;
