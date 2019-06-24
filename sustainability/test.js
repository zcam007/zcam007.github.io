// $('.date').datepicker({
//     multidate: true,
//       format: 'dd'
//   });
  
  
  document.querySelector('#monthSelect').addEventListener('change', function(e){
    initializeDatepickerView();
    });
    document.querySelector('#YearSelect').addEventListener('change', function(e){
        initializeDatepickerView();
        });

const initializeDatepickerView=()=>{
    var ele = document.getElementById("monthSelect");
    console.log(ele.value);
    let iSelectedMonthNumber=$("#monthSelect").prop('selectedIndex');
    console.log(iSelectedMonthNumber);
    
    var ele1 = document.getElementById("YearSelect");
    let iSelectedYear=ele1.value;
    console.log(ele1.value);
    $('.date').datepicker('destroy');
    $('.date').datepicker({
     defaultViewDate: {year:iSelectedYear, month:iSelectedMonthNumber, day:1},
     multidate: true,
       format: 'dd-mm'
 });
}
initializeDatepickerView();
document.querySelector('#calcBtn').addEventListener('click', function(e){
    var ele = document.getElementById("YearSelect");
    let iSelectedMonthNumber=$("#monthSelect").prop('selectedIndex')+1;
    let iSelectedYear=ele.value;
    let totalDays=daysInMonth(iSelectedMonthNumber,iSelectedYear);
    let strDatesFromCalendar=$('.date').val();
    var array;
    if (strDatesFromCalendar.length === 0) {
        array = new Array();
    }
    else {
        array = strDatesFromCalendar.replace(/, +/g, ",").split(",").map(Number);
    } 
    let iDatesFromCalendar=array.length;
    console.log(strDatesFromCalendar+"   "+iDatesFromCalendar);
    //let iHoursPerDay=document.getElementById("iHoursPerDay").value;

    let iStartTime=document.getElementById("startTime").value;
    let iendTime=document.getElementById("endTime").value;

    let iHoursPerDay=(iendTime-iStartTime)/100;
    let iNoOfDaysClosedPerWeek=document.getElementById("iClosedDays").value;

    let totalNumberofDaysOpenPerMonth=totalDays-iDatesFromCalendar-(iNoOfDaysClosedPerWeek*4);
    let totalHoursOpen=totalNumberofDaysOpenPerMonth*iHoursPerDay;
    console.log(totalNumberofDaysOpenPerMonth+"    "+totalHoursOpen);
    document.getElementById("hoursDisplay").innerHTML=totalHoursOpen;
    // calculateMass(totalHoursOpen);
    let userTemperature=document.querySelector('#tempIndicator').innerHTML;
    calculateEnergy(totalHoursOpen,userTemperature);

    calcWatermassfromUser(iStartTime,iendTime,userTemperature,totalDays);
});
const monthsLoad=()=> {
        var x = document.getElementById("monthSelect");
        x.innerHTML='';
      let months=["January","February","March","April","May","June","July","August","September","October","November","December"];
        for(var i=0;i<months.length;i++){
          var option = document.createElement("option");
          option.text = months[i];
          option.value=months[i];
          x.add(option);
          }
        
      }
      const yearsLoad=()=> {
        var x = document.getElementById("YearSelect");
        x.innerHTML='';
        for(var i=2019;i>=1996;i--){
          var option = document.createElement("option");
          option.text = i;
          option.value=i;
          x.add(option);
          //x.selected=true
          }
        
      }
const daysInMonth= (month, year)=> {
        return new Date(year, month, 0).getDate();
    }
    

      monthsLoad();
      yearsLoad();

const calculateConstantMass=()=>
{
    const EFFCIENCY=0.82; //effciency
    const K=52.7;
    const C=4.184;
    const Tf=140;
    const Ti=72.8;
    const TIME=220; // 22days*10hrs/day
    const ENERGY = 13634;
    let mass=ENERGY*EFFCIENCY*K/(TIME*C*(Tf-Ti));
    return mass;
}

// const calculateMass=(totalOpenHours)=>
// {
//     const eps=0.82; //effciency
//     const Q=858;
//     const K=52.7;
//     const C=4.184;
//     const Tf=140;
//     const Ti=72.8;
//     const Time=totalOpenHours;
//     let mass=(eps*Q*K)/(Time*C*(Tf-Ti));
//     console.log(mass);
//     calculateEnergy(mass,totalOpenHours);
// }
const calculateEnergy=(totalOpenHours,userTemperature)=>
{
    const EFFCIENCY=0.82; //effciency
    const Q=858;
    const K=52.7;
    const C=4.184;
    const Tf=userTemperature;
    const Ti=72.8;
    const Time=totalOpenHours;
    
    let mass=calculateConstantMass();
    let energy=mass*C*Time*(Tf-Ti)/(EFFCIENCY*K);
    console.log(userTemperature);
    energy=energy.toFixed(2);
   // $('#projectedEnergyDisplay').innerHTML=energy;
    document.getElementById('projectedEnergyDisplay').innerHTML=energy+" kWh";
    let constantEnergy=document.querySelector("#energyDisplay").innerText;
    constantEnergy = constantEnergy.match(/\d/g).join("");
    console.log(constantEnergy);
    let displayPercentage=getPercentageChange(constantEnergy,energy);
    let energyIndicator=document.querySelector('#energyIndicator');
    if(displayPercentage==0){
    energyIndicator.innerHTML="Same as before!"
    }
    else if(displayPercentage>0)
    {
      energyIndicator.innerHTML="Energy Consumption Decreased by "+displayPercentage+"% YAY!"
    
    }
    else
    {
      energyIndicator.innerHTML="Energy Consumption Increased by "+Math.abs(displayPercentage)+"% !"
    
    }


    console.log(energy);
}
function getPercentageChange(oldNumber, newNumber){
  var decreaseValue = oldNumber - newNumber;

  return ((decreaseValue / oldNumber) * 100).toFixed(2);
}


