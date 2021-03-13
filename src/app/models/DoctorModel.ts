import {UserLoginDataModel} from './UserLoginDataModel';

export class DoctorModel {
  id: number;
  firstName: string;
  lastName: string;
  specialization: string;
  userLoginDataEntity: UserLoginDataModel;
}
