function searchMovie(){
    $('#movie-list').html('');
    $.ajax({
      url: "https://www.omdbapi.com",
      type: 'get',
      dataType: 'json',
      data: {
          'apikey': 'ea4f4643',
          's': $('#search-input').val()
      },
      success: function(result){
          if (result.Response == 'True'){
              let movies = result.Search;

              $.each(movies, function(i, data){
                $('#movie-list').append(`
                    <div class="col-md-4">
                      <div class="card mb-3">
                        <img src="${data.Poster}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${data.Title}</h5>
                          <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                          <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="${data.imdbID}">See Detail</a>
                        </div>
                      </div>
                    </div>
                `);
              });

          } else {
              $('#movie-list').html(`
                  <div class="col">
                      <h1 class="text-center">${result.Error}</h1>
                  </div>
              `);
          }
      }
    });
    $('#search-input').val('');
}

$('#search-button').on('click', function(){
    searchMovie();
});

$('#search-input').on('keyup', function(e){
  if (e.which == 13){
    searchMovie();
  }
});

$('#movie-list').on('click', '.see-detail', function(){
  $('.modal-body').html('');
  $.ajax({
    url: "https://www.omdbapi.com",
    type: 'get',
    dataType: 'json',
    data: {
      'apikey': 'ea4f4643',
      'i': $(this).data('id')
    },
    success: function(movie){
      if (movie.Response == 'True'){
        console.log(movie);

        $('.modal-body').append(`
            <div class="container-fluid">
              <div class="row">
                <div class="col-4">
                  <img src="${movie.Poster}" width="100%">
                </div>
                <div class="col-8">
                  <ul class="list-group">
                    <li class="list-group-item"><h3>${movie.Title}</h3></li>
                    <li class="list-group-item">Released : ${movie.Released}</li>
                    <li class="list-group-item">Genre : ${movie.Genre}</li>
                    <li class="list-group-item">Director : ${movie.Director}</li>
                    <li class="list-group-item">Actors : ${movie.Actors}</li>
                  </ul>
                </div>
              </div>
            </div>
          `);
      } else {

      }
    }
  });
});

// // Fungsi async untuk fetch data dari OMDB API
// async function fetchMovies() {
//     try {
//       const response = await fetch('http://www.omdbapi.com/?apikey=ea4f4643&s=ant');
//       const data = await response.json();
  
//       if (data.Response === "True") {
//         console.log("Daftar Film:", data.Search);
//         // Bisa di-loop untuk tampilkan di UI misalnya
//         data.Search.forEach((movie, i) => {
//           console.log(`${i + 1}. ${movie.Title} (${movie.Year})`);
//         });
//       } else {
//         console.error("Gagal fetch data:", data.Error);
//       }
//     } catch (error) {
//       console.error("Terjadi kesalahan:", error);
//     }
//   }
  
//   // Panggil fungsi
//   fetchMovies();
  