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
      $('#edit-profile-btn').hide();
      $('.edit-profile-form').show();
    });
    const editProfile = function (event) {
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
    $(document).on('click', '.profile-changes-btn', editProfile);
  }

  // jquery for the posts page
  if (top.location.pathname === '/reviews') {
    const submitNewReviewBtn = document.querySelector('.new-review-submit-btn');
    submitNewReviewBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('this button is being clicked');
    });
  }

  // jquery for deleting reviews from full post page
  const deleteConfirmation = () => {
    if (confirm("Are you sure you want to delete this review?")) {
      document.forms[0].submit();
    } else {
      return false;
    }
  };

  $(document).on('click', '.delete-review-btn', deleteConfirmation);
});
