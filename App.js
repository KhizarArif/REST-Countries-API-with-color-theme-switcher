const url = "https://restcountries.com/v2/all";
const countries = document.getElementById("countries")
const searchbar = document.getElementById("Searchbar")
const search = document.getElementById("search")
const navlink = document.getElementById("navLink")
const header = document.getElementById("header")
const body = document.querySelector("body")
const pagination = document.getElementById("pagination")
const darkmode = document.getElementById("darkmode")
const pagination_element = document.getElementById("pagination")

let data = []
let regionArray = []


darkmode.addEventListener("click", () => {
    body.classList.toggle("fa-sun")
    if (body.classList.toggle("fa-moon")) {
        body.style.background = "hsl(207, 26%, 17%)"
        body.style.color = 'hsl(0, 0%, 100%)'
        navlink.style.background = "hsl(207, 26%, 17%)"
        navlink.style.color = 'hsl(0, 0%, 100%)'
        search.style.borderColor = "hsl(209, 23%, 22%)"
        navlink.style.borderColor = "hsl(209, 23%, 22%)"
        header.style.borderColor = "hsl(209, 23%, 22%)"
    }
    else {
        body.style.background = "hsl(0, 0%, 98%)"
        body.style.color = 'hsl(209, 23%, 22%)'
        navlink.style.background = "hsl(0, 0%, 98%)"
        navlink.style.color = 'hsl(209, 23%, 22%)'
        search.style.borderColor = "hsl(0, 0%, 98%)"
        navlink.style.borderColor = "hsl(0, 0%, 98%)"
        header.style.borderColor = "hsl(0, 0%, 98%)"
    }

})

async function country_api() {
    let response = await fetch(url)
    data = await response.json()
    regionArray = data.map((items) => {
        return {flag: items.flag, name: items.name , population: items.population , region: items.region, capital: items.capital}
    })
    mapdata(data)

    
    //   Region 

    navlink.addEventListener("click", () => {
        if (navlink.value === 'Filter_by_Region') {
            return mapdata(data)
        }
        regionArray = data.filter((region_name) => {
            return region_name.region === navlink.value
        })
        let selectedRegion = []

        for (let i = 0; i < regionArray.length; i++) {
            selectedRegion += `<div class="country">
                        <div class="country-image">
                            <img src="${regionArray[i].flag}" alt="image not found">
                        </div>
                        <div class="country-info-heading">
                            <h5> ${regionArray[i].name} </h5>
                        </div>
                        <div class="country-info">
                        <p><strong> Population: </strong> ${regionArray[i].population}</p>
                        <p><strong> Region: </strong> ${regionArray[i].region} </p>
                        <p><strong>Capital: </strong> ${regionArray[i].capital}</p>
                        </div>
                </div>
               `

        }
        countries.innerHTML = selectedRegion
    })


    searchbar.addEventListener("keyup", (event) => {
        let words = event.target.value.toLowerCase()
        
        let regionValue = navlink.value

        regionArrayCustom = data.filter((val) => {
            if (regionValue === "Filter_by_Region") return regionValue[0]

            else return val.region === regionValue
        })


        let c_name = regionArrayCustom.filter((val) => {
            return val.name.toLowerCase().search(words) != -1
        })

        console.log(c_name);

        let countryList = c_name.map((items) => {
            return  `<div class="country">
                        <div class="country-image">
                            <img src="${items.flag}" alt="image not found">
                        </div>
                        <div class="country-info-heading">
                            <h5> ${items.name} </h5>
                        </div>
                        <div class="country-info">
                        <p><strong> Population: </strong> ${items.population}</p>
                        <p><strong> Region: </strong> ${items.region} </p>
                        <p><strong>Capital: </strong> ${items.capital}</p>
                        </div>
                </div>
               `

        })
        countries.innerHTML = countryList
       
        })
    

    DisplayList(regionArray, countries, no_of_elements, current_page)

    SetupPagination(regionArray, pagination_element, no_of_elements)
    }



country_api(url)

function mapdata(item) {
    let items = ""
    for (let i = 0; i < item.length; i++) {
        items += `<div class="country">
                        <div class="country-image">
                            <img src="${item[i].flag}" alt="image not found">
                        </div>
                        <div class="country-info-heading">
                            <h5> ${item[i].name} </h5>
                        </div>
                        <div class="country-info">
                        <p><strong> Population: </strong> ${item[i].population}</p>
                        <p><strong> Region: </strong> ${item[i].region} </p>
                        <p><strong>Capital: </strong> ${item[i].capital}</p>
                        </div>
                </div>
               `
    }
    countries.innerHTML = items
}

let current_page = 1;
let no_of_elements = 25;


function DisplayList(regionArray, countries, no_of_elements, page) {

    page--;
    console.log(page);
    let start = no_of_elements * page

    let end = start + no_of_elements

    let paginatedItems = regionArray.slice(start, end)
   console.log(no_of_elements);
   console.log(no_of_elements);

    let paginate = ""

    for (let i = 0; i < paginatedItems.length; i++) {

        paginate += `<div class="country">
                        <div class="country-image">
                            <img src="${paginatedItems[i].flag}" alt="image not found">
                        </div>
                        <div class="country-info-heading">
                            <h5> ${paginatedItems[i].name} </h5>
                        </div>
                        <div class="country-info">
                        <p><strong> Population: </strong> ${paginatedItems[i].population}</p>
                        <p><strong> Region: </strong> ${paginatedItems[i].region} </p>
                        <p><strong>Capital: </strong> ${paginatedItems[i].capital}</p>
                        </div>
                </div>
                 `
    }
    countries.innerHTML = paginate
}

function SetupPagination(regionArray, countries, no_of_elements) {


    let page_count = Math.ceil(regionArray.length / no_of_elements)

    for (let i = 1; i < page_count + 1; i++) {

        let btn = PaginationButton(i, regionArray)

        countries.append(btn)
    }
}

function PaginationButton(page, regionArray) {

    const button = document.createElement("button")

    button.innerText = page

    if (current_page == page) button.classList.add("active")

    button.addEventListener("click", function () {
        current_page = page

        DisplayList(regionArray, countries, no_of_elements, current_page)

        let current_btn = document.querySelector(".pagenumbers button.active")
        current_btn.classList.remove("active")

        button.classList.add("active")
    })

    return button
}


