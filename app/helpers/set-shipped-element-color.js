import { helper } from '@ember/component/helper';

export function setShippedElementColor(state) {

  var value = state[0];
  var toReturn = '';

  if(value === 'in process'){
    toReturn = '#0288D1';
  }else if(value === 'yes'){
    toReturn = 'green';
  }

  return toReturn;
}

export default helper(setShippedElementColor);
