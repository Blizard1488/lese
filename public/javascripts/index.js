const search = document.getElementById('searchBar');
const commands = {
  g: 'google.com',
  y: 'youtube.com',
  f: 'facebook.com',
  w: 'wikipedia.org',
  r: 'reddit.com',
  t: 'twitter.com',
  i: 'instagram.com',
  v: 'vk.com',
  m: 'gmail.com',
  n: 'netflix.com',
  l: 'linkedin.com',
  tw: 'twitch.com',
  a: 'aliepress.com',
  s: 'spotify.com',
  gt: 'translate.google.com',
  st: 'store.steampowered.com',
  tg: 'web.telegram.org',
  wa: 'www.wolframalpha.com',
  gh: 'github.com'
};

const getCookie = name => {
  const matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  )); return matches ? decodeURIComponent(matches[1]) : undefined
}

const setCookie = (name, value, props = {}) => {
  let exp = props.expires,
      updatedCookie = name + "=" + value;
  value = encodeURIComponent(value);

  if (typeof exp === "number" && exp) {
    var d = new Date();
    d.setTime(d.getTime() + exp*1000);
    exp = props.expires = d;
  }

  if(exp && exp.toUTCString) props.expires = exp.toUTCString()
  
  for(let propName in props){
    const propValue = props[propName];
    updatedCookie += "; " + propName;
    if(!propValue) updatedCookie += "=" + propValue;
  }
  document.cookie = updatedCookie
}

const deleteCookie = n => setCookie(n, null, { expires: -1 })

getCookie('lastSearch')&&(search.placeholder = getCookie('lastSearch'));

search.addEventListener('keydown', event => {
  const value = search.value.trim();
  if(event.keyCode === 13) {
    setCookie('lastSearch', value, 36000);
    window.location = value.startsWith('!') && commands[value.substr(1)]
      ? 'https://' + commands[value.substr(1)]
      : 'https://google.com/search?q=' + value
  }
  if(value === '' && event.keyCode === 32) {
    search.value = search.placeholder
  }
})
