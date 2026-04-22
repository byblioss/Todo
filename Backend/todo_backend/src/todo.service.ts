import { Injectable } from '@nestjs/common';
import { getConnection } from './db';

@Injectable()
export class TodoService {
  async findAll() {
    console.log('findAll gestartet');

    const pool = await getConnection();
    console.log('DB verbunden');

    const result = await pool
      .request()
      .query('SELECT Id, Text, Done FROM Todos ORDER BY Id DESC');

    console.log('Query fertig');

    return result.recordset;
  }

  async create(text: string) {
    const pool = await getConnection();

    await pool
      .request()
      .input('text', text)
      .query('INSERT INTO Todos (Text, Done) VALUES (@text, 0)');

    return { message: 'Todo erstellt' };
  }

  async toggle(id: number) {
    const pool = await getConnection();

    await pool
      .request()
      .input('id', id)
      .query(
        'UPDATE Todos SET Done = CASE WHEN Done = 1 THEN 0 ELSE 1 END WHERE Id = @id',
      );

    return { message: 'Todo aktualisiert' };
  }

  async delete(id: number) {
    const pool = await getConnection();

    await pool
      .request()
      .input('id', id)
      .query('DELETE FROM Todos WHERE Id = @id');

    return { message: 'Todo gelöscht' };
  }
}