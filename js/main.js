let current_page = 1;
let page_size = 48;
let cards = [];
let cards_length = 0;

$(document).ready(() => {

    let card_name = ""
    let card_level = ""
    let card_type = ""
    let card_race = "";
    let card_attribute = "";
    let spell_trap_type = ""
    let sort = "";

    let url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?${card_name}${card_type}${card_level}${card_attribute}${card_race}${spell_trap_type}${sort}`;

    $(".reset").on('click', function() {
        current_page = 1;
        $(".sort-select").val("name");
        $(".sort-select-type").val("none");
        $(".monster-attribute").prop("checked", false);
        $(".monster-race").prop("checked", false);
        $(".spell-trap-type").prop("checked", false);
        $(".slider").val(0);
        $(".newValue").html("N/A");
        url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?`;
        renderTable(url, current_page);
    })

    $('input[type="checkbox"]').on('change', function() {
        $('input[name="' + this.name + '"]').not(this).prop('checked', false);
    });

    $('#searchText').change(function(e) {
        card_name += "&fname=" + e.target.value;
        url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?${card_name}${card_type}${card_level}${card_attribute}${card_race}${spell_trap_type}${sort}`;
    })

    $('.sort-select-type').change(function(e) {
        if(e.target.value === "none") {
            card_type = "";
            url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?${card_name}${card_type}${card_level}${card_attribute}${card_race}${spell_trap_type}${sort}`;
            current_page = 1;
            renderTable(url, current_page);
        } else {
            card_type = "&type=" + e.target.value;
            url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?${card_name}${card_type}${card_level}${card_attribute}${card_race}${spell_trap_type}${sort}`;
            current_page = 1;
            renderTable(url, current_page);
        }
    })

    $('.sort-select').change(function(e) {
        sort = "&sort=" + e.target.value;
        url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?${card_name}${card_type}${card_level}${card_attribute}${card_race}${spell_trap_type}${sort}`;
        current_page = 1;
        renderTable(url, current_page);
    })

    $('.slider').change(function(e) {
        card_level = "&level=" + e.target.value;
        url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?${card_name}${card_type}${card_level}${card_attribute}${card_race}${spell_trap_type}${sort}`;
        current_page = 1;
        renderTable(url, current_page);
    })

    $('.monster-attribute').change(function(e) {
         if($(".monster-attribute").is(":checked")){
            card_attribute = "&attribute=" + e.target.value;
            url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?${card_name}${card_type}${card_level}${card_attribute}${card_race}${spell_trap_type}${sort}`;
            current_page = 1;
            renderTable(url, current_page);
        } else {
            card_attribute = "";
            url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?${card_name}${card_type}${card_level}${card_attribute}${card_race}${spell_trap_type}${sort}`;
            current_page = 1;
            renderTable(url, current_page);
        }
    })

    $('.monster-race').change(function(e) {
        if($(".monster-race").is(":checked")) {
            card_race = "&race=" + e.target.value;
            url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?${card_name}${card_type}${card_level}${card_attribute}${card_race}${spell_trap_type}${sort}`;
            current_page = 1;
            renderTable(url, current_page);
        } else {
            card_race = "";
            url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?${card_name}${card_type}${card_level}${card_attribute}${card_race}${spell_trap_type}${sort}`;
            current_page = 1;
            renderTable(url, current_page);
        }
    })

    $('.spell-trap-type').change(function(e) {
        if($(".spell-trap-type").is(":checked")) {
            spell_trap_type = "&race=" + e.target.value;
            url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?${card_name}${card_type}${card_level}${card_attribute}${card_race}${spell_trap_type}${sort}`;
            renderTable(url, current_page);
        } else {
            spell_trap_type = "";
            url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?${card_name}${card_type}${card_level}${card_attribute}${card_race}${spell_trap_type}${sort}`;
            renderTable(url, current_page);
        }
    })
    
    $('#search-form').on('submit', (e) => {
        e.preventDefault();
        url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?${card_name}${card_type}${card_level}${card_attribute}${card_race}${spell_trap_type}${sort}`;
        current_page = 1;
        renderTable(url, current_page);
    })

    window.$(".sort-filter").click(function() {
        window.$(".sort-filter-overlay").fadeIn();
        window.$(".sort-filter-overlay-form").show();
        window.$(".sort-filter-overlay-form").animate({top: "50"});
    });
        
    window.$("#cross").click(function() {
        window.$(".sort-filter-overlay").hide();
        window.$(".sort-filter-overlay-form").hide();
    })
    
})

/* Retrieve card information from API and Apply Sort/Filter*/

async function getCards(url) {
    try {
        const response = await axios.get(url);
        cards = await response.data.data;
        cards_length = cards.length;
    } catch (err) {
        window.alert("Cannot find relevant cards.");
    }
}

