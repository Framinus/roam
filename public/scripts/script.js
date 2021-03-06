document.addEventListener("DOMContentLoaded", () => {
  console.log("js is working!");
  /* global $ */

  // navbar dropdown menu

  const dropdownEntry = document.querySelector('.dropdown-entry');

  const showDropDown = () => {
    console.log('this is doing something');
    if ($('.dropdown-menu').hasClass('hide')) {
      $('.dropdown-menu').removeClass('hide');
      $('.dropdown-menu').addClass('show');
    } else {
      $('.dropdown-menu').addClass('hide');
      $('.dropdown-menu').removeClass('show');
    }
  };

  dropdownEntry.addEventListener('click', showDropDown);

  // jquery for the profile page:

  if (top.location.pathname === '/profile') {
    // creates edit button when hovering over profile pic.
    const editPicBtnShow = () => {
      $('.edit-pic-btn').show();
    };

    const editPicBtnHide = () => {
      $('.edit-pic-btn').hide();
    };

    $('.profile-pic-container').hover(editPicBtnShow, editPicBtnHide);

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
      fetch('/profile', {
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
            $('#edit-profile-btn').show();
          }
        })
        .catch(console.error);
    };
    $(document).on('click', '.profile-changes-btn', editProfile);
  }

  // review-full page

  const editReviewBtn = document.querySelector('.edit-review-btn');

  // editReviewBtn.addEventListener('click', (e) => {
  //   // e.preventDefault();
  //
  // })

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
