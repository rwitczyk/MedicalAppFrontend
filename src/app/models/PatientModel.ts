import {UserLoginDataModel} from './UserLoginDataModel';

export class PatientModel {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  userLoginDataEntity: UserLoginDataModel;
}
