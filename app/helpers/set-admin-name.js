import { helper } from '@ember/component/helper';

export function setAdminName(name) {
  // check if name exists
  if(name[0].length < 1){
    return 'Unknown';
  }else {
    return name;
  }
}

export default helper(setAdminName);
