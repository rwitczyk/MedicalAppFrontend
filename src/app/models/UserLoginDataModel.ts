import {RoleModel} from './RoleModel';

export class UserLoginDataModel {
  id: number;
  email: string;
  password: string;
  enabled: boolean;
  roleEntity: RoleModel;
}
