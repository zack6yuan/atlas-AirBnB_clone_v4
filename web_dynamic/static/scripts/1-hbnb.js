#!/usr/bin/node
/* global $ */

// Execute when DOM is loaded
$(document).ready(function () {
  let checkedAmenities = {};
  // Listen for changes
  $(document).on('change', "input[type='checkbox']", function () {
    if (this.checked) {
      // Store Amenity ID in variable 
      checkedAmenities[$(this).data('id')] = $(this).data('name');
    } else {
      // Remove Amentiy ID from variable
      delete checkedAmenities[$(this).data('id')];
    }
    // List of checked Amenities
    let lst = Object.values(checkedAmenities);
    if (lst.length > 0) {
      $('div.amenities > h4').text(Object.values(checkedAmenities).join(', '));
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
  });
});