async function renderTable(url, page=1) {
    if (page === 1)
        await getCards(url)
    
    if (page == 1) {
        document.querySelector('.prevButton').style.visibility = "hidden";
    } else {
        document.querySelector('.prevButton').style.visibility = "visible";
    }
    
    if (page == numPages()) {
        document.querySelector('.nextButton').style.visibility = "hidden";
    } else {
        document.querySelector('.nextButton').style.visibility = "visible";
    }

    // create html
    let output = '';
    let card_description_small = "";
    cards.filter((row, index) => {
        let start = (current_page - 1) * page_size;
        let end = current_page * page_size;
        if (index >= start && index < end) {
            return true;
        }
    }).forEach(card => {
        if (card.type !== "Spell Card" && card.type !== "Trap Card") {
            card_description_small = 
            `
            <p class="card-descriptor-smaller">Lv: ${card.level} - ${card.attribute} - ${card.race}</p>
            <p class="card-descriptor-smaller">Atk: ${card.atk} Def: ${card.def}</p>
            `
        }
        else {
            card_description_small = "";
        }
        output += `
        <div class="card">    
        <a href="#" onclick=cardSelected(${card.id})><img src=${card.card_images[0].image_url} class="card-image"></a>
        <p class="card-descriptor">${card.name}</p>
        ${card_description_small}
        </div>
        `;
    });
        $('#cards').html(output);
}


function previousPage() {
    if (current_page > 1) {
        current_page--;
        renderTable("", current_page);
    }
}

function nextPage() {
    if ((current_page * page_size) < cards.length) {
        current_page++;
        renderTable("", current_page);
    }
}

async function numPages() {
    return Math.ceil(cards_length / page_size);
}

function cardSelected(id) {
    sessionStorage.setItem('cardId', id);
    window.location = 'card.html';
    return false;
}

document.querySelector(".prevButton").addEventListener('click', previousPage, false);

document.querySelector(".nextButton").addEventListener('click', nextPage, false);

function getCard() {
    let cardId = sessionStorage.getItem('cardId');
    axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${cardId}`)
    .then((response) => {
        let card = response.data.data[0];
        let card_type = card.type;
        let card_level = card_type === "Link Monster" ? card.linkval : card.level;
        let link_markers = card_type === "Link Monster" ? card.linkmarkers : "N/A";
        let card_def = card_type === "Link Monster" ? "N/A" : card.def;
        let card_name = card.name;
        card_name = card_name.split(' ').join("%20");
        let card_name_tcgplayer = card.name.split(' ').join("+");
        
        let output = `
            <div class="individual-card-container">
                    <img src=${card.card_images[0].image_url} class="card-img">
                    <div class="card-info">
                        <h2>${card.name}</h2>
                        <ul>
                            <li>Level/Link Value: ${card_level}</li>
                            <li>Race: ${card.race}</li>
                            <li>Attribute: ${card.attribute}</li>
                            <li>Type: ${card.type}</li>
                            <li>Link Markers: ${link_markers}</li>
                            <li>Attack: ${card.atk}</li>
                            <li>Defense: ${card_def}</li>
                            <li>Description: <br> ${card.desc}</li>
                        </ul>
                    </div>
                    <table>
            </div>
        `
        $("#cards").html(output);

        // Loop through the seller
        let card_sellers = card.card_prices[0];
        let seller = 
            `
                <div class="seller-title">
                    <h2>Card Price: </h2>
                </div>
                <div class="seller"></div>
            `;
        $(".seller-container").append(seller);
        
        let seller_list_img = [
            "/img/cardmarket.png", "/img/tcgplayer.jpg", "/img/ebay.png", "/img/amazon.png", "/img/coolstuff.png"
        ];

        let seller_website = [
            `https://www.cardmarket.com/en/YuGiOh/Products/Search?searchString=${card_name}`, `https://www.tcgplayer.com/search/yugioh/product?productLineName=yugioh&productName=${card_name_tcgplayer}`, `https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw=${card_name}&_sacat=0`, `https://www.amazon.com/s?k=${card_name}&crid=2LJJERC6BSQYN&sprefix=dark+magician%2Caps%2C322&ref=nb_sb_noss_1`, `https://www.coolstuffinc.com/main_search.php?pa=searchOnName&page=1&resultsPerPage=25&q=${card_name}&d=1` 
        ]

        let seller_price = [
            card_sellers.cardmarket_price, 
            card_sellers.tcgplayer_price, card_sellers.ebay_price, card_sellers.amazon_price, card_sellers.coolstuffinc_price
        ]

        let counter = 0;

        seller = '';

        for (const sellers in card_sellers) {
            seller += 
            `
                <div class="card-seller">
                    <a href=${seller_website[counter]}><img src=${seller_list_img[counter]} class="card-sellers-img"></a>
                    <p>$${seller_price[counter]}</p>
                </div>
            `
            counter += 1;
        }
    
        $(".seller").append(seller);

        // Loop through the card_sets
        let card_sets = card.card_sets;
        let collection = `
            <table class="card-collection-table">
                <caption> Card Set: </caption>
                <th> Set Name </th>
                <th> Set Code </th>
                <th> Rarity </th>
        `
        $.each(card_sets, (index, card_set) => {
            collection += `
                <tr>
                    <td>${card_set.set_name}</td>
                    <td>${card_set.set_code}</td>
                    <td>${card_set.set_rarity} ${card_set.set_rarity_code}</td>
                </tr>
            `
        })
        collection += `</table>`;
        $(".collection").html(collection)
    })
    .catch((err) => {
        console.log(err);
    });
}

$(".slider").change(function() {
    card_level = "";
    let newValue = this.value;
    $(".newValue").html("Level " + newValue);
})



