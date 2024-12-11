function sort() {
    let isPriceChecked = document.getElementById("price").checked;
    document.getElementById('node_for_insert').innerHTML = '';
    getResponce(isPriceChecked ? 'price' : 'title');
}

function search() {
    let isPriceChecked = document.getElementById("price").checked;
    document.getElementById('node_for_insert').innerHTML = '';
    getResponce(isPriceChecked ? 'price' : 'title');
}

async function getResponce(sortType) {
    let response = await fetch("shop.json");
    let content = await response.text();
    content = JSON.parse(content).splice(0, 12);

    if (sortType == 'price') {
        content = content.sort((a, b) => a.price - b.price);
    } else {
        content = content.sort((a, b) => {
            const nameA = a.title.toUpperCase();
            const nameB = b.title.toUpperCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
    }

    let word = document.getElementById('search').value.toLowerCase();
    let contentFilter = content.filter(product =>
        product.title.toLowerCase().includes(word) ||
        product.description.toLowerCase().includes(word) ||
        product.price.toString().includes(word)
    );

    let nodeForInsert = document.getElementById("node_for_insert");
    nodeForInsert.innerHTML = '';

    if (contentFilter.length === 0) {
        nodeForInsert.innerHTML = `
            <h2 class="text-center">Извините, по вашему запросу товаров нет.</h2>
        `;
        return;
    }

    for (let key in contentFilter) {
        nodeForInsert.innerHTML += `
            <li style="width: 310px" class="d-flex flex-column m-1 p-1 border bg-body text-center">
                <img style="width: 180px" class="align-self-center" src=${contentFilter[key].img}>
                <h5 class="card-title">${contentFilter[key].title}</h5>
                <p class="card-description">${contentFilter[key].description}.</p>
                <p class="card-price">Цена ${contentFilter[key].price} р.</p>
                <p class="card-text">Заказать <input class="w-25" type="checkbox" name="product[]" value=${contentFilter[key].vendor_code}></p>
            </li>
        `;
    }
}

function validateForm(event) {
    let productCheckboxes = document.querySelectorAll('input[name="product[]"]:checked');
    if (productCheckboxes.length === 0) {
        alert("Пожалуйста, выберите хотя бы один товар перед оформлением заказа.");
        event.preventDefault();
    }
}

sort();
