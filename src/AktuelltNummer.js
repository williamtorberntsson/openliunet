import './App.css'
import * as timeedit from './timeedit_min.js'

const AktuelltNummer = ({ show }) => {
  if (!show) {
    return null
  }
  function he(){
    var ids = getObjectBasketIds(timeedit.$("#objectbasket"));
    if (timeedit.isEmpty(ids) && timeedit.$("#objectbasketgo").attr("data-mandatory") == "yes") {
      var element = timeedit.$("#basketSelectText");
      element.html("" + element.attr("data-select"));
      element.addClass("basketSelectText");
      return;
    }
    if (timeedit.ObjectsSearcher.multiAdd) {
      timeedit.ObjectsSearcher.multiAdd(ids);
      if (timeedit.navTables.editoverlay) {
        timeedit.navTables.editoverlay.hide();
      }
      return;
    }
    var after;
    //clearPlanState();
    return getNewLocation(ids, false, true, after);
  }
  
  function getObjectBasketIds(ids, clearAll, changePeriod, callback) {
    var link = timeedit.$("#linksdata").attr("data-linksbase");
    var url = link.split("?");
    var path = url[1].split("&");
  
    if (clearAll === true) {
     timeedit.clearAllParam(path, "ox");
     timeedit.clearAllParam(path, "o");
     timeedit.clearAllParam(path, "object");
    }
  
    if (timeedit.isEmpty(ids)) {
      timeedit.setParam(path, "objects", "0");
    } else {
     timeedit.setParam(path, "objects", ids);
     timeedit.clearAllParam(path, "object");
     timeedit.clearAllParam(path, "type");
    }
  
   timeedit.setParam(path, "ox", "0");
   timeedit.setParam(path, "types", "0");
   timeedit.setParam(path, "fe", "0");
   timeedit.setParam(path, "si", "");
  
    if (changePeriod === true) {
      timeedit.updatePeriod(path);
    }
  
  
    var newLocation = EGGscramble.asURL(url, path);
    //window.location = newLocation;
    return true;
  }
  
  
  function getNewLocation(ids, clearAll, changePeriod, callback) {
    var link = timeedit.$("#linksdata").attr("data-linksbase");
    var url = link.split("?");
    var path = url[1].split("&");
  
    if (clearAll === true) {
      timeedit.clearAllParam(path, "ox");
      timeedit.clearAllParam(path, "o");
      timeedit.clearAllParam(path, "object");
    }
  
    if (timeedit.isEmpty(ids)) {
      timeedit.setParam(path, "objects", "0");
    } else {
     timeedit.setParam(path, "objects", ids);
     timeedit.clearAllParam(path, "object");
     timeedit.clearAllParam(path, "type");
    }
  
   timeedit.setParam(path, "ox", "0");
   timeedit.setParam(path, "types", "0");
   timeedit.setParam(path, "fe", "0");
   timeedit.setParam(path, "si", "");
  
    if (changePeriod === true) {
      timeedit.updatePeriod(path);
    }
  
  
    var newLocation = EGGscramble.asURL(url, path);
    //window.location = newLocation;
    return newLocation;
  }
  
  var EGGscramble = (function() {
    var my = {};
    var tabledata = [
      ["h=t&sid=", "6="],
      ["objects=", "1="],
      ["sid=", "2="],
      ["&ox=0&types=0&fe=0", "3=3"],
      ["&types=0&fe=0", "5=5"],
      ["&h=t&p=", "4="]
    ];
  
    var tabledataspecial = [
      ["=", "ZZZX1"],
      ["&", "ZZZX2"],
      [",", "ZZZX3"],
      [".", "ZZZX4"],
      [" ", "ZZZX5"],
      ["-", "ZZZX6"],
      ["/", "ZZZX7"],
      ["%", "ZZZX8"]
    ];
  
    var pairs = [
      ["=", "Q"],
      ["&", "Z"],
      [",", "X"],
      [".", "Y"],
      [" ", "V"],
      ["-", "W"]
    ];
  
    var pattern = [
      4, 22, 5, 37, 26, 17, 33, 15, 39, 11, 45, 20, 2, 40, 19, 36, 28, 38, 30, 41, 44, 42, 7, 24,
      14, 27, 35, 25, 12, 1, 43, 23, 6, 16, 3, 9, 47, 46, 48, 50, 21, 10, 49, 32, 18, 31, 29, 34, 13, 8
    ];
  
    function tablespecial(result) {
      for (var i = 0; i < 100; i++) {
        for (var index = 0; index < tabledataspecial.length; index++) {
          var key = tabledataspecial[index];
          result = result.replace(key[0], key[1]);
        }
      }
      return result;
    }
  
    function tableshort(result) {
      for (var index = 0; index < tabledata.length; index++) {
        var key = tabledata[index];
        result = result.replace(key[0], key[1]);
      }
      return result;
    }
  
    function modKey(ch) {
      if (ch >= 97 && ch <= 122) {
        return 97 + (ch - 88) % 26;
      }
      if (ch >= 49 && ch <= 57) {
        return 49 + (ch - 45) % 9;
      }
      return ch;
    }
  
    function scrambleChar(ch) {
      for (var index = 0; index < pairs.length; index++) {
        var pair = pairs[index];
        if (ch === pair[0]) {
          return pair[1];
        }
        if (ch === pair[1]) {
          return pair[0];
        }
      }
      return String.fromCharCode(modKey(ch.charCodeAt(0)));
    }
  
    function swap(result, from, to) {
      if ((from < 0) || (from >= result.length)) {
        return;
      }
      if ((to < 0) || (to >= result.length)) {
        return;
      }
      var fromChar = result[from];
      result[from] = result[to];
      result[to] = fromChar;
    }
  
    function swapPattern(result) {
      var steps = Math.ceil(result.length, pattern.length);
      for (var step = 0; step < steps; step++) {
        for (var index = 1; index < pattern.length; index += 2) {
          swap(result, pattern[index] + step * pattern.length, pattern[index - 1] + step * pattern.length);
        }
      }
    }
  
    function swapChar(result) {
      var split = result.split("");
      for (var index = 0; index < split.length; index++) {
        split[index] = scrambleChar(split[index]);
      }
      swapPattern(split);
      return split.join("");
    }
  
    function scramble(query) {
      if (timeedit.isEmpty(query)) {
        return query;
      }
      if (query.length < 2) {
        return query;
      }
      if (query.substring(0, 2) === "i=") {
        return query;
      }
      var result = decodeURIComponent(query);
      result = tableshort(result);
      result = swapChar(result);
      result = tablespecial(result);
      return encodeURIComponent(result);
    }
  
    my.asURL = function(urls, keyValues, extra) {
      var url = urls[0];
      for (var index = 0; index < keyValues.length; index++) {
        keyValues[index] = toString(keyValues[index]).replace(/[+]/g, " ");
      }
      var lastSlash = toString(url).lastIndexOf("/");
      var page = url.substring(lastSlash + 1, url.length);
      if (page.indexOf("r") !== 0) {
        return url + "?i=" + scramble(keyValues.join("&") + toString(extra));
      }
      var dot = ".html";
      var lastDot = toString(url).lastIndexOf(".");
      if (lastDot != -1) {
        dot = url.substring(lastDot, url.length);
      }
      if (lastSlash != -1) {
        url = url.substring(0, lastSlash + 1);
      }
          var newLocation = url + "ri" + scramble(keyValues.join("&") + toString(extra)) + dot;
      return newLocation
    };
    return my;
  })();
  
  he()

  function searchOccurences () {
    fetch('https://cloud.timeedit.net/liu/web/schema/ri1Q7.html')
      .then(response => response.text())
      .then(data => {
        // Parse data and interact with the page using JavaScript
        const parser = new DOMParser()
        const document = parser.parseFromString(data, 'text/html')

        /**
         * Searches for a course in TimeEdit and adds all occurences to the schedule
         * @param {string} courseName which course to search for in TimeEdit
         */
        function searchForCourse (courseName) {
          var inputBox = document.getElementById('ffsearchname')
          inputBox.value = courseName
          inputBox.nextElementSibling.click()

          var addAllButton = null

          // Define a function to check if the addAllButton is available
          function checkAddAllButton () {
            addAllButton = document.querySelector('a.addallbutton')
            if (addAllButton) {
              // If the addAllButton is found, perform the desired action
              addAllButton.click()
              // Now, start checking for the objectbasketgo element
              checkObjectBasketGo()
            } else {
              // If not found, continue checking until it becomes available
              setTimeout(checkAddAllButton, 100) // Check again after 100 milliseconds
            }
          }

          // Define a function to check if the objectbasketgo element is available
          function checkObjectBasketGo () {
            var objectBasketGo = document.getElementById('objectbasketgo')
            if (objectBasketGo) {
              // If the objectbasketgo element is found, click it
              objectBasketGo.click()
            } else {
              // If not found, continue checking until it becomes available
              setTimeout(checkObjectBasketGo, 100) // Check again after 100 milliseconds
            }
          }

          // Start checking for the addAllButton
          checkAddAllButton()
        }

        // Call the searchForCourse function with the desired courseName
        searchForCourse('TDDD84')

        //var text = document.querySelectorAll('*.column1, *.column0')[6].textContent
        //console.log(text);
        console.log("hej");

      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  return (
    <div className='Information'>
      <button onClick={searchOccurences} type='submit'>
        Sök
      </button>
    </div>
  )
}

export default AktuelltNummer
