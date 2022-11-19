const SEARCHAPI = "https://api.waifu.im/random/?excluded_files=4401.jpeg&excluded_files=3133&gif=false&excluded_tags=maid&excluded_tags=oppai&is_nsfw=false";

  
async function getMovies(url) {
  for(let i=0; i < 10; i++) {
    const resp = await fetch(url);

    const respData = await resp.json();

    console.log(respData.images[0].url);

    const element = document.createElement('img');
    element.style.width = '100%';
    element.src = `${respData.images[0].url}`;

    document.body.appendChild(element);
  }
}

getMovies(SEARCHAPI);