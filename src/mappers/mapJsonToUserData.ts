import {UserData} from "../entities/user";

const mapJsonToUser = (data: any): Partial<UserData> => ({
  name: data.dummyName,
  age: data.dummyAge,
});

export default mapJsonToUser;
