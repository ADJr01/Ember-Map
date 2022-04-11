function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


function diffrencePercent(v1,v2){
  return Math.floor(((v1-v2)/((v1+v2)/2))*100)
}

function percentage(num, per)
{
  return (num/100)*per;
}

export  {percentage,diffrencePercent,capitalizeFirstLetter}
