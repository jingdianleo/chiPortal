var array_languages = ["c++", "java", "php", "coldfusion", "javascript", "asp", "ruby", "python", "c", "scala", "groovy", "haskell", "perl"];

$(function(){
    myLayout = $('body').layout({
        west__size:300,
        north__size:100
    });

    // AUTOCOMPLETE
    $("input#autocomplete").autocomplete({
        appendTo:"body",
        source:array_languages
    });

});