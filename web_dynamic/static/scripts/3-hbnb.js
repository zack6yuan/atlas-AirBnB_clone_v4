#!/usr/bin/node
/* global $ */

$(document).ready(function () {
  const selectedAmenities = {};

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data("id");
    const amenityName = $(this).data("name");

    if (this.checked) {
      selectedAmenities[amenityId] = amenityName;
    } else {
      delete selectedAmenities[amenityId];
    }

    const amenitiesList = Object.values(selectedAmenities).join(", ");
    if (amenitiesList.length > 0) {
      $("div.amenities > h4").text(amenitiesList);
    } else {
      $("div.amenities > h4").html("&nbsp;");
    }
  });

  // Check API status
  $.get("http://0.0.0.0:5001/api/v1/status/", function (data) {
    if (data.status === "OK") {
      $("#api_status").addClass("available");
    } else {
      $("#api_status").removeClass("available");
    }
  });

  // AJAX request
  $.ajax({
    url: "http://0.0.0.0:5001/api/v1/places_search/",
    type: "POST",
    contentType: "application/json",
    success: function (result) {
      for (let x = 0; x < result.length; x++) {
        place = result[x];
        const data = (`
          <article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">
                <h2>${place.price_by_night}</h2>
                <div class="information">
                  <h2>${place.max_guest}</h2>
                  <h2>${place.number_rooms}</h2>
                  <h2>${place.number_bathrooms}</h2>
                  <div class="user"></h2>
                    <h2>${place.user.first_name} ${place.user.last_name}</h2>
                    <div class="description>
                      <h2>${place.description}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
          }
        `);
        ('section.place').append(data);
      }
    }
  })
});
