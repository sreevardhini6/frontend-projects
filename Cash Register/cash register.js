let totalAmount = 0;

document.getElementById('add-btn').addEventListener('click', addItem);

function addItem() {
    const item = document.getElementById('item').value;
    const price = parseFloat(document.getElementById('price').value);

    if (item && !isNaN(price)) {
        const cartBody = document.getElementById('cart-body');
        const newRow = cartBody.insertRow(-1);
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        cell1.textContent = item;
        cell2.textContent = `$${price.toFixed(2)}`;
        totalAmount += price;
        document.getElementById('total').textContent = `Total: $${totalAmount.toFixed(2)}`;
        document.getElementById('item').value = '';
        document.getElementById('price').value = '';
    } else {
        alert('Please enter valid item and price.');
    }
}
