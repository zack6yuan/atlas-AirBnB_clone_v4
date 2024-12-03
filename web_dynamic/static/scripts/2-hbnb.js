#!/usr/bin/node
/* global $ */

// Execute when DOM is loaded
$(document).ready(function () {
  const selectedAmenities = {};

  $('input[type="checkbox"]').change(function () {
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

  // Check API status, make request
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      // Add class 'available'
      $('#api_status').addClass('available');
    } else {
      // Remove class 'available'
      $('#api_status').removeClass('available');
    }
  });
});
