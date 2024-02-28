"use strict"

function createСlock() {

    const inputElem = document.getElementById("clockD");
    const clockDiameter = inputElem.value;

    //удаление поля и кнопки
    const labelElem = document.getElementById("labelСlockD");
    const buttonElem = document.getElementById("button");
    labelElem.remove();
    buttonElem.remove();

    function clock(firstXForHourHand, secondXForHourHand, firstYForHourHand, secondYForHourHand,
                   firstXForMinuteHand, secondXForMinuteHand, firstYForMinuteHand, secondYForMinuteHand,
                   firstXForSecondHand, secondXForSecondHand, firstYForSecondHand, secondYForSecondHand,
                   digitalTime) {

        let cvs=document.getElementById("clockCanvas");
        cvs.setAttribute("width", clockDiameter);
        cvs.setAttribute("height", clockDiameter);
        let context=cvs.getContext("2d");
    
        //построение циферблата
        context.fillStyle="#fcca66";
        context.beginPath();
        context.arc(clockDiameter/2, clockDiameter/2, clockDiameter/2, 0, Math.PI*2, false);
        context.fill();
    
        for (let i=1; i<=12; i++) {
            let angleDegrees = 360/12*i;
            let angleRadians=angleDegrees/180*Math.PI;
    
            const numbersCenterX =
                clockDiameter/2+(clockDiameter/2-clockDiameter*0.09)*Math.sin(angleRadians);
            const numbersCenterY =
                clockDiameter/2-(clockDiameter/2-clockDiameter*0.09)*Math.cos(angleRadians);
            
            context.fillStyle="#48b382";
            context.beginPath();
            context.arc(numbersCenterX, numbersCenterY, clockDiameter*0.065, 0, Math.PI*2, false);
            context.fill();
    
            context.fillStyle='black';
            context.font=`${clockDiameter*0.06}px sans-serif`;
            let text = context.measureText(i);
            context.fillText(i, numbersCenterX-text.width/2, numbersCenterY+clockDiameter*0.02);
        }
    
        context.strokeStyle='black';
        context.lineCap='round';

        //построение часовой стрелки
        context.lineWidth=clockDiameter*0.03;
        context.beginPath();
        context.moveTo(firstXForHourHand, firstYForHourHand);
        context.lineTo(secondXForHourHand, secondYForHourHand);
        context.stroke();
    
        //построение минутной стрелки
        context.lineWidth=clockDiameter*0.02;
        context.beginPath();
        context.moveTo(firstXForMinuteHand, firstYForMinuteHand);
        context.lineTo(secondXForMinuteHand, secondYForMinuteHand);
        context.stroke();
    
        //построение секундной стрелки
        context.lineWidth=clockDiameter*0.0075;
        context.beginPath();
        context.moveTo(firstXForSecondHand, firstYForSecondHand);
        context.lineTo(secondXForSecondHand, secondYForSecondHand);
        context.stroke();
    
        //построение цифровых часов
        context.fillStyle='black';
        context.font=`${clockDiameter*0.1}px sans-serif`;
        let text = context.measureText(digitalTime);
        context.fillText(digitalTime, (clockDiameter-text.width)/2, clockDiameter/3);
    }

    function currentTime() {
        let nowTime = new Date();
        let nowHours = nowTime.getHours();
        let nowMinutes = nowTime.getMinutes();
        let nowSeconds = nowTime.getSeconds();

        let angleDegreesForHourHand=360/12*nowHours + 360/12/60*nowMinutes + 360/12/60/60*nowSeconds;
        let angleDegreesForMinuteHand=360/60*nowMinutes + 360/60/60*nowSeconds;
        let angleDegreesForSecondHand=360/60*nowSeconds;

        let angleRadiansForHourHand=angleDegreesForHourHand/180*Math.PI;
        let angleRadiansForMinuteHand=angleDegreesForMinuteHand/180*Math.PI;
        let angleRadiansForSecondHand=angleDegreesForSecondHand/180*Math.PI;

        let firstXForHourHand= 
            clockDiameter/2+clockDiameter*0.04*Math.sin(angleRadiansForHourHand+Math.PI);
        let secondXForHourHand= 
            clockDiameter/2+clockDiameter*0.22*Math.sin(angleRadiansForHourHand);
        let firstYForHourHand= 
            clockDiameter/2-clockDiameter*0.04*Math.cos(angleRadiansForHourHand+Math.PI);
        let secondYForHourHand= 
            clockDiameter/2-clockDiameter*0.22*Math.cos(angleRadiansForHourHand);

        let firstXForMinuteHand= 
            clockDiameter/2+clockDiameter*0.04*Math.sin(angleRadiansForMinuteHand+Math.PI);
        let secondXForMinuteHand= 
            clockDiameter/2+clockDiameter*0.36*Math.sin(angleRadiansForMinuteHand);
        let firstYForMinuteHand= 
            clockDiameter/2-clockDiameter*0.04*Math.cos(angleRadiansForMinuteHand+Math.PI);
        let secondYForMinuteHand= 
            clockDiameter/2-clockDiameter*0.36*Math.cos(angleRadiansForMinuteHand);

        let firstXForSecondHand= 
            clockDiameter/2+clockDiameter*0.04*Math.sin(angleRadiansForSecondHand+Math.PI);
        let secondXForSecondHand= 
            clockDiameter/2+clockDiameter*0.42*Math.sin(angleRadiansForSecondHand);
        let firstYForSecondHand= 
            clockDiameter/2-clockDiameter*0.04*Math.cos(angleRadiansForSecondHand+Math.PI);
        let secondYForSecondHand= 
            clockDiameter/2-clockDiameter*0.42*Math.cos(angleRadiansForSecondHand);
 
        let digitalTime=nowTime.toLocaleTimeString();

        clock(firstXForHourHand, secondXForHourHand, firstYForHourHand, secondYForHourHand,
              firstXForMinuteHand, secondXForMinuteHand, firstYForMinuteHand, secondYForMinuteHand,
              firstXForSecondHand, secondXForSecondHand, firstYForSecondHand, secondYForSecondHand,
              digitalTime);

        console.log( digitalTime );

        setTimeout(currentTime,1010-nowTime.getMilliseconds());
    }

    currentTime();
}




