// validate names
function validateName(name){
  return /^[A-Z][a-zA-Z\s'-]{1,}$/.test(name);
}

//validate Ugandan Number plates
function validatePlateNumber(plate){
    //remove spaces or tabs from numberplate
  const clean = plate.replace(/\s/g,'');
  return /^U[A-Z0-9]{2,6}$/.test(clean);
}

//function to validate Ugandan phone number
function validatePhone(phone){
  return /^(\+256|0)(7|6)\d{8}$/.test(phone.replace(/\s/g,''));
}

// function to validate NIN
function validateNIN(nin){
  return /^[A-Z]{2}[0-9A-Z]{8,10}[A-Z]$/i.test(nin);
}
