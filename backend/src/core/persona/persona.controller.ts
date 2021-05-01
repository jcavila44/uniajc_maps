import { Request, Response } from 'express';
import { createConnection, ConnectionOptions, Connection } from 'typeorm';
import {CONNECTION, Personas}  from '../../config/connection';


const selectAllPersons = (req: Request, res: Response) => {
  const { page = 1, pageSizes = "10" } = req.query;

  createConnection(CONNECTION)
    .then((CONNECTION) => {
      let personRepository = CONNECTION.getRepository(Personas);
      personRepository
        .findAndCount({
          skip: (Number(page) - 1) * Number(pageSizes),
          take: Number(pageSizes),
        })
        .then((data) => {
          const pages = Math.ceil(data[1] / Number(pageSizes));
          res.status(200).json({
            countData: { count: data[1], pages: pages },
            data: data[0],
          });
        })
        .catch((err:Error) =>{
            console.error(err.stack)
        })
        .finally(()=>{
            CONNECTION.close();
        });
    })
    .catch((err:Error) =>{
        console.error(err.stack)
    });
};
export default {selectAllPersons}