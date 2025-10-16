async function fetchSalesData() {
    try {
        const response = await fetch('generated_repos/sum-of-sales-abc12/data.csv');
        const data = await response.text();
        return data;
    } catch (error) {
        console.error('Error fetching sales data:', error);
        return null;
    }
}

function sumSales(data) {
    const rows = data.split('\n');
    let total = 0;
    rows.forEach(row => {
        const columns = row.split(',');
        const sale = parseFloat(columns[1]); // Assuming sales are in the second column
        if (!isNaN(sale)) {
            total += sale;
        }
    });
    return total;
}

async function displayTotalSales() {
    const data = await fetchSalesData();
    if (data) {
        const totalSales = sumSales(data);
        document.querySelector('#total-sales').textContent = totalSales.toFixed(2);
    }
}

displayTotalSales();