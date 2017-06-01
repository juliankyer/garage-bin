

const fetchItems = () => {
  fetch('/api/v1/items')
    .then(response => response.json())
    .then(items => appendItems(items))
    .catch(error => console.log(error));
}

const postItem = (item) => {
  fetch('/api/v1/items', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item)
  })
  .then(response => response.json())
  .catch(error => console.log(error))
}

const appendItems = (items) => {
  items.forEach(item => {
    const id = item.id;
    const name = item.name;
    const reason = item.reason;
    const cleanliness = item.cleanliness;
    
    $('ul').append(`
      <li class="item-card" id=${id}>
        <h3>${name}</h3>
        <p>Reason for being here: ${reason}</p>
        <div class="status-wrapper">
          <p>Cleanliness: ${cleanliness}</p>
        </div>
      </li>
    `)
  });
}

$('#add-btn').on('click', function(e) {
  e.preventDefault();
  const newItem = {
    name: $('#item-name').val(),
    reason: $('#item-reason').val(),
    cleanliness: $('#select-option').val()
  };
  
  postItem(newItem);
  appendItems([newItem]);
  
  $('#item-name').val('');
  $('#item-reason').val('');
});

$(document).ready(() => {
  fetchItems();
});
