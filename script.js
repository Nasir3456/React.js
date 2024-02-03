let api = "https://api.forexrateapi.com/v1/latest?api_key=7cea6e96e0bd379083376e724f7047f1";
// &base=USD&currencies=EUR,INR,JPY";

// calling element of html file 

let selects = document.querySelectorAll("select");
let msg = document.querySelector(".msg");
let fromimg = document.querySelector(".from-img");
let toimg = document.querySelector(".to-img");
let btn = document.querySelector(".btn");
let froms = document.querySelector(".from-select");
let tos = document.querySelector(".to-select");
let input = document.querySelector("input");


window.addEventListener("load",async()=>{
    let newapi = `${api}&base=USD&currencies=INR`;
    let res = await fetch(newapi);
    let data = await res.json();
    let val = data["rates"];
    msg.innerText = `1 USD is ${val["INR"]} INR`;
});


// adding country list to select option 

selects.forEach((select) => {
    for(let country in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = country;
        newoption.value = countryList[country];
        select.append(newoption);
        if(select.getAttribute("class") == "from-select" && country == "USD"){
            newoption.selected = "selected"
        }else if(select.getAttribute("class") == "to-select" && country == "INR"){
            newoption.selected = "selected"
        }
    }
});


// changing flag

selects.forEach(select => {
    if(select.getAttribute("class") == "from-select"){
        select.addEventListener("change" ,()=>{
            let newsrc =`https://flagsapi.com/${select.value}/flat/64.png`;
            fromimg.src = newsrc;
        })
    }else if(select.getAttribute("class") == "to-select"){
        select.addEventListener("change" ,()=>{
            let newsrc =`https://flagsapi.com/${select.value}/flat/64.png`;
            toimg.src = newsrc;
        })
    }
})

//getting output on click

btn.addEventListener("click" , async() => {
    let tc,fc;
    for(let country in countryList){
        if(froms.value == countryList[country]){
            fc = country;
        }else if(tos.value == countryList[country]){
            tc = country;
        }
    }

    let newapi = `${api}&base=${fc}&currencies=${tc}`;
    let res = await fetch(newapi);
    let data = await res.json();
    let val = data["rates"];
    let final = val[tc] * input.value;
    msg.innerText = `${input.value} ${fc} is ${final} ${tc}`;
})