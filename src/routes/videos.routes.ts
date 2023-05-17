import { Router, request, response } from 'express';
import { VideoRepository } from '../modules/videos/repositories/VideosRepository';
import { login } from '../middleware/login';

const videosRoutes = Router();
const videoRepository = new VideoRepository();

videosRoutes.post('/create-video', login, (request, response) => {
    videoRepository.create(request, response)
})

videosRoutes.get('/get-videos', login, (request, response) => {
    videoRepository.GetVideos(request, response)
})

videosRoutes.get('/search-videos', (request, response) => {
    videoRepository.SearchVideos(request, response)
})

export { videosRoutes }