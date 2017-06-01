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
      <li class="item-card ${cleanliness}" id=${id}>
        <h3 class="show-details">${name}</h3>
        <div class="details">
          <p>Excuse: ${reason}</p>
          <div class="status-wrapper">
            <p>Cleanliness: ${cleanliness}</p>
          </div>
        </div>
      </li>
    `)
  });
}

const tallyItems = () => {
  let $items = $('.item-card').length;
  let $fancy = $('.sparkling').length;
  let $dusty = $('.dusty').length;
  let $rancid = $('.rancid').length;
  
  $('#fancy-tally').text(`Fancy things: ${$fancy}`);
  $('#dusty-tally').text(`Dusty things: ${$dusty}`);
  $('#rancid-tally').text(`Gross things: ${$rancid}`);
  $('#total').text(`Total things: ${$items}`);
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

$('#opener').on('click', function() {
  $('ul').toggleClass('door-closed');
  $('.contents').toggleClass('door-closed');
  $('#opener').toggleClass('open');
  
  if ($('#opener').hasClass('open')) {
    $('#opener').text('Hide This Mess');
  } else {
    $('#opener').text('Open Garage');
  }
  
  tallyItems();
});

$(document).ready(() => {
  fetchItems();
});
