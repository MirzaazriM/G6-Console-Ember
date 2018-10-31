import { helper } from '@ember/component/helper';

export function shippedStateSetter(state) {
  var value = state[0];
  var toReturn = '';

  if(value === 'no'){
    toReturn = 'Not shipped';
  }else if(value === 'in process'){
    toReturn = 'Shipped';
  }else {
    toReturn = 'Received';
  }

  return toReturn;
}

export default helper(shippedStateSetter);
