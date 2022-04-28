import { LINKS, TRANSLATIONS, BACKGROUNDS } from './LINKS.js';

let lyricsContainer = $('#lyrics');
let song = $('#song');
let songChoice;
let BTSVideo;
let baseYoutubeUrl = "https://www.youtube.com/embed/"
let title = $('#title');
let youtubeContainer = $('#youtube-container');


song.on('change', function () {
  songChoice = this.value;
  if (songChoice === '') {
    youtubeContainer.html('');
    lyricsContainer.html('<div class="waiting"><h3>Waiting for your selection!</h3></div>');
    title.text('');
  }
  else {
  let titleText = this.options[this.selectedIndex].text;
  if (TRANSLATIONS[songChoice] === null) title.text(titleText);  
  else {
    title.html(`<a href='${TRANSLATIONS[songChoice]}' target="_blank">` + titleText + '</a>');
  }
  BTSVideo = LINKS[songChoice];
  lyricsContainer.html('<div class="loader"><h3>Loading!</h3></div>');
  let background = BACKGROUNDS[songChoice];
  $.get(`https://api.lyrics.ovh/v1/bts/${songChoice}`).then(data => {
    let lyricsText = data.lyrics;
    let regex = /\n+/g
    lyricsText = lyricsText.replace(regex, '<br>');
    lyricsContainer.html('<h3 class="lyrics-text ' + `${background}`+ '">' + lyricsText + '</h3>');
  }).catch(e => {
    lyricsContainer.append(e.statusText)
  })
  
  let youtubeEmbed = '<iframe src="' + `${baseYoutubeUrl}${BTSVideo}" ` + 'title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
  youtubeContainer.html(youtubeEmbed);
}

})






