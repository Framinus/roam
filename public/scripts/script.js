document.addEventListener("DOMContentLoaded", () => {
  console.log("js is working!");
  /* global $ */

  $('.hiddenID').hide();
  $('.edit-profile-form').hide();

  const editProfileBtn = document.getElementById('edit-profile-btn');

  editProfileBtn.addEventListener('click', (e) => {
    $('.user-name').hide();
    $('.current-city').hide();
    $('.edit-profile-form').show();
  });

  const saveProfileBtn = document.getElementById('profile-changes-btn');

  saveProfileBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const id = document.querySelector('.hiddenID').text;
    console.log("id from frontend", id);
    const name = document.querySelector('#edit-name-field').value;
    const currentcity = document.querySelector('.edit-city-field').value;
    const imageUrl = document.querySelector('.edit-image-field').value;
    fetch('http://localhost:3000/profile', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ id, name, currentcity, imageUrl }),
    })
      .then((response) => {
        $('.edit-profile-form').hide();
        $('.user-name').show();
        $('.edit-profile-form').show();
      })
      .catch(console.error);
  });
});
