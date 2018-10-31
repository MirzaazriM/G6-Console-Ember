import { helper } from '@ember/component/helper';

export function formatStatisticSalesNumber(number) {

  // format incoming sales number as comma separated thousands
  var formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // return formattted number
  return formattedNumber;
}

export default helper(formatStatisticSalesNumber);
