var containerEl =$(".container");
var today=moment();
var hours = [9,10,11,12,1,2,3,4,5];

// Display's Date 
$("#currentDay").text(today.format ("dddd, MMMM  Do"))

//To load the elements when page reloads
$(function(event) {  
    // event.preventDefault();
insertTimeBlocks();



$(".saveBtn").on("click",function(event){
    // event.preventDefault();

  var desc = $(this).siblings('.description').val();
  var  timeId= $(this).parent().find("p").attr('id');

    //Saving to Local storage
  localStorage.setItem(timeId,desc);

//   console.log(text,time);

});

trackTheTime();

});


function insertTimeBlocks() {
    
    var int = 9;
    hours.forEach(hour =>{
        // console.log(hour);
        var div= $('<div>'); 
        div.addClass("row  time-block");
        var p =$('<p>').addClass("hour  col-md-1").attr('id','hour_'+int);
        var hoursFormat
        if(hour< 12 && hour >8 ){  hoursFormat=hour + "AM";}
        else{ hoursFormat =hour + "PM";}
        
        p.text(hoursFormat);
        div.append(p);
        var textarea= $("<textarea>").addClass(" col-md-10  description");
        div.append(textarea);
        var button = $("<button>").addClass("btn col-md-1 saveBtn");
        var icon =$('<i>').addClass('fas fa-save');
        button.append(icon);
        div.append(button);
        containerEl.append(div);

        //retriving the description from local storage .
        var identifier = '#hour_'+int + '+ .description';
        console.log(identifier);
         $(identifier).val(localStorage.getItem('hour_'+int));

         int++;

    });

}

function trackTheTime() {
    var now = moment().hour();
    
    console.log(now);
    $('.hour').each(function() {


        var blockTime =parseInt($(this).attr("id").split("hour_")[1]);
        console.log(blockTime);

        if(blockTime == now){
            $(this).siblings('.description').addClass("present");
            $(this).siblings('.description').removeClass("past");
            $(this).siblings('.description').removeClass("future");
        }
        else if(blockTime < now){
        $(this).siblings('.description').addClass("past");
        $(this).siblings('.description').removeClass("future");
        $(this).siblings('.description').removeClass("present");
        }
        else if( blockTime > now){
            $(this).siblings('.description').addClass("future");
            $(this).siblings('.description').removeClass("present");
            $(this).siblings('.description').removeClass("past");
        }

    });


}