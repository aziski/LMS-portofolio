<script setup>
    import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler } from 'chart.js';
    import { Line } from 'vue-chartjs';
    import { defineProps, computed } from 'vue';

    ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler)
    const props = defineProps({
        dataChart: Array
    })

    const chartData = computed(() => ({
        labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
        datasets: [
            {
                label: 'Peminjaman',
                data: props.dataChart,
                borderColor: '#6366f1',
                tension: 0.4,
                fill: true,
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200)
                    gradient.addColorStop(0, 'rgba(99,102,241,0.3)')
                    gradient.addColorStop(1, 'rgba(99,102,241,0.0)')
                    return gradient
                },
                pointRadius: 0
            }
        ]
    }))

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
            display: false 
            }
        },
        scales: {
            x: {
            grid: {
                display: false 
            },
            ticks: {
                color: '#9ca3af'
            }
            },
            y: {
            grid: {
                color: '#e5e7eb'
            },
            ticks: {
                color: '#9ca3af'
            }
            }
        }
    }
</script>

<template>
    <div class="bg-white p-4 rounded-xl shadow-md">
        <h2 class="text-sm md:text-lg lg:text-lg font-bold mb-4">Grafik Peminjaman Minggu ini</h2>
        <Line :data="chartData" :options="chartOptions" />
    </div>
</template>