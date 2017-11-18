import {HttpDao} from "../HttpDao";
import {User, UserData} from "../entities/user";
import axios from "axios";
import {DaoParams} from "../interfaces";
import mapJsonToUser from "../mappers/mapJsonToUserData";
import {EntityFactory} from "../entities/entityFactory";
import MockAdapter = require("axios-mock-adapter");
import {Admin} from "../entities/admin";
import mapJsonToAdmin from "../mappers/mapJsonToAdminData";

describe("read", () => {
  describe("User", () => {
    test("", async () => {

      // Arrange
      const dummyUrl = "/dummyUrl";
      const mock = new MockAdapter(axios);
      mock.onGet(dummyUrl).reply((config) => {
        return [
          200,
          {
            dummyName: "ダミー名前",
            dummyAge: 10,
          }
        ];
      });
      const userFactory = new EntityFactory(User, mapJsonToUser);
      const dao = new HttpDao<User>(axios, userFactory);
      const params: DaoParams = {
        url: dummyUrl,
      };

      // Act
      const user: User = await dao.read(params);

      // Assert
      expect(user.name).toBe("ダミー名前");
      expect(user.age).toBe(10);
    });
  });
  describe("Admin", () => {
    test("", async () => {

      // Arrange
      const dummyUrl = "/dummyUrl";
      const mock = new MockAdapter(axios);
      mock.onGet(dummyUrl).reply((config) => {
        return [
          200,
          {
            dummyName: "ダミー管理者",
            dummyAge: 20,
            dummyRole: 3,
          }
        ];
      });
      const adminFactory = new EntityFactory(Admin, mapJsonToAdmin);
      const dao = new HttpDao<Admin>(axios, adminFactory);
      const params: DaoParams = {
        url: dummyUrl,
      };

      // Act
      const admin: Admin = await dao.read(params);

      // Assert
      expect(admin.name).toBe("ダミー管理者");
      expect(admin.age).toBe(20);
      expect(admin.role).toBe(3);
    });
  });
});