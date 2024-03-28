const fact_box = document.querySelector('.fact-result');
const selectElement = document.querySelector("#language");
const lang_indicator = document.querySelector("#lang");
const fact_data = document.querySelector(".fact")
var language = "en";
var lang = "English";

function get_fact() {

  var selectedOption = selectElement.options[selectElement.selectedIndex].value;
  language = selectedOption;

  if (language == "en") {

    lang = "English";
    lang_indicator.innerHTML = "Not Translated in any language."
  }
  else if (language == "fr") {

    lang = "French";
    lang_indicator.innerHTML =  '<h4 id="lang">Translated in ' + lang + ' by <span>Microsoft Azure Text Translator for RapidAPI.</span></h4>'
  }
  else if (language == "es") {

    lang = "Spanish";
    lang_indicator.innerHTML = '<h4 id="lang">Translated in ' + lang + ' by <span>Microsoft Azure Text Translator for RapidAPI.</span></h4>'
  }
  get_fact_data(language)

}

function get_fact_data(language) {


  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.api-ninjas.com/v1/facts?limit=1");
  xhr.setRequestHeader('X-Api-Key', 'i1aGse/wqTzMwJ9gX9Nk7A==0MClIDpEGbE5Dd41')
  xhr.setRequestHeader('content-type', 'application/json')
  xhr.send();
  
  xhr.onprogress = () => {
    fact_data.innerHTML = "Getting the fact from the database..."
  };

  xhr.onload = () => {

  if (xhr.readyState == 4 && xhr.status == 200) {
    if (this.status > 399 & this.status < 512) {
      if (this.status == 408) {
        alert("No internet connection.")
      }
      else {
        alert("An error occured.")
      }
    }
    else {

    const data = xhr.response;

    var transtext = JSON.stringify([
      {
        Text: JSON.parse(data)[0].fact
      }
    ]);
    translate_fact(transtext, language);

  }

  } else {
    console.log(`Error: ${xhr.status}`);
  }
  };
  
}

function translate_fact(data, lang) {

  const translate_req = new XMLHttpRequest();
  translate_req.withCredentials = true;
  
  translate_req.addEventListener('readystatechange', function () {
    if (this.readyState === this.DONE) {
      if (this.status > 399 & this.status < 512) {
        if (this.status == 408) {
          alert("No internet connection.")
        }
        else {
          alert("An error occured.")
        }
      }
      else {

      var translated_fact = this.responseText;
      fact_data.innerHTML = JSON.parse(translated_fact)[0].translations[0].text + '.';
      fact_box.style.display = 'flex';

      }
  
    }
  });



  translate_req.open('POST', 'https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=' + lang + '&api-version=3.0&profanityAction=NoAction&textType=plain');
  translate_req.setRequestHeader('content-type', 'application/json');
  translate_req.setRequestHeader('X-RapidAPI-Key', 'a738856ae8mshddcc391ebb33004p10ebb1jsn5cdd46579cdc');
  translate_req.setRequestHeader('X-RapidAPI-Host', 'microsoft-translator-text.p.rapidapi.com');
  
  translate_req.send(data);

}
