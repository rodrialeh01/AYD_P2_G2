import express from 'express';
const app = express();

const PORT = process.env.PORT || 5173;

app.use(express.static('dist'));

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`);
    console.log('Press Ctrl+C to quit.');
});