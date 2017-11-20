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

//   saveProfileBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     const id = $('.hiddenID').text();
//     console.log("id from frontend", id);
//     const name = document.querySelector('#edit-name-field').value;
//     const currentcity = document.querySelector('.edit-city-field').value;
//     const imageUrl = document.querySelector('.edit-image-field').value;
//     fetch('http://localhost:3000/profile', {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json, text/plain',
//         'Content-type': 'application/json',
//       },
//       body: JSON.stringify({ id, name, currentcity, imageUrl }),
//     })
//       .then((response) => {
//         console.log("response", response);
//         return response.json();
//       })
//       .then((profile) => {
//         console.log("profile", profile);
//         $('.user-name').replaceWith(`<div class="user user-name">${profile.name}</div>`);
//         $('.user-pic').replaceWith(`<img class="user user-pic" src="${profile.image_url}">`);
//         if (profile) {
//           $('.edit-profile-form').hide();
//           $('.user-name').show();
//           $('.current-city').show();
//         }
//       })
//       .catch(console.error);
//   });
});
