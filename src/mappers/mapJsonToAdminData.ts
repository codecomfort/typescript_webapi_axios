import {AdminData} from "../entities/admin";

const mapJsonToAdmin = (data: any): Partial<AdminData> => ({
  name: data.dummyName,
  age: data.dummyAge,
  role: data.dummyRole,
});

export default mapJsonToAdmin;
