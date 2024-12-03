#!/usr/bin/node
/* global $ */

$(document).ready(function() {
  const selectedAmenities = {};

  $('input[type="checkbox"]').change(function() {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if (this.checked) {
      selectedAmenities[amenityId] = amenityName;
    } else {
      delete selectedAmenities[amenityId];
    }

    const amenitiesList = Object.values(selectedAmenities).join(', ');
    if (amenitiesList.length > 0) {
      $('div.amenities > h4').text(amenitiesList);
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
  });

  // Check API status
  $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  // Handle search button click
  $('button').click(function() {
    const states = [];
    const cities = [];
    const amenities = Object.keys(selectedAmenities);

    $('input[type="checkbox"]:checked').each(function() {
      const id = $(this).data('id');
      const type = $(this).data('type');
      if (type === 'state') {
        states.push(id);
      } else if (type === 'city') {
        cities.push(id);
      }
    });

    const searchData = JSON.stringify({
      states: states,
      cities: cities,
      amenities: amenities
    });

    // AJAX request
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: searchData,
      success: function(data) {
        $('section.places').empty();
        data.forEach(function(place) {
          const article = $('<article></article>');
          article.append('<div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night">$' + place.price_by_night + '</div></div>');
          article.append('<div class="information"><div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div><div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div><div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div></div>');
          article.append('<div class="user"><b>Owner:</b> ' + place.user.first_name + ' ' + place.user.last_name + '</div>');
          article.append('<div class="description">' + place.description + '</div>');
          $('section.places').append(article);
        });
      }
    });
  });
});
