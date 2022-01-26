$(document).ready(function() {

// Start your code from here
let temas = [
    "CR7",
    "Messi",
    "Neymar",
    "Mbappe",
    "Sergio Ramos",
    "Raul Jimenez",
    "Kevin de Bruyne",
    "Neuer",
    "Kante",
]

function mostrarBotones(temas) {
    $("#animal-buttons").empty()
    for (let i = 0; i < temas.length; i++) {
        let a = $("<button>")
        a.addClass("animal-button")
        a.attr("data-type", temas[i])
        a.text(temas[i])
        $("#animal-buttons").append(a)
    }
}


$("#animal-buttons").on("click", ".animal-button", function () {
    $("#animals").empty()
    let search = $(this).attr("data-type")
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=KrO43BOJW284GsP70OOaLUj4BuD51IRx&limit=10"

    //alert(queryURL)

    $.ajax({
        url: queryURL
    })
        .then(function (response) {
            console.log(response)
            let results = response.data
            for (let i = 0; i < results.length; i++) {
                let temasDiv = $("<div class= \"animal-item\">")
                let rating = results[i].rating
                let p = $("<p>").text("Rating: " + rating)

                let temasImage = $("<img>")
                temasImage.attr("src", results[i].images.fixed_height_still.url)
                temasImage.attr("data-still", results[i].images.fixed_height_still.url)
                temasImage.attr("data-animate", results[i].images.fixed_height.url)
                temasImage.attr("data-state", "still")
                temasImage.addClass("animal-image")

                temasDiv.append(p)
                temasDiv.append(temasImage)

                $("#animals").append(temasDiv)
            }
        })
})


$("#animals").on("click", ".animal-image", function () {
    if ($(this).attr("data-state") === "still") {
        $(this).attr("src", $(this).attr("data-animate"))
        $(this).attr("data-state", "animate")
    } else {
        $(this).attr("src", $(this).attr("data-still"))
        $(this).attr("data-state", "still")
    }
})

$("#add-animal").on("click", function (e) {
    e.preventDefault()
    let nuevoTema = $("#animal-input").val()
    temas.push(nuevoTema)
    mostrarBotones(temas)
})

mostrarBotones(temas)



});
