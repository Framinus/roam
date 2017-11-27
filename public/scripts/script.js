document.addEventListener("DOMContentLoaded", () => {
  console.log("js is working!");
  /* global $ */

  // jquery for the profile page:

  if (top.location.pathname === '/profile') {
    $('.edit-profile-form').hide();
    const editProfileBtn = document.getElementById('edit-profile-btn');
    editProfileBtn.addEventListener('click', (e) => {
      $('.user-name').hide();
      $('.current-city').hide();
      $('.edit-profile-form').show();
    });
    const editBook = function (event) {
      console.log('save button is being clicked');
      event.preventDefault();
      const id = $('.profile-changes-btn').attr('data-id');
      const name = document.querySelector('#edit-name-field').value;
      const currentcity = document.querySelector('.edit-city-field').value;
      fetch('http://localhost:3000/profile', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ id, name, currentcity }),
      })
        .then((profile) => {
          console.log(profile);
          if (profile) {
            $('.edit-profile-form').hide();
            $('.user-name').replaceWith(`<div class="user user-name">${name}</div>`);
            $('.user-name').show();
            $('.current-city').replaceWith(`<div class="user current-city">${currentcity}</div>`);
            $('.current-city').show();
          }
        })
        .catch(console.error);
    };
    $(document).on('click', '.profile-changes-btn', editBook);
  }
});
