document.addEventListener('DOMContentLoaded', () => {
    // Handle scroll effect for header
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Budget form submission handler
    const budgetForm = document.getElementById('budget-form');
    budgetForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const category = document.getElementById('category').value;
        const limit = document.getElementById('limit').value;
        const budgetStatus = document.querySelector('.budget-status');
        budgetStatus.innerHTML = `<p><strong>${category}</strong> budget limit is set to $${limit}</p>`;
        budgetForm.reset();
    });

    // Transaction form submission handler
    const transactionForm = document.getElementById('transaction-form');
    const transactionsTable = document.getElementById('transactions-table').getElementsByTagName('tbody')[0];
    transactionForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const amount = document.getElementById('amount').value;
        const category = document.getElementById('transaction-category').value;
        const date = document.getElementById('date').value;
        const newRow = transactionsTable.insertRow();
        newRow.innerHTML = `
            <td>$${amount}</td>
            <td>${category}</td>
            <td>${date}</td>
        `;
        transactionForm.reset();
    });

    // Charts setup
    const budgetChartCtx = document.getElementById('budgetChart').getContext('2d');
    const spendingChartCtx = document.getElementById('spendingChart').getContext('2d');

    new Chart(budgetChartCtx, {
        type: 'pie',
        data: {
            labels: ['Rent', 'Groceries', 'Utilities', 'Entertainment'],
            datasets: [{
                data: [500, 300, 200, 100],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: $${context.raw}`;
                        }
                    }
                }
            }
        }
    });

    new Chart(spendingChartCtx, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April'],
            datasets: [{
                label: 'Monthly Spending',
                data: [1200, 1500, 800, 1300],
                backgroundColor: '#FFCE56'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Spending: $${context.raw}`;
                        }
                    }
                }
            }
        }
    });
});

// Smooth scrolling to sections
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}
