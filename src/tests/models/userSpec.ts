import UserModel from '../../models/user.model';
import user from '../../types/usert';

const userModel = new UserModel();

describe('User Model', () => {
  describe('Test methods exists', () => {
    it('should have an Get Many Users method', () => {
      expect(userModel.index).toBeDefined();
    });

    it('should have a Get One User method', () => {
      expect(userModel.Show).toBeDefined();
    });

    it('should have a Create User method', () => {
      expect(userModel.create).toBeDefined();
    });

    it('should have an Authenticate User method', () => {
      expect(userModel.authenticate).toBeDefined();
    });
  });

  describe('add test user in Frist', () => {
    const user = {
      email: 'test@test.com',
      password: '1234',
    } as user;

    beforeAll(async () => {
      const createdUser = await userModel.create(user);
      user.id = createdUser.id;
    });

    it('Create New User', async () => {
      const createdUser = await userModel.create({
        email: 'test@test.com',
        password: '1234',
      } as user);
      expect(createdUser).toEqual({
        id: createdUser.id,
        email: 'test@test.com',
        password: createdUser.password,
      } as user);
    });
    //or expect(createdUser.email).toEqual('abdelrhman');

    it('Get all users ', async () => {
      const users = await userModel.index();
      expect(users.length).toBe(5);
    });

    it('Get one user by id ', async () => {
      const returnedUser = await userModel.Show(user.id as unknown as string);
      expect(returnedUser.id).toBe(user.id);
      expect(returnedUser.email).toBe(user.email);
    });
    it('Authenticate return authenticated user', async () => {
      const authenticatedUser = await userModel.authenticate(
        user.email,
        user.password as string
      );
      expect(authenticatedUser?.email).toBe(user.email);
    });

    it('Authenticate return null for error in info user', async () => {
      const authenticatedUser = await userModel.authenticate(
        'asfsagdhgsd',
        'asfdgasfs'
      );
      expect(authenticatedUser).toBe(null);
    });
  });
});
