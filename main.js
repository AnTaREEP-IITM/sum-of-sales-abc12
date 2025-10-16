const fetchSalesData = async () => {
    try {
        const response = await fetch('generated_repos/sum-of-sales-abc12/data.csv');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.text();
        return data;
    } catch (error) {
        console.error('Error fetching sales data:', error);
    }
};

const calculateTotalSales = (data) => {
    const rows = data.split('\n').slice(1);
    const total = rows.reduce((acc, row) => {
        const columns = row.split(',');
        const salesValue = parseFloat(columns[1]);
        return acc + (isNaN(salesValue) ? 0 : salesValue);
    }, 0);
    return total;
};

const displayTotalSales = (total) => {
    const totalSalesElement = document.querySelector('#total-sales');
    totalSalesElement.textContent = total.toFixed(2);
};

const init = async () => {
    const csvData = await fetchSalesData();
    if (csvData) {
        const totalSales = calculateTotalSales(csvData);
        displayTotalSales(totalSales);
    }
};

document.addEventListener('DOMContentLoaded', init);