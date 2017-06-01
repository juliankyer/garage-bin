const fetchItems = () => {
  fetch('/api/v1/items')
    .then(response => response.json())
    .then(items => appendItems(items))
    .catch(error => console.log(error));
};

const appendItems = (items) => {
  items.forEach(item => {
    let id = item.id;
    let name = item.name;
    let reason = item.reason;
    let cleanliness = item.cleanliness;
    
    $('ul').append(`
      <li class="item-card" id=${id}>
        <h3>${name}</h3>
        <p>Reason for being here: ${reason}</p>
        <div class="status-wrapper">
          <p>Cleanliness: ${cleanliness}</p>
          <button class="remove">Remove</button>
        </div>
      </li>
    `)
  });
}

$('#add-btn').on('click', function(e) {
  e.preventDefault();
  console.log('boooooom');
  
});

$(document).ready(() => {
  fetchItems();
});
