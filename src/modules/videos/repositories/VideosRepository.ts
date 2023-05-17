import { pool } from '../../../mysql';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';

class VideoRepository{
    create(request: Request, response: Response){    
    const { user_id, title, description, banner, publishedAt } = request.body;
    pool.getConnection((err: any, connection: any) => {
            connection.query(
                'INSERT INTO videos (video_id, user_id, title, description, banner, publishedAt) VALUES(?,?,?,?,?,?)',
                [uuidv4(), user_id, title, description, banner, publishedAt],
                (error: any, result: any, fields : any) => {
                    connection.release();
                    if (error){
                        response.status(400).json({ error })
                    }
                    response.status(200).json({ message: 'Video criado com sucesso!'})
                } 
            )
        })
    }

    GetVideos(request: Request, response: Response){
            const { user_id } = request.query;
            pool.getConnection((err: any, connection: any) => {
                connection.query(
                    'SELECT * FROM videos WHERE user_id = ?',
                    [user_id],
                    (error: any, results: any, fields : any) => {
                        connection.release();
                        if (error){
                            response.status(400).json({ error: 'erro ao buscar os vídeos' })                                                                                                                                                                                                                                                                                        
                        }
                        return response.status(200).json({ message: 'vídeos retornados com sucesso!', videos: results})
                    } 
                )
            })
    }

    SearchVideos(request: Request, response: Response){
        const { search } = request.query;
        pool.getConnection((err: any, connection: any) => {
            connection.query(
                'SELECT * FROM videos WHERE title LIKE ?',
                [`%${search}%`],
                (error: any, results: any, fields : any) => {
                    connection.release();
                    if (error){
                        response.status(400).json({ error: 'erro ao buscar os vídeos' })                                                                                                                                                                                                                                                                                        
                    }
                    return response.status(200).json({ message: 'vídeos retornados com sucesso!', videos: results})
                } 
            )
        })
    }
}

export { VideoRepository };