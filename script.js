const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
const rotationValues = [
    {minDegree:0, maxDegree:30, value:"Francia"},
    {minDegree:31, maxDegree:90, value:"España"},
    {minDegree:91, maxDegree:150, value:"Estados Unidos"},
    {minDegree:151, maxDegree:210, value:"China"},
    {minDegree:211, maxDegree:270, value:"Italia"},
    {minDegree:271, maxDegree:330, value:"Tailandia"},
    {minDegree:331, maxDegree:360, value:"Francia"},
];
const data = [16, 16, 16, 16, 16, 16];
var pieColors = [
    "#00137c", 
    "#a3a4f1", 
    "#00137c", 
    "#a3a4f1", 
    "#00137c", 
    "#a3a4f1",
];
let myChart = new Chart(wheel, {
    plugins: [ChartDataLabels],
    type: "pie",
    data: {
        labels: ["España", "Francia", "Tailandia", "Italia", "China", "Estados Unidos"],
        datasets: [
            {
            backgroundColor: pieColors,
            data:data,
        },
    ],
    },
    options: {
        responsive: true,
        animation: { duration: 0},
        plugins: {
            tooltip: false,
        legend: {
            display: false,
        },
        datalabels: {
            color:"fff",
            formatter: (_, context) =>
            context.chart.data.labels[context.dataIndex],
            font: {size: 24},
        },
    }
}
});
const valueGenerator = (angleValue) => {
    for(let i of rotationValues){
        if(angleValue >= i.minDegree && angleValue <= i.maxDegree){
            finalValue.innerHTML = `<p>Tu próximo destino será: ${i.value}</p>`;
            spinBtn.disabled = false;
            break;
        }
    }
}
let count = 0;
let resultValue = 101;
spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    finalValue.innerHTML = `<p>Buena suerte!</p>`;
    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
    let rotationInterval = window.setInterval(()=> {
        myChart.options.rotation = myChart.options.rotation + resultValue;
        myChart.update();
        if(myChart.options.rotation >= 360){
            count += 1;
            resultValue -= 5;
            myChart.options.rotation = 0;
        }
        else if(count > 15 && myChart.options.rotation == randomDegree){
            valueGenerator (randomDegree);
            clearInterval(rotationInterval);
            count = 0;
            resultValue = 101;
        }
    }, 10);
})