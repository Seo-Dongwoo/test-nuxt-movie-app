const express = require('express') 
const axios = require('axios');


const app = express()
const { OMDB_API_KEY } = process.env;

app.use(express.json())
// body에 데이터의 내용이 있는데 그 내용을 json형식으로 만들어서 app에다가 plugin해주는 작업
// 데이터 통신을 위해서 꼭 필요하다.
app.post('/', async(req, res) => {
  const payload = req.body
  const { title, type, year, page, id } = payload;

  console.log('OMDB_API_KEY: ', OMDB_API_KEY);
  console.log('params: ', payload);

  const url = id
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`;

  try {
    const { data } = await axios.get(url);
    if (data.Error) {
       res.status(400)
          .json(data.Error)
    }
    res.status(200)
        .json(data)
  
  } catch (error) {
    res.status(error.response.status)
        .json(error.message)
  }
})

module.exports = app
