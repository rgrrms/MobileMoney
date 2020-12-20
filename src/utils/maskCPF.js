function maskCPF(value) {
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d{2})/, "$1-$2");
  // value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  return value;
}

function maskData(value) {
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d)/, "$1/$2");
  value = value.replace(/(\d{2})(\d)/, "$1/$2");
  return value;
}

function maskAmount(value) {
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d)/, "R$ $1");
  value = value.replace(/(\d)(\d{2})$/, "$1,$2");
  value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
  return value;
}

function maskAmountBack(value) {
  value = value.replace(".", ",");
  value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
  return value;
}


export { maskCPF, maskData, maskAmount, maskAmountBack };