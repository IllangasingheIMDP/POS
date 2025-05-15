function loadMenuItems() {
    fetch('/api/menu')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('menuItemsContainer');
            container.innerHTML = '';

            data.forEach(item => {
                const row = `
                    <tr>
                        <td><img src="/uploads/${item.imageFilename}" alt="Item Image"></td>
                        <td>${item.name}</td>
                        <td>$${item.price}</td>
                        <td>${item.category}</td>
                        <td>
                            <button onclick="editMenuItem(${item.id})">Edit</button>
                            <button onclick="deleteMenuItem(${item.id})">Delete</button>
                        </td>
                    </tr>`;
                container.insertAdjacentHTML('beforeend', row);
            });
        })
        .catch(err => console.error('Error loading menu items:', err));
}
function openAddMenuItemModal() {
    document.getElementById('addItemModal').style.display = 'flex';
}

function closeAddMenuItemModal() {
    document.getElementById('addItemModal').style.display = 'none';
}

function saveNewItem() {
    const name = document.getElementById('itemName').value;
    const price = document.getElementById('itemPrice').value;
    const category = document.getElementById('itemCategory').value;

    alert(`New Item Added:\nName: ${name}\nPrice: $${price}\nCategory: ${category}`);
    closeAddMenuItemModal();
}



function submitNewMenuItem(event) {
    event.preventDefault();

    const name = document.getElementById('itemName').value;
    const price = document.getElementById('itemPrice').value;
    const category = document.getElementById('itemCategory').value;
    const imageFile = document.getElementById('itemImage').files[0];

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category);
    if (imageFile) formData.append('image', imageFile);

    fetch('/api/menu', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                closeAddMenuItemModal();
                loadMenuItems(); // Reload the menu items
            } else {
                alert('Failed to add menu item!');
            }
        })
        .catch(err => console.error('Error adding menu item:', err));
}
