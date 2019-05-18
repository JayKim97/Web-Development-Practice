// check off specific todos by clcicks
$("ul").on("click", "li",function(){
    $(this).toggleClass("completed");
    // // $(this).css("color","grey");
    // // $(this).css("text-decoration","line-through");
    // if($(this).css("color") === "rgb(128, 128, 128)"){
    //     $(this).css({
    //         color: "black",
    //         textDecoration: "none"
    //     });
    // }
    // else {
    //     $(this).css({
    //         color: "grey",
    //         textDecoration: "line-through"
    //     });
    // }
});

// click on x to delete todo
$("ul").on("click", "span",function(event){
    $(this).parent().fadeOut(500,function(){
        $(this).remove();
    });
    event.stopPropagation();
});

$("input[type='text']").keypress(function(event){
   if(event.which === 13){
       var todoText = $(this).val();
       todoText = todoText.replace(/(\r\n|\n|\r)/gm,"");
       $("ul").append("<li><span>x</span> " + todoText + "</li>");
       $(this).val('');
   } 
});