var slider = document.getElementById("myRange");
var output = document.getElementById("tempIndicator");
output.innerHTML = slider.value;//+"&#176; F"; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;// +"&#176; F";
}

const addOptions=()=>{
var x = document.getElementById("startTime");
x.innerHTML='';
var y= document.getElementById("endTime");
y.innerHTML='';
for(var i=0;i<=24;i++){
  var option = document.createElement("option");
  option.text = i+'00';
  option.value=i+'00';
  
  x.add(option);
}
for(var i=0;i<=24;i++){
  var option = document.createElement("option");
  option.text = i+'00';
  option.value=i+'00';
  y.add(option);
}


}

addOptions();

/// code for section #2 water

const calcWatermassAndEnergy=()=>
{
  const timeopen=700;
  const timeclose=2300;
  const timeperday=(timeclose-timeopen)/100;
  const timepermonth=30;
  const time=timeperday*timepermonth;
  const TiwaterF=72.8
  const TiwaterC=(TiwaterF-32)*(5/9);
  const TfwaterF=180;
  const TfwaterC=(TfwaterF-32)*(5/9);
  const efficiencywater=0.70;
  const Ewatertherms=858;
  const Ewater=29.3*Ewatertherms;
  const CWater=4.184

  let timeMatrix=[];
  for(var i=0;i<=24;i++)
  {
    if(i>=(timeopen/100) && i<(timeclose/100))
    {
      timeMatrix[i]=1;
    }
    else
    timeMatrix[i]=0;
  }
  console.log(timeMatrix);
  let time1=0;
  for(var i=0;i<=24;i++)
  {
    time1+=timeMatrix[i];
  }
time1=time1*timepermonth;
  //console.log("time"+time+"    Time1"+time1);

  let m= (Ewater*efficiencywater)/(CWater*time*(TfwaterC-TiwaterC));
  m=m.toFixed(2);
  console.log("const mass: "+m);
  let EwaterPerHour=m*CWater*time*(TfwaterC-TiwaterC)/efficiencywater;
  //console.log("EwaterPerHour"+EwaterPerHour)
  return EwaterPerHour.toFixed(2);
}

const calcWatermassfromUser=(iStartTime,iendTime,userTemperature,totalDays)=>
{
  const timeopen=iStartTime;
  const timeclose=iendTime;
  const timeperday=(timeclose-timeopen)/100;
  const timepermonth=totalDays;
  const time=timeperday*timepermonth;
  const TiwaterF=72.8
  const TiwaterC=(TiwaterF-32)*(5/9);
  const TfwaterF=userTemperature;
  const TfwaterC=(TfwaterF-32)*(5/9);
  const efficiencywater=0.70;
  const Ewatertherms=858;
  const Ewater=29.3*Ewatertherms;
  const CWater=4.184

  
  let massFromUserInput= (Ewater*efficiencywater)/(CWater*time*(TfwaterC-TiwaterC));
  massFromUserInput=massFromUserInput.toFixed(2);
  //  console.log("Mass from user input: "+massFromUserInput);
  //  console.log("time: "+time)
  //  console.log("usertemp: "+userTemperature)
  //  console.log("TfwaterC: "+(TfwaterC-TiwaterC));
  //let temp=;
  //console.log(massFromUserInput,CWater,time,temp,efficiencywater)
  let EwaterPerHourU=massFromUserInput*CWater*time*(TfwaterC-TiwaterC)/efficiencywater;

  console.log("EwaterPerHour: "+calcWatermassAndEnergy());
  console.log("EwaterPerHourU: "+EwaterPerHourU.toFixed(2));
  //let Ewater=calcWatermassAndEnergy()*30; // constant

  let Ewateru=(EwaterPerHourU*timepermonth);


  let Etotal=((Ewater*30)+Ewateru).toFixed(2);

  let HPWPercTotalE=100*(Ewater*30).toFixed(2)/Etotal;
  let HPWPercTotalEu=100*Ewateru/Etotal;


  console.log("Ewater:"+(Ewater*30));
  console.log("Ewateru:"+Ewateru);
  console.log("Ewater - Ewateru:"+((Ewater*30)-Ewateru));

  console.log("HPWPercTotalE: "+HPWPercTotalE);
  console.log("HPWPercTotalEu: "+HPWPercTotalEu);
}



