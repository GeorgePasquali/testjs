// Entry in webpack

import './styles/index.scss';
import * as Utils from "./library/exampleHelperClass"

class testClass {



  constructor() {
    this.cards = document.createElement('div');
    this.cards.className = "cards";

    this.displayButton = document.getElementById("cardsRendererButton");
    this.displayButton.addEventListener("click", () => {
      this.requestXml();
    });

    this.searchEngineDisplay = document.getElementById("searchEngineDisplayButton");
    this.searchEngineDisplay.addEventListener("click", () => {
      this.createSearchBar();
    });
  }

  sayHello() {
    console.log("I am an ES6 new class");// eslint-disable-line
  }

  returnSomeSum() {
    console.log(Utils.sum(5, 7));// eslint-disable-line
  }

  requestXml() {
    let xmlDisks = new XMLHttpRequest();
    let self = this;
    xmlDisks.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {

        self.createTable(xmlDisks.responseXML)

      }
    }
    xmlDisks.open("GET", "http://localhost:3000/disks", true);
    xmlDisks.send();
  }

  createTable(a) {
    let jobs = a.getElementsByTagName('JOB');
    this.cards.innerHTML = '';


    for (var i = 0, l = jobs.length; i < l; i++) {
      var job = jobs[i];

      var card = document.createElement("div");
      card.className = "card custom-card-margin";
      card.style.width = "80%";

      var cardBody = document.createElement("div");
      cardBody.className = "card-body";
      card.appendChild(cardBody);



      var title = job.getElementsByTagName('TITLE')[0].innerHTML;
      var titleDom = document.createElement("h5");
      titleDom.className = "card-title";
      titleDom.appendChild(document.createTextNode(title));
      cardBody.appendChild(titleDom)


      var salary = job.getElementsByTagName('SALARY')[0].innerHTML;
      var salaryDom = document.createElement("h6");
      salaryDom.className = "card-subtitle mb-2 text-muted";
      salaryDom.appendChild(document.createTextNode(salary));
      cardBody.appendChild(salaryDom)


      var company = job.getElementsByTagName("COMPANY")[0].innerHTML;
      var companyDom = document.createElement("p");
      companyDom.className = "card-text";
      companyDom.appendChild(document.createTextNode(company));
      cardBody.appendChild(companyDom)





      this.cards.appendChild(card)
    }




    document.getElementsByTagName("body")[0].appendChild(this.cards)

  }

  createSearchBar() {
    this.cards.innerHTML = "";

    var searchBar = document.createElement("div");
    searchBar.className = "input-group  mb-3"

    var searchBarInputGroup = document.createElement("div");
    searchBarInputGroup.className = "input-group-prepend";
    searchBar.appendChild(searchBarInputGroup);
    

    var inputText = document.createElement("span")
    inputText.className = "input-group-text"
    inputText.appendChild(document.createTextNode("Search Job"));
    searchBarInputGroup.appendChild(inputText);


    var input = document.createElement("input");
    input.type = "text";
    input.className = "form-control";
    searchBar.appendChild(input);

    var button = document.createElement("button");
    button.className = "btn btn-outline-secondary";
    button.id = "button1";
    button.appendChild(document.createTextNode("SEARCH"))
    searchBar.appendChild(button);
    button.addEventListener("click", () => {
      this.searchJob();

    })

    this.cards.appendChild(searchBar);
  }

  searchJob() {
    let xmlDisks = new XMLHttpRequest();
    let self = this;
    xmlDisks.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {

        self.createFilteredTable(xmlDisks.responseXML)

      }
    }
    xmlDisks.open("GET", "http://localhost:3000/disks", true);
    xmlDisks.send();
  }

  createFilteredTable(a) {
    let jobs = a.getElementsByTagName('JOB');
    var inputVal = document.getElementsByClassName("form-control")[0].value;
    this.cards.innerHTML = '';


    for (var i = 0, l = jobs.length; i < l; i++) {
      var job = jobs[i];
      debugger
      if (new RegExp(inputVal).test(job.getElementsByTagName('TITLE')[0].innerHTML)) {
        var card = document.createElement("div");
        card.className = "card custom-card-margin";
        card.style.width = "80%";

        var cardBody = document.createElement("div");
        cardBody.className = "card-body";
        card.appendChild(cardBody);



        var title = job.getElementsByTagName('TITLE')[0].innerHTML;
        var titleDom = document.createElement("h5");
        titleDom.className = "card-title";
        titleDom.appendChild(document.createTextNode(title));
        cardBody.appendChild(titleDom)


        var salary = job.getElementsByTagName('SALARY')[0].innerHTML;
        var salaryDom = document.createElement("h6");
        salaryDom.className = "card-subtitle mb-2 text-muted";
        salaryDom.appendChild(document.createTextNode(salary));
        cardBody.appendChild(salaryDom)


        var company = job.getElementsByTagName("COMPANY")[0].innerHTML;
        var companyDom = document.createElement("p");
        companyDom.className = "card-text";
        companyDom.appendChild(document.createTextNode(company));
        cardBody.appendChild(companyDom)





        this.cards.appendChild(card)
      }


    }
  }

}

var a = new testClass();
a.requestXml();


module.exports = testClass
