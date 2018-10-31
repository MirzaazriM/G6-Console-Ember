import { helper } from '@ember/component/helper';

// set default value of sales
var biggest = 0;

export function calculateSellByCountryGraph(next) {

  // set default value of percentage to return as width percentage
  var percentageToReturn = 0;

  // check incoming sales number
  if(next > biggest){
    // set it as biggest and return max width
    biggest = next;
    biggest = biggest[0];
    percentageToReturn = 100;
  }else {
    // calculate percentage to return according the biggest sales value
    percentageToReturn = (next / biggest) * 100;
  }

  // return percentage
  return percentageToReturn;
}

export default helper(calculateSellByCountryGraph);
