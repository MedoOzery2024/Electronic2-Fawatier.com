document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin') {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('main-page').style.display = 'block';
        updateClockAndDate();
    } else {
        alert('Invalid username or password');
    }
});

document.getElementById('register-invoice-btn').addEventListener('click', function() {
    document.getElementById('main-page').style.display = 'none';
    document.getElementById('invoice-page').style.display = 'block';
});

document.getElementById('back-to-main-btn').addEventListener('click', function() {
    document.getElementById('invoice-page').style.display = 'none';
    document.getElementById('main-page').style.display = 'block';
});

document.getElementById('add-item-btn').addEventListener('click', function() {
    const itemName = document.getElementById('item-name').value;
    const itemType = document.getElementById('item-type').value;
    const itemQuantity = document.getElementById('item-quantity').value;
    const itemCount = document.getElementById('item-count').value;
    const itemPrice = document.getElementById('item-price').value;
    const totalPrice = itemCount * itemPrice;

    const table = document.getElementById('invoice-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.insertCell(0).textContent = itemName;
    newRow.insertCell(1).textContent = itemType;
    newRow.insertCell(2).textContent = itemQuantity;
    newRow.insertCell(3).textContent = itemCount;
    newRow.insertCell(4).textContent = itemPrice;
    newRow.insertCell(5).textContent = totalPrice;

    document.getElementById('invoice-form').reset();
});

document.getElementById('calculate-total-btn').addEventListener('click', function() {
    const table = document.getElementById('invoice-table').getElementsByTagName('tbody')[0];
    let total = 0;

    for (let i = 0; i < table.rows.length; i++) {
        const totalPrice = parseFloat(table.rows[i].cells[5].textContent);
        total += totalPrice;
    }

    document.getElementById('total-price').textContent = `إجمالي الفاتورة: ${total} جنيه مصري`;
});

document.getElementById('save-data-btn').addEventListener('click', function() {
    const table = document.getElementById('invoice-table').getElementsByTagName('tbody')[0];
    const data = [];

    for (let i = 0; i < table.rows.length; i++) {
        const rowData = {
            itemName: table.rows[i].cells[0].textContent,
            itemType: table.rows[i].cells[1].textContent,
            itemQuantity: table.rows[i].cells[2].textContent,
            itemCount: table.rows[i].cells[3].textContent,
            itemPrice: table.rows[i].cells[4].textContent,
            totalPrice: table.rows[i].cells[5].textContent
        };
        data.push(rowData);
    }

    localStorage.setItem('invoiceData', JSON.stringify(data));
    alert('تم حفظ البيانات بنجاح');
});

document.getElementById('delete-data-btn').addEventListener('click', function() {
    localStorage.removeItem('invoiceData');
    const table = document.getElementById('invoice-table').getElementsByTagName('tbody')[0];
    table.innerHTML = '';
    document.getElementById('total-price').textContent = 'إجمالي الفاتورة: 0 جنيه مصري';
    alert('تم حذف البيانات بنجاح');
});

document.getElementById('restore-data-btn').addEventListener('click', function() {
    const data = JSON.parse(localStorage.getItem('invoiceData'));
    const table = document.getElementById('invoice-table').getElementsByTagName('tbody')[0];
    table.innerHTML = '';

    if (data) {
        data.forEach(item => {
            const newRow = table.insertRow();
            newRow.insertCell(0).textContent = item.itemName;
            newRow.insertCell(1).textContent = item.itemType;
            newRow.insertCell(2).textContent = item.itemQuantity;
            newRow.insertCell(3).textContent = item.itemCount;
            newRow.insertCell(4).textContent = item.itemPrice;
            newRow.insertCell(5).textContent = item.totalPrice;
        });
        alert('تم استعادة البيانات بنجاح');
    } else {
        alert('لا توجد بيانات محفوظة');
    }
});

document.getElementById('print-btn').addEventListener('click', function() {
    window.print();
});

function updateClockAndDate() {
    const clockElement = document.getElementById('clock');
    const dateElement = document.getElementById('date');

    function updateClock() {
        const now = new Date();
        const hours = now.getHours() % 12 || 12;
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
        clockElement.textContent = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds} ${ampm}`;
    }

    function updateDate() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const gregorianDate = now.toLocaleDateString('ar-EG', options);

        const hijriDate = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', options).format(now);
        dateElement.textContent = `التاريخ الميلادي: ${gregorianDate} | التاريخ الهجري: ${hijriDate}`;
    }

    updateClock();
    updateDate();
    setInterval(updateClock, 1000);
    setInterval(updateDate, 60000); // Update date every minute
}
