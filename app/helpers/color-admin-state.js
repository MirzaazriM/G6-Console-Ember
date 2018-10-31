import { helper } from '@ember/component/helper';

export function colorAdminState(status) {

  // check status and return right color
  if(status[0] === 'pending'){
    return 'red';
  }else {
    return 'green';
  }
}

export default helper(colorAdminState);
