const search = document.getElementById('searchBar');
const weather = document.getElementById('weather').innerHTML;

const short = {
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
const commands = {
  upper: 'hi',//str => str.toUpperCase(), 
}

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
  if(value && event.keyCode === 13) {
    setCookie('lastSearch', value, 36000);
    if (value.startsWith('!') && short[value.substr(1)]){
      window.location = 'https://' + short[value.substr(1)];
    } else if (value.startsWith('upper') ) {
      search.value = value.substr(value.indexOf(' ')).toUpperCase()
    } else if (value.startsWith('lower') ) {
      search.value = value.substr(value.indexOf(' ')).toLowerCase()
    } else if (value.startsWith('password') ) {
      search.value = Math.random().toString(36).slice(-8);
    } else if (value.startsWith('reverse') ) {
      search.value = [...value.substr(value.indexOf(' '))].reverse().join('')
    } else if (value.startsWith('chars') ) {
      search.value = value.length - 6
    } else if (value.startsWith('weather') ) {
      search.value = weather
    } else window.location = 'https://google.com/search?q=' + value;
  }
  if(value === '' && event.keyCode === 32) {
    search.value = search.placeholder
  }
})
