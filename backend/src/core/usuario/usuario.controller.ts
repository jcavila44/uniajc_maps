import { Response, Request } from "express";
import { createConnection, ConnectionOptions, Connection } from "typeorm";
import { CONNECTION, Usuario } from "../../config/connection";

const selectAllUsers = (req: Request, res: Response) => {
  const { page = 1, pageSizes = 10 } = req.query;

  createConnection(CONNECTION)
    .then((CONNECTION) => {
      let userRepository = CONNECTION.getRepository(Usuario);
      userRepository
        .findAndCount({
          // Skip = Al numero de registro donde empieza a contar
          skip: (Number(page) - 1) * Number(pageSizes),
          // take =  cantidad de registros que queremos ver
          take: Number(pageSizes),
        })
        .then((data) => {
          const pages = Math.ceil(data[1] / Number(pageSizes));
          res.status(200).json({
            countData: { count: data[1], pages: pages },
            data: data[0],
          });
        })
        .catch((err: Error) => {
          console.log(err.stack);
        })
        .finally(() => {
          CONNECTION.close();
        });
    })
    .catch((err: Error) => {
      console.log(err.stack);
    });
};

const createUser = (req: Request, res: Response) => {
  const { usu_correo, usu_nombre, usu_psw } = req.body;

  createConnection(CONNECTION)
    .then((CONNECTION) => {
      let newUser = new Usuario();

      newUser.usu_correo = usu_correo;
      newUser.usu_nombre = usu_nombre;
      newUser.usu_psw = usu_psw;

      CONNECTION.manager
        .save(newUser)
        .then((user) => {
          res.status(201).json({ id: user.usu_id });
        })
        .catch((err: Error) => {
          console.error(err.stack);
        })
        .finally(() => {
          CONNECTION.close();
        });
    })
    .catch((err: Error) => {
      console.error(err.stack);
    });
};

const editUser = (req: Request, res:Response) => {
    const { usu_id, usu_correo, usu_nombre, usu_psw } = req.body;

    createConnection(CONNECTION)
    .then(async connection =>{
        let userRepository = connection.getRepository(Usuario);
        let user = await userRepository.findOneOrFail(usu_id);

        if(usu_nombre) user.usu_nombre = usu_nombre;
        if(usu_correo) user.usu_correo = usu_correo;
        if(usu_psw) user.usu_psw = usu_psw;

        userRepository.save(user)
        .then((userUpdated)=>{
            res.status(200).json({
                message: 'Usuario actuaizado correctamente.'
            })
        })
        .catch((err:Error)=>{
            console.error(err.stack)
        })
        .finally(() =>{
            connection.close()
        });
    })
    .catch((err:Error)=>{
        console.error(err.stack)
    });
};
export default { selectAllUsers, createUser, editUser };
