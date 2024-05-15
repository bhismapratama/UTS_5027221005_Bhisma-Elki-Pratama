import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from '../proto/user';
import path from 'path';
import express, { Request, Response } from 'express';
import authCors from '../middleware/authCors';
import { UserID } from '../proto/userPackage/UserID';
import { UserWithID } from '../proto/userPackage/UserWithID';
import { LoginRequest } from '../proto/userPackage/LoginRequest';
import { promisify } from 'util';

const PROTO_PATH: string = path.resolve(__dirname, '../../../proto/user.proto');
const PORT: number = 8080;

const loadProto = async (): Promise<ProtoGrpcType> => {
  const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  };
  const protoBuf = await protoLoader.load(PROTO_PATH, options);
  return grpc.loadPackageDefinition(protoBuf) as unknown as ProtoGrpcType;
};

const startServer = async () => {
  const grpcObj = await loadProto();
  const client = new grpcObj.userPackage.UserService(
    `0.0.0.0:${PORT}`,
    grpc.credentials.createInsecure()
  );

  const getAllUserAsync = promisify(client.GetAllUser).bind(client);
  const createUserAsync = promisify(client.createUser).bind(client);
  const updateUserAsync = promisify(client.updateUser).bind(client);
  const deleteUserAsync = promisify(client.deleteUser).bind(client);
  const loginAsync = promisify(client.Login).bind(client);

  console.log(`Server running on port ${PORT}`);

  const app = express();
  app.use(express.json());
  app.use(authCors);

  app.get('/user', async (req: Request, res: Response) => {
    try {
      const response = await getAllUserAsync({});
      res.send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.post('/user', async (req: Request, res: Response) => {
    try {
      const response = await createUserAsync(req.body);
      res.send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.patch('/user/:id', async (req: Request, res: Response) => {
    try {
      const user: UserWithID = {
        userId: { id: req.params.id },
        user: req.body,
      };
      const response = await updateUserAsync(user);
      res.send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.delete('/user/:id', async (req: Request, res: Response) => {
    try {
      const userId: UserID = { id: req.params.id };
      const response = await deleteUserAsync(userId);
      res.send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.post('/login', async (req: Request, res: Response) => {
    try {
      const loginInput: LoginRequest = req.body;
      const response = await loginAsync(loginInput);
      res.send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  const listen = 3001;
  app.listen(listen, () => {
    console.log(`Client is started on port ${listen}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error);
});
