var lvl = 0;
var click_counter = -1;
var basis_pattern = [];
var pressed_pattern = [];

$(".container").hide();

//starts the game when any key is pressed ...
$("body").keypress(function(event) {
    if(lvl == 0 && $("#level-title").text() != "Level 1") {
        $("#start_img").hide();
        $(".container").slideDown();
        $("#level-title").text("Level 1");
        $("body").removeClass("game-over");
        $("#end_img").slideUp();
        lvl = 1;
        setTimeout(play, 1000);
    }
})

//adds the event when the btns are clicked ...
click_btn("green");
click_btn("red");
click_btn("yellow");
click_btn("blue");

function play() {
    let random = random_btn();
    play_new_btn(random);
}

function random_btn() {
    return Math.floor((Math.random() * 4)) + 1
}

function play_new_btn(random) {

    let color = "";

    switch(random) {
        case 1:
            color = "green";
            break;
        case 2:
            color = "red";
            break;
        case 3:
            color = "yellow";
            break;
        case 4:
            color = "blue";
            break;
        default:
            color = "green";
            break;
    }
    
    basis_pattern.push(color);

    new Audio("sounds/"+color+".mp3").play()
    $("#"+color).fadeOut().fadeIn();

}

function click_btn(color) {
   
    $("#"+color).on("click", function() {
        
        //animates button to look pressed
        $("#"+color).addClass("pressed");
        //returns design of button
        setTimeout(function() { $("#"+color).removeClass("pressed") },100)

        pressed_pattern.push(color);

        click_counter++;

        if (basis_pattern[click_counter] != pressed_pattern[click_counter]) {
            //plays the sound ...
            new Audio("sounds/wrong.mp3").play();
            game_over();

        } else {
           
            //plays the sound ...
            new Audio("sounds/"+color+".mp3").play();

            if((click_counter + 1) == lvl) {
                
                setTimeout(play, 1000);
                setTimeout(next_lvl,500);
            } 
        }
    })

}

function game_over() {
    click_counter = -1;
    lvl = 0;
    basis_pattern = [];
    pressed_pattern = [];

    $(".container").slideUp();

    $("#level-title").after("<img src='images/over.gif' id='end_img' />")

    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press any Key to Restart");
}

function next_lvl() {
    click_counter = -1
    pressed_pattern = [];
    lvl++;
    $("#level-title").text("Level " + lvl);
}
