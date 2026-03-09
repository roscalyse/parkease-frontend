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

function validatePhonePrefix(phone){
  return /^(\+256)(7|6)\d{8}$/.test(phone.replace(/\s/g,''));
}

// function to validate NIN
function validateNIN(nin){
  return /^(CM|CF)[0-9A-Z]{8,10}[A-Z]$/i.test(nin);
}

// function to validate vehicle model
function validateModel(model){
  return /^[A-Za-z][A-Za-z0-9\s-]{2,}$/.test(model);
}

// function to validate vehicle color
function validateColor(color){
  return /^[A-Za-z\s-]{3,15}$/.test(color);
}